import React, { useState } from "react";
import GirdleApp from "../components/calc/GirdleApp";
import ChinGirdleApp from "../components/calc/ChinGirdleApp";
import BraSizeCalculator from "../components/calc/BraSizeCalculator";
import "./Sizes.css";

const Menu = ({ setSelectedApp }) => {
  return (
    <div className="menu-sizes">
      <h1>Tallas</h1>
      <div className="menu-sizes-options">
        <div
          className="menu-size-option"
          onClick={() => setSelectedApp("girdle")}
        >
          <h2>Calculadora de Fajas</h2>
          <img src="/calc/girdle.jpg" alt="Girdle Calculator" />
        </div>
        <div
          className="menu-size-option"
          onClick={() => setSelectedApp("chin")}
        >
          <h2>Calculadora de Papada</h2>
          <img src="/calc/chin_girdle.jpg" alt="Chin Girdle Calculator" />
        </div>
        <div className="menu-size-option" onClick={() => setSelectedApp("bra")}>
          <h2>Calculadora de Bra</h2>
          <img src="/calc/bra_size.jpg" alt="Bra Size Calculator" />
        </div>
      </div>
    </div>
  );
};

const Sizes = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <React.StrictMode>
      {selectedApp === null ? (
        <Menu setSelectedApp={setSelectedApp} />
      ) : selectedApp === "girdle" ? (
        <GirdleApp setSelectedApp={setSelectedApp} />
      ) : selectedApp === "chin" ? (
        <ChinGirdleApp setSelectedApp={setSelectedApp} />
      ) : (
        <BraSizeCalculator setSelectedApp={setSelectedApp} />
      )}
    </React.StrictMode>
  );
};

export default Sizes;
