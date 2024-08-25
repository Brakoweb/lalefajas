import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FtLb } from "./functions/FtLb";
import { MtKg } from "./functions/MtKg";
import { MetricSystem2 } from "./functions/MetricSystem2";

const getChinGirdleSize = (neckCircumference) => {
  let size = "";
  if (neckCircumference >= 20.4 && neckCircumference <= 22.7) {
    return (size = "S");
  } else if (neckCircumference >= 22.8 && neckCircumference <= 23.1) {
    return (size = "M");
  } else if (neckCircumference >= 23.2 && neckCircumference <= 24.4) {
    return (size = "L");
  } else if (neckCircumference >= 24.5 && neckCircumference <= 26.1) {
    return (size = "XL");
  } else {
    return (size = "N/A");
  }
};

const ChinGirdleApp = ({ setSelectedApp }) => {
  const [size, setSize] = useState("N/A");
  const [inch, setInch] = useState(0);
  const [cm, setCm] = useState(0);
  const [metricSystem2, setMetricSystem2] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleBtn = () => {
    let neckCircumference;
    if (metricSystem2) {
      const cmValue = document.getElementById("cm").value;
      neckCircumference = parseFloat(cmValue) * 0.393701; // Convert cm to inches
    } else {
      const inchValue = document.getElementById("inch").value;
      neckCircumference = parseFloat(inchValue);
    }

    if (neckCircumference < 20.4 || neckCircumference > 26.1) {
      MySwal.fire(
        "Lo sentimos...",
        `Necesitamos información extra nos puedes contactar dándole <a href="https://wa.me/14079062024" target="_blank" style="color: #007bff; text-decoration: none;">clic aquí</a> y nosotros te ayudamos de manera más fácil y efectiva`,
        "question"
      );

      setInch(0);
      setCm(0);
      setSize("N/A");
      return;
    }

    const calculatedSize = getChinGirdleSize(neckCircumference);
    setSize(calculatedSize);

    MySwal.fire({
      title: `Size: ${calculatedSize}`,
      text: "Here is your chin girdle size",
      imageUrl: "/calc/size.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Size image",
    });
  };

  return (
    <div className="input-options">
      <MetricSystem2
        metricSystem2={metricSystem2}
        setMetricSystem2={setMetricSystem2}
      />
      {metricSystem2 ? (
        <>
          <label htmlFor="cm">Circunferencia de la cara (cm):</label>
          <input
            id="cm"
            name="cm"
            type="text"
            placeholder="0.0"
            required
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/^\d{0,2}(\.\d{0,1})?$/, "")
                .slice(0, 4);
            }}
          />
        </>
      ) : (
        <>
          <label htmlFor="inch">Circunferencia de la cara (inch):</label>
          <input
            id="inch"
            name="inch"
            type="text"
            placeholder="0.0"
            required
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^\d{0,2}(\.\d{0,1})?$]/, "")
                .slice(0, 4);
            }}
          />
        </>
      )}
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

export default ChinGirdleApp;
