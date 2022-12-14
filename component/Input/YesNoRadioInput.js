import React from "react";
import styles from "./Input.module.scss";

export default function YesNoRadioInput({
  nameEn,
  nameFR,
  required,
  stateName,
  onChange,
  validated,
  yesId,
  noId,
}) {
  return (
    <>
      <label htmlFor={nameEn} className={styles.firstLabelRadioInput}>
        {nameFR}
      </label>
      <div className={styles.radioInput}>
        <div>
          <input
            name={nameEn}
            id={yesId}
            required={required}
            type="radio"
            onChange={onChange}
            value="yes"
            className={!validated && stateName === "" ? "isInvalid" : stateName ? "isValid" : ""}
          />
          <label htmlFor={yesId} className={styles.label1}>
            <span>Oui</span>
          </label>
        </div>
        <div>
          <input
            name={nameEn}
            id={noId}
            required={required}
            type="radio"
            defaultChecked
            onChange={onChange}
            value="no"
            className={!validated && stateName === "" ? "isInvalid" : stateName ? "isValid" : ""}
          />
          <label htmlFor={noId} className={styles.label2}>
            <span>Non</span>
          </label>
        </div>
      </div>
    </>
  );
}
