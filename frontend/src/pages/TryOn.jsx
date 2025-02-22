import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets"; // Ensure assets are correctly referenced

const TryOn = () => {
  const [handImage, setHandImage] = useState(null);
  const [selectedNailArt, setSelectedNailArt] = useState(null);
  const [opencvLoaded, setOpenCVLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Load OpenCV dynamically in React
  useEffect(() => {
    const loadOpenCV = () => {
      const script = document.createElement("script");
      script.src = "https://docs.opencv.org/4.x/opencv.js";
      script.async = true;
      script.onload = () => {
        console.log("OpenCV Loaded");
        setOpenCVLoaded(true);
      };
      document.body.appendChild(script);
    };
    loadOpenCV();
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setHandImage(imageUrl);
  };

  const handleNailSelect = (nailImage) => {
    setSelectedNailArt(nailImage);
  };

  const applyNails = () => {
    if (!handImage || !selectedNailArt || !opencvLoaded) return;

    const img = new Image();
    img.src = handImage;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let src = cv.imread(canvas);
      let gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

      let threshold = new cv.Mat();
      cv.threshold(gray, threshold, 100, 255, cv.THRESH_BINARY);

      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(threshold, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      for (let i = 0; i < contours.size(); i++) {
        let rect = cv.boundingRect(contours.get(i));

        if (rect.width > 20 && rect.height > 20) {
          let nailImg = new Image();
          nailImg.src = assets[selectedNailArt]; // Get selected nail art
          nailImg.onload = () => {
            ctx.drawImage(nailImg, rect.x, rect.y, rect.width, rect.height);
          };
        }
      }

      src.delete();
      gray.delete();
      threshold.delete();
      contours.delete();
      hierarchy.delete();
    };
  };

  return (
    <div className="flex flex-col items-center p-5 md:p-10 space-y-8">
      <h2 className="text-3xl font-semibold text-[#053342] mb-5 text-center">
        Virtual Nail Art Try-On
      </h2>

      {/* Nail Art Selection */}
      <div className="flex flex-wrap gap-12 justify-center">
        <div className="cursor-pointer" onClick={() => handleNailSelect("press")}>
          <img src={assets.press} alt="Press-on 1" className="w-64 h-64 object-contain rounded-lg shadow-lg" />
        </div>
        <div className="cursor-pointer" onClick={() => handleNailSelect("presson")}>
          <img src={assets.presson} alt="Press-on 2" className="w-64 h-64 object-contain rounded-lg shadow-lg" />
        </div>
        <div className="cursor-pointer" onClick={() => handleNailSelect("presons")}>
          <img src={assets.presons} alt="Press-on 3" className="w-64 h-64 object-contain rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Upload Hand Image */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg text-gray-700">Upload Your Hand Image</p>
        <input type="file" onChange={handleUpload} className="border-2 border-[#053342] rounded p-2" />
      </div>

      {/* Display Uploaded Hand Image & Processed Image */}
      {handImage && (
        <canvas ref={canvasRef} className="mt-4 w-96 h-96 object-cover rounded-lg border-2 border-gray-300 shadow-lg"></canvas>
      )}

      {/* Apply Nails Button */}
      {selectedNailArt && handImage && (
        <button onClick={applyNails} className="bg-[#ff4d6d] text-white py-2 px-4 rounded-md">
          Apply Nails
        </button>
      )}
    </div>
  );
};

export default TryOn;
