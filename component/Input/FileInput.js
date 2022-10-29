import React from "react";

export default function FileInput({
  nameEn,
  nameFR,
  required,
  stateName,
  onChange,
  validated,
  disabled,
}) {
  return (
    <>
      <label htmlFor={nameEn}>{nameFR}</label>
      <input
        disabled={disabled}
        name={nameEn}
        required={required}
        type="file"
        accept=".pdf"
        onChange={onChange}
        className={!validated && stateName === "" ? "isInvalid" : stateName ? "isValid" : ""}
      />
    </>
  );
}
