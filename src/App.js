import "./App.css";
import { HelloWorld } from "./components/HelloWorld/HelloWorld";
import { WebCam } from "./components/WebCam/WebCam"

function App() {
  return (
    <div className="App">
      <HelloWorld />
      <WebCam />
    </div>
  );
}

export default App;
