export const MtKg = () => {
  return (
    <>
      <label htmlFor="altura">Altura (Metros y Centimetros):</label>
      <br />
      <select id="metro" name="metro" required>
        <option value="" disabled defaultValue="">
          Metro
        </option>
        <option value="1">1 M</option>
        <option value="2">2 M</option>
      </select>
      <input
        id="centimetro"
        name="centimetro"
        type="number"
        placeholder="00"
        maxLength="2"
        required
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^\d]/, "").slice(0, 2);
        }}
      />
      <br />

      <label htmlFor="peso">Peso (Kg):</label>
      <br />
      <input
        id="peso"
        name="peso"
        type="number"
        placeholder="000"
        minLength="2"
        maxLength="3"
        required
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^\d]/, "").slice(0, 3);
        }}
      />
      <br />
    </>
  );
};
