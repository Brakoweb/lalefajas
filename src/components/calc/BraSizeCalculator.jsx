import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const getBraSize = (bustMeasurement) => {
  let size = "";
  if (bustMeasurement >= 30 && bustMeasurement <= 31) {
    return "S";
  } else if (bustMeasurement >= 32 && bustMeasurement <= 33) {
    return "M";
  } else if (bustMeasurement >= 34 && bustMeasurement <= 35) {
    return "L";
  } else if (bustMeasurement >= 36 && bustMeasurement <= 37) {
    return "XL";
  } else {
    return "N/A";
  }
};

const BraSizeCalculator = ({ setSelectedApp }) => {
  const [size, setSize] = useState("N/A");
  const [bustMeasurement, setBustMeasurement] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (buttonClicked) {
      const calculatedSize = getBraSize(bustMeasurement);
      setSize(calculatedSize);

      MySwal.fire({
        title: `Size: ${calculatedSize}`,
        text: "Here is your bra size",
        imageUrl: "/calc/size.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Size image",
      });

      if (bustMeasurement < 30 || bustMeasurement > 37) {
        MySwal.fire(
          "Lo sentimos...",
          `Necesitamos información extra nos puedes contactar dándole <a href="https://wa.me/14079062024" target="_blank" style="color: #007bff; text-decoration: none;">clic aquí</a> y nosotros te ayudamos de manera más fácil y efectiva`,
          "question"
        );

        setBustMeasurement(0);
        setSize("N/A");
        return;
      }

      setButtonClicked(false); // Reset buttonClicked to prevent re-triggering
    }
  }, [bustMeasurement, buttonClicked]);

  const handleBtn = () => {
    const bustValue = document.getElementById("bust").value;
    setBustMeasurement(parseFloat(bustValue));
    setButtonClicked(true);
  };

  return (
    <div className="input-options">
      <br />
      <img src="/calc/bra.jpg" alt="measure" className="imgBra" />
      <br />
      <label htmlFor="bust">Medida del busto (inches):</label>
      <input
        id="bust"
        name="bust"
        type="number"
        placeholder="00"
        required
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^\d]/, "").slice(0, 2);
        }}
      />
      <button className="calcBtn" onClick={handleBtn}>
        Calcular
      </button>
      <div className="Btn-container">
        <button className="backBtn" onClick={() => setSelectedApp(null)}>
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default BraSizeCalculator;
