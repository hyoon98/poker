import { BrowserRouter, Route } from "react-router-dom";
import Join from "./components/Join";
import Game from "./components/Game";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/room" component={Game} />
    </BrowserRouter>
  );
}

export default App;
