import React, { useState } from "react";

export const MetricSystem = ({ metricSystem, setMetricSystem }) => {
  const handleRadioChange = (event) => {
    setMetricSystem(event.target.value === "true");
  };

  return (
    <div className="input-container">
      <label htmlFor="metricSystem">Medir Altura y Peso:</label>
      <br />
      <img src="/calc/alturas.jpg" alt="measure" className="imgMetricSystem" />
      <br />
      <div className="container">
        <div className="ftlb">
          <input
            type="radio"
            id="ftlb"
            name="metricSystem"
            value="false"
            checked={!metricSystem}
            onChange={handleRadioChange}
          />
          <label htmlFor="ftlb">Pies y Libras</label>
        </div>

        <div className="mtkg">
          <input
            type="radio"
            id="mtkg"
            name="metricSystem"
            value="true"
            checked={metricSystem}
            onChange={handleRadioChange}
          />
          <label htmlFor="mtkg">Metros y Kilogramos</label>
        </div>
      </div>

      <br />
    </div>
  );
};
