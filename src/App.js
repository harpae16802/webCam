
import './App.css';
import CameraQRScanner from './components/CameraQRScanner.jsx';

function App() {
  return (
    <div className="App">
      
      <CameraQRScanner /> {/* 將QRcode掃描組件添加到App.js中 */}
    </div>
  );
}

export default App;