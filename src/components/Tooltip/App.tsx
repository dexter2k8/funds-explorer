import "./App.css";
import Tooltip from "./components/Tooltip";

function App() {
  return (
    <>
      <h1 data-tooltip-id="tooltip">Vite + React</h1>
      <Tooltip
        message="I'm a tooltip. You need to hover over me."
        targetId="tooltip"
        maxWidth={200}
        placement="bottom"
        textAlign="center"
        delay={500}
        hideArrow
      />

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
