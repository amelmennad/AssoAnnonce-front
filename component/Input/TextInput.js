import React from "react";
import styles from "./Input.module.scss";

export default function TextInput({
  nameEn,
  nameFR,
  required,
  stateName,
  onChange,
  validated,
  invalid,
}) {
  return (
    <div className={styles.textInput}>
      <label htmlFor={nameEn}>{nameFR}</label>
      <input
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
      />
    </div>
  );
}
