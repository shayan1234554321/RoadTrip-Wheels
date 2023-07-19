import React from "react";
import { colors } from "@/utilities/common";
import styles from "./components.module.css";
import HashLoader from "react-spinners/HashLoader";
import PropTypes from "prop-types";

export const RoundedButton = ({
  type = "button",
  color,
  inverted = false,
  loading = false,
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      {...rest}
      className={styles.roundedButton}
      style={{
        backgroundColor: inverted ? colors.white : color,
        color: inverted ? color : colors.white,
        pointerEvents: loading ? "none" : "",
      }}
    >
      {loading ? (
        <HashLoader color={inverted ? color : colors.white} size={20} />
      ) : (
        children
      )}
    </button>
  );
};

RoundedButton.propTypes = {
  color: PropTypes.string,
  inverted: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
};
