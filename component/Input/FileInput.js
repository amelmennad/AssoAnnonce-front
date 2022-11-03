import React from "react";
import styles from "../../styles/Register.module.scss";

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
      <label>{nameFR}</label>
      <div className={styles.inputFileContainer}>
        <input
          name={nameEn}
          required={required}
          type="file"
          accept=".pdf"
          onChange={onChange}
          className={
            !validated && stateName === ""
              ? `${styles.inputFile} isInvalid`
              : stateName
              ? `${styles.inputFile} isValid`
              : styles.inputFile
          }
          id={nameEn}
        />
        <label
          htmlFor={nameEn}
          className={
            (!validated && stateName === "") || stateName === "invalid"
              ? `${styles.inputFileTrigger} isInvalid`
              : stateName && stateName.name
              ? `${styles.inputFileTrigger} isValid`
              : styles.inputFileTrigger
          }
        >
          {nameFR}
        </label>

        {stateName && stateName.name ? (
          <p className="isValid">
            Fichier joint : <span>{stateName.name}</span>
          </p>
        ) : stateName === "invalid" ? (
          <p className="isInvalid">Le fichier doit être au format .pdf</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
