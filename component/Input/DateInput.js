import React from "react";

export default function DateInput({
  nameEn,
  nameFR,
  required,
  stateName,
  onBlur,
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
        type="date"
        defaultValue={stateName}
        onBlur={onBlur}
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
