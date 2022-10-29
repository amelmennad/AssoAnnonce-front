import React from "react";

export default function TextInput({ nameEn, nameFR, required, stateName, onChange, validated }) {
  return (
    <>
      <label htmlFor={nameEn}>{nameFR}</label>
      <input
        name={nameEn}
        id={nameEn}
        required={required}
        type="text"
        placeholder={nameFR}
        defaultValue={stateName}
        onChange={onChange}
        className={!validated && stateName === "" ? "isInvalid" : stateName ? "isValid" : ""}
      />
    </>
  );
}
