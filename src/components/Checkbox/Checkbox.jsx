import styles from "./Checkbox.module.scss";

export function Checkbox({name, checked } = {}) {
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      name={name}
      checked={checked}
    />
  );
}
