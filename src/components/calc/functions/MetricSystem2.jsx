import React, { useState } from "react";

export const MetricSystem2 = ({ metricSystem2, setMetricSystem2 }) => {
  const handleRadioChange = (event) => {
    setMetricSystem2(event.target.value === "true");
  };

  return (
    <div className="input-container">
      <label htmlFor="metricSystem">Medir Diametro de la cabeza:</label>
      <br />
      <img
        src="/calc/chin-head.jpg"
        alt="measure"
        className="imgMetricSystem"
      />
      <br />
      <div className="container">
        <div className="ftlb">
          <input
            type="radio"
            id="ftlb"
            name="metricSystem"
            value="false"
            checked={!metricSystem2}
            onChange={handleRadioChange}
          />
          <label htmlFor="ftlb">Pulgadas</label>
        </div>

        <div className="mtkg">
          <input
            type="radio"
            id="mtkg"
            name="metricSystem"
            value="true"
            checked={metricSystem2}
            onChange={handleRadioChange}
          />
          <label htmlFor="mtkg">Centimetros</label>
        </div>
      </div>

      <br />
    </div>
  );
};
