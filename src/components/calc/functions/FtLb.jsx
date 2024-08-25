export const FtLb = () => {
  return (
    <>
      <label htmlFor="altura">Altura (Pies y Pulgadas):</label>
      <br />
      <select id="pies" name="pies" required>
        <option value="" disabled defaultValue="">
          Ft
        </option>
        <option value="4">4 ft</option>
        <option value="5">5 ft</option>
        <option value="6">6 ft</option>
      </select>
      <select id="pulgadas" name="pulgadas" required>
        <option value="" disabled defaultValue="">
          Inch
        </option>
        <option value="0">0 in</option>
        <option value="1">1 in</option>
        <option value="2">2 in</option>
        <option value="3">3 in</option>
        <option value="4">4 in</option>
        <option value="5">5 in</option>
        <option value="6">6 in</option>
        <option value="7">7 in</option>
        <option value="8">8 in</option>
        <option value="9">9 in</option>
        <option value="10">10 in</option>
        <option value="11">11 in</option>
      </select>
      <br />

      <label htmlFor="peso">Peso (libras):</label>
      <br />
      <input
        id="peso"
        name="peso"
        type="number"
        placeholder="000"
        required
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^\d]/, "").slice(0, 3);
        }}
      />
      <br />
    </>
  );
};
