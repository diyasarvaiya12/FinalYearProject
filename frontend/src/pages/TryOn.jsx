import { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';

const TryOn = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedNail, setSelectedNail] = useState(null);
  const [nailImage, setNailImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Nail designs array
  const nailDesigns = [
    {
      id: 1,
      src: "/redpreess1.png", // overlay image
      previewSrc: "/redpreess.png", // UI preview image
      name: "Classic red",
      price: "₹299",
      description: "Classic red color with a glossy finish",
    },
    {
      id: 2,
      src: "/pink1.png",
      previewSrc: "/pink.png",
      name: "Pink chrome",
      price: "₹399",
    },
    {
      id: 3,
      src: "/nail3.png",
      previewSrc: "/nail3-pic.png",
      name: "Black and silver",
      price: "₹379"
    },
    {
      id: 4,
      src: "/nail4.png",
      previewSrc: "/nail4-pic.png",
      name: "purple cateyee",
      price: "₹449"
    }
  ];

  // Load the selected nail image
  useEffect(() => {
    if (selectedNail) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = selectedNail;
      img.onload = () => setNailImage(img);
      img.onerror = (err) => {
        console.error('Error loading nail image:', err);
        setError("Failed to load nail design");
      };
    }
  }, [selectedNail]);

  // Memoized onResults function
  const onResults = useCallback((results) => {
    if (!canvasRef.current || !nailImage) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        const fingertips = [4, 8, 12, 16, 20]; // Thumb, index, middle, ring, pinky

        fingertips.forEach((tipIndex) => {
          const fingertip = landmarks[tipIndex];
          const previousPoint = landmarks[tipIndex - 1];

          // Calculate angle and position
          const angle = Math.atan2(
            fingertip.y - previousPoint.y,
            fingertip.x - previousPoint.x
          );

          const distance = Math.sqrt(
            Math.pow(fingertip.x - previousPoint.x, 2) +
            Math.pow(fingertip.y - previousPoint.y, 2)
          );

          // Adjust nail size
          const nailWidth = distance * canvasRef.current.width * 1.2;
          const nailHeight = nailWidth * (153 / 83);

          const x = fingertip.x * canvasRef.current.width;
          const y = fingertip.y * canvasRef.current.height;

          // Draw nail
          canvasCtx.save();
          canvasCtx.translate(x, y);
          canvasCtx.rotate(angle - Math.PI/2);
          canvasCtx.drawImage(
            nailImage,
            -nailWidth/2,
            -nailHeight/2,
            nailWidth,
            nailHeight
          );
          canvasCtx.restore();
        });
      }
    }
  }, [nailImage]);

  // Initialize hands detection
  useEffect(() => {
    if (!isCameraActive) return;

    setIsProcessing(true);
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (webcamRef.current?.video) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          try {
            await hands.send({ image: webcamRef.current.video });
          } catch (err) {
            console.error('Frame processing error:', err);
          }
        },
        width: 640,
        height: 480,
      });

      camera.start()
        .then(() => setIsProcessing(false))
        .catch((err) => {
          console.error('Camera start error:', err);
          setError("Failed to start camera");
          setIsProcessing(false);
        });
    }

    return () => {
      hands.close();
    };
  }, [isCameraActive, onResults]);

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
              <div className="relative" style={{ width: '640px', height: '480px' }}>
                {isCameraActive && (
                  <>
                    <Webcam
                      ref={webcamRef}
                      mirrored={false}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                    <canvas
                      ref={canvasRef}
                      width={640}
                      height={480}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </>
                )}
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
                    setSelectedNail(design.src); // Still uses overlay image for the actual process
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedNail === design.src
                      ? "border-[#053342] bg-[#FDF6E6]"
                      : "border-gray-200 hover:border-[#B0754B]"
                  }`}
                >
                  <img
                    src={design.previewSrc} // Use preview image in UI
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

