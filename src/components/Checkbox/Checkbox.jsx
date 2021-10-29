import styles from "./Checkbox.module.scss";

export function Checkbox({ value, name, checked } = {}) {
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
    />
  );
}
