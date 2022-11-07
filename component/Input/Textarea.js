export default function Textarea({
  nameEn,
  nameFR,
  required,
  stateName,
  onChange,
  validated,
  invalid,
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
        className={
          (!validated && stateName === "") || invalid
            ? "isInvalid"
            : stateName && !invalid
            ? "isValid"
            : ""
        }
        cols={cols}
        rows={rows}
      />
    </>
  );
}
