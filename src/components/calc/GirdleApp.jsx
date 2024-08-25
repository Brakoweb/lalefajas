import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FtLb } from "./functions/FtLb";
import { MtKg } from "./functions/MtKg";
import { MetricSystem } from "./functions/MetricSystem";

const getGirdleSize = (height, weight) => {
  let size = "";
  if (height >= 5 && height <= 5.06) {
    if (weight >= 91 && weight <= 97) {
      return "3XS";
    } else if (weight >= 98 && weight <= 106) {
      return "2XS";
    } else if (weight >= 107 && weight <= 116) {
      return "XS";
    } else if (weight >= 117 && weight <= 131) {
      return "S";
    } else if (weight >= 132 && weight <= 151) {
      return "M";
    } else if (weight >= 152 && weight <= 171) {
      return "L";
    } else if (weight >= 172 && weight <= 191) {
      return "XL";
    } else if (weight >= 192 && weight <= 211) {
      return "2XL";
    } else if (weight >= 212 && weight <= 220) {
      return "3XL";
    } else if (weight < 91 || weight > 220) {
      return "N/A";
    }
  } else if (height >= 5.07 && height <= 6) {
    if (weight >= 98 && weight <= 105) {
      return "3XS";
    } else if (weight >= 106 && weight <= 116) {
      return "2XS";
    } else if (weight >= 117 && weight <= 131) {
      return "XS";
    } else if (weight >= 132 && weight <= 151) {
      return "S";
    } else if (weight >= 152 && weight <= 171) {
      return "M";
    } else if (weight >= 172 && weight <= 191) {
      return "L";
    } else if (weight >= 192 && weight <= 211) {
      return "XL";
    } else if (weight >= 212 && weight <= 220) {
      return "2XL";
    } else if (weight >= 221 && weight <= 228) {
      return "3XL";
    } else if (weight < 98 || weight > 228) {
      return "N/A";
    }
  } else {
    return "N/A";
  }
};

const GirdleApp = ({ setSelectedApp }) => {
  const [size, setSize] = useState("N/A");
  const [ft, setFt] = useState(0);
  const [inch, setInch] = useState(0);
  const [weight, setWeight] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [metricSystem, setMetricSystem] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (buttonClicked) {
      const height = parseFloat(ft) + parseFloat(inch) * 0.01;

      if (height < 5 || height > 6 || weight < 91 || weight > 228) {
        MySwal.fire(
          "Lo sentimos...",
          `Necesitamos información extra nos puedes contactar dándole <a href="https://wa.me/14079062024" target="_blank" style="color: #007bff; text-decoration: none;">clic aquí</a> y nosotros te ayudamos de manera más fácil y efectiva`,
          "question"
        );

        setFt(0);
        setInch(0);
        setWeight(0);
        setSize("N/A");
        return;
      }

      const calculatedSize = getGirdleSize(height, weight);
      setSize(calculatedSize);

      MySwal.fire({
        title: `Size: ${calculatedSize}`,
        text: "Here is your girdle size",
        imageUrl: "/calc/size.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Size image",
      });
    }
  }, [buttonClicked, ft, inch, weight]);

  const handleBtn = () => {
    if (metricSystem) {
      const metro = document.getElementById("metro").value;
      const cm = document.getElementById("centimetro").value;
      const kg = document.getElementById("peso").value;
      setFt(Math.trunc(parseFt(metro, cm)));
      setInch((parseFt(metro, cm) % 1) * 100);
      setWeight(parseWeight(kg));
    } else {
      setFt(document.getElementById("pies").value);
      setInch(document.getElementById("pulgadas").value);
      setWeight(document.getElementById("peso").value);
    }

    setButtonClicked(true);
  };

  const parseFt = (metro, cm) => {
    let height = parseFloat(metro) + parseFloat(cm) * 0.01;
    height = height * 3.28084; // Convert to feet
    let decimalPart = height % 1;
    decimalPart = Math.round(decimalPart * 12); // Convert to inches and round
    height = Math.trunc(height); // Remove decimal part
    decimalPart = decimalPart * 0.01;
    height = height + decimalPart; // Result in feet with inches

    return height;
  };

  const parseWeight = (kg) => {
    return kg * 2.20462; // kg to lb
  };

  return (
    <div className="input-options">
      <MetricSystem
        metricSystem={metricSystem}
        setMetricSystem={setMetricSystem}
      />
      {metricSystem ? <MtKg /> : <FtLb />}
      <div className="Btn-container">
        <button className="calcBtn" onClick={handleBtn}>
          Calcular
        </button>
        <button className="backBtn" onClick={() => setSelectedApp(null)}>
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default GirdleApp;
