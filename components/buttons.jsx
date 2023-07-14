import { colors } from "@/utilities/common";
import styles from './components.module.css'

// loading in next 


export const RoundedButton = ({ color, inverted = false, children }) => {
  return (
    <button
      className={styles.roundedButton}
      style={{
        backgroundColor: inverted ? colors.white : color,
        color: inverted ? color : colors.white,
      }}
    >
      {children}
    </button>
  );
};
