import { BrowserRouter, Route } from "react-router-dom";
import Poker from "./components/Poker";
import Join from "./components/Join";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/room" component={Poker} />
    </BrowserRouter>
  );
}

export default App;
