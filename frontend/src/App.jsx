import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CreatePage from "./pages/CreatePage";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [color, setColor] = useState({
    titleColor: "black",
    priceColor: "darkgreen",
    textColor: "black",
    bgColor: "white",
    cardColor: "white",
  });
  const [len, setlen] = useState(0);
  document.getElementById("body").style.backgroundColor = color.bgColor;
  return (
    <div
      style={{
        width: "100%",
        // height: len < 1 ? "100vh" : "100%",
        // backgroundColor: color.bgColor,
      }}
    >
      <Navbar toggleBackgroundColor={setColor} />
      <Routes>
        <Route
          path="/"
          element={<ProductPage prodLength={setlen} colorSetter={color} />}
        ></Route>
        <Route
          path="/create"
          element={<CreatePage colorSetter={color} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
