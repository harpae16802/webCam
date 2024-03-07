// 路徑 webcam-qrcode/src/components/CameraQRScanner.jsx
import React from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const CameraQRScanner = () => {
  const webcamRef = React.useRef(null);
  // code = 掃瞄QRcode後 拿到的 資料
  const [code, setCode] = React.useState(null);

  const scanQRCode = React.useCallback(() => {
    const imageData = webcamRef.current.getScreenshot();
    if (imageData) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const codeValue = jsQR(imageData.data, img.width, img.height);
        if (codeValue) {
          setCode(codeValue.data);
        } else {
          setCode('掃描到的資料格式不正確，請重新掃描');
        }
      };
      img.src = imageData;
    }
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={scanQRCode}>掃描QRcode</button>
      </div>
      <div style={{ flex: 1 }}>
        {code && <div>掃描到的資料：{code}</div>}
      </div>
    </div>
  );
};

export default CameraQRScanner;
