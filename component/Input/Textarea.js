export default function Textarea({
  nameEn,
  nameFR,
  required,
  stateName,
  onChange,
  validated,
  cols,
  rows,
}) {
  return (
    <>
      <label htmlFor={nameEn}>{nameFR}</label>
      <textarea
        name={nameEn}
        id={nameEn}
        required={required}
        type="text"
        placeholder={nameFR}
        defaultValue={stateName}
        onChange={onChange}
        className={!validated && stateName === "" ? "isInvalid" : stateName ? "isValid" : ""}
        cols={cols}
        rows={rows}
      />
    </>
  );
}
