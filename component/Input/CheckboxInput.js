import React from "react";
import styles from "./Input.module.scss";

export default function CheckboxInput({ nameEn, nameFR, required, stateName, onChange }) {
  return (
    <div className={styles.checkboxInput}>
      <input
        id={nameEn}
        type="checkbox"
        required={required}
        defaultValue={stateName}
        onChange={onChange}
      />
      <label htmlFor={nameEn}>{nameFR}</label>
    </div>
  );
}
