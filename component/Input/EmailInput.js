import React from "react";

export default function EmailInput({
  nameEn,
  nameFR,
  required,
  stateName,
  onChange,
  validated,
  invalid,
}) {
  return (
    <>
      <label htmlFor={nameEn}>{nameFR}</label>
      <input
        name={nameEn}
        id={nameEn}
        required={required}
        type="email"
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
      />
    </>
  );
}
