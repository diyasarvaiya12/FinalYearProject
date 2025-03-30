import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';

const nailExtensionImage = '/nail.png';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [nailImage, setNailImage] = useState(null);

  // Load the nail extension image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = nailExtensionImage;
    img.onload = () => setNailImage(img);
    img.onerror = () => {
      console.error('Error loading nail image');
    };
  }, []);

  // Memoized onResults function to avoid re-renders
  const onResults = useCallback((results) => {
    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks && nailImage) {
      for (const landmarks of results.multiHandLandmarks) {
        const fingertips = [4, 8, 12, 16, 20]; // Thumb, index, middle, ring, pinky

        fingertips.forEach((tipIndex) => {
          const fingertip = landmarks[tipIndex];
          const previousPoint = landmarks[tipIndex - 1];

          // Calculate angle
          const angle = Math.atan2(
            fingertip.y - previousPoint.y,
            fingertip.x - previousPoint.x
          );

          // Dynamically calculate the size of the nail based on the distance between the fingertip and the previous joint
          const distance = Math.sqrt(
            Math.pow(fingertip.x - previousPoint.x, 2) +
            Math.pow(fingertip.y - previousPoint.y, 2)
          );


          // Adjust the size of the nail image
          const nailWidth = distance * canvasRef.current.width * 1.5;
          const nailHeight = nailWidth * (163 / 87);

          const x = (1 - fingertip.x) * canvasRef.current.width;
          const y = fingertip.y * canvasRef.current.height;

          // Save the canvas state
          canvasCtx.save();

          // Translate to the fingertip position
          canvasCtx.translate(x, y);

          // Rotate the canvas to align with the finger angle
          canvasCtx.rotate(angle);

          // Draw the nail image, centered at the fingertip
          canvasCtx.drawImage(nailImage, -nailWidth / 2, -nailHeight / 2, nailWidth, nailHeight);

          // Restore the canvas state
          canvasCtx.restore();
        });
      }
    }
  }, [nailImage]);

  useEffect(() => {
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
        onFrame: async () => await hands.send({ image: webcamRef.current.video }),
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [onResults]);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <Webcam 
        ref={webcamRef} 
        mirrored={true} 
        style={{ width: '100%', height: '100%' }} 
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default CameraComponent;