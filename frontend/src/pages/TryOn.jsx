import React, { useRef, useState, useEffect } from "react";

const TryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedNail, setSelectedNail] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [hands, setHands] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Initialize MediaPipe Hands and Camera
  useEffect(() => {
    const initializeHandDetection = async () => {
      try {
        const hands = new window.Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        hands.onResults(onResults);
        setHands(hands);
      } catch (err) {
        setError("Failed to initialize hand detection");
      }
    };

    initializeHandDetection();
  }, []);

  // Handle camera
  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isCameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "environment"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Set canvas size to match video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Start detection loop
        requestAnimationFrame(detectFrame);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError("Unable to access camera. Please ensure camera permissions are granted.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const detectFrame = async () => {
    if (!hands || !videoRef.current || !isCameraActive) return;

    try {
      await hands.send({ image: videoRef.current });
      if (isCameraActive) {
        requestAnimationFrame(detectFrame);
      }
    } catch (err) {
      console.error('Frame detection error:', err);
    }
  };

  const onResults = (results) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log(ctx);

    // Clear canvas and draw video frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      results.multiHandLandmarks.forEach((landmarks) => {
        // Updated fingertip indices and their base points
        const fingerTips = [
          { tip: 4, base: 3 },  // thumb
          { tip: 8, base: 7 },  // index
          { tip: 12, base: 11 }, // middle
          { tip: 16, base: 15 }, // ring
          { tip: 20, base: 19 }  // pinky
        ];
        
        if (selectedNail) {
          console.log(selectedNail);
          fingerTips.forEach(({ tip, base }) => {
            const tipPoint = landmarks[tip];
            const basePoint = landmarks[base];
            
            // Calculate position
            const x = tipPoint.x * canvas.width;
            const y = tipPoint.y * canvas.height;
            console.log(`Nail position: (${x}, ${y})`);

            // Calculate nail width based on finger width
            const fingerWidth = Math.hypot(
              (landmarks[tip].x - landmarks[base].x) * canvas.width,
              (landmarks[tip].y - landmarks[base].y) * canvas.height
            );
            const nailWidth = fingerWidth * 1.2;
            const nailHeight = nailWidth * 0.8;

            // Calculate angle
            const angle = Math.atan2(
              tipPoint.y - basePoint.y,
              tipPoint.x - basePoint.x
            );
            console.log(`Rotation angle: ${angle}`);

            const nailImg = new Image();
            nailImg.onload = () => {
              console.log('Nail image loaded');
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(angle - Math.PI/2);
              ctx.drawImage(
                nailImg,
                -nailWidth/2,
                -nailHeight/2,
                nailWidth,
                nailHeight
              );
              ctx.restore();
            };
            nailImg.src = selectedNail;
          });
        }

        // Draw debug points if needed
        if (process.env.NODE_ENV === 'development') {
          landmarks.forEach((landmark, index) => {
            ctx.beginPath();
            ctx.arc(
              landmark.x * canvas.width,
              landmark.y * canvas.height,
              2,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = '#00FF00';
            ctx.fill();
          });
        }
      });
    }
  };

  // Nail design options
  const nailDesigns = [
    {
      id: 1,
      src: "/images/nails/floral-burgundy.png",
      name: "Classic French",
      price: "₹299",
      description: "Classic white-tipped French manicure"
    },
    {
      id: 2,
      src: "/images/nails/design2.png",
      name: "Glitter Gold",
      price: "₹399"
    },
    {
      id: 3,
      src: "/images/nails/design3.png",
      name: "Rose Pink",
      price: "₹349"
    },
    {
      id: 4,
      src: "/images/nails/design4.png",
      name: "Abstract Art",
      price: "₹449"
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            
            // Set canvas size to match image dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            
            setSelectedNail(img.src);
            detectAndApplyNails(img);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please upload an image file");
      }
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'nail-preview.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[#053342] text-center mb-8">
          Virtual Nail Try-On
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Video/Canvas Area */}
          <div className="lg:w-2/3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="hidden"
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  className="w-full border border-gray-200 rounded-lg"
                />
              </div>
              
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setIsCameraActive(!isCameraActive)}
                  className="bg-[#053342] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#042a37]"
                >
                  {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                </button>
              </div>
            </div>
          </div>

          {/* Nail Designs Selection */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-serif text-[#053342] mb-4">
              Choose Your Style
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {nailDesigns.map((design) => (
                <button
                  key={design.id}
                  onClick={() => {
                    setSelectedNail(design.src);
                    if (videoRef.current) {
                      detectFrame();
                    }
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedNail === design.src
                      ? "border-[#053342] bg-[#FDF6E6]"
                      : "border-gray-200 hover:border-[#B0754B]"
                  }`}
                >
                  <img
                    src={design.src}
                    alt={design.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-center text-sm font-medium text-gray-700">
                    {design.name}
                  </p>
                  <p className="text-center text-sm text-[#B0754B]">
                    {design.price}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#FDF6E6] rounded-lg">
              <h3 className="text-lg font-medium text-[#053342] mb-2">
                How to Use:
              </h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                <li>Upload a clear photo of your hand</li>
                <li>Wait for automatic nail detection</li>
                <li>Select different nail designs to preview</li>
                <li>Download your favorite look</li>
              </ol>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#053342] border-t-transparent"></div>
              <p className="mt-4 text-center">Initializing camera...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOn;
