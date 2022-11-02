import React from "react";

export default function PasswordInput({
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
        type="password"
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
