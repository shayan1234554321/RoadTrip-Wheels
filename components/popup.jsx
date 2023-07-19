import React from "react";
import style from "./components.module.css";
import PropTypes from 'prop-types';

const Popup = ({ show , setShow, children }) => {

    const handleClose = () => {
        setShow(false)
    }

  return (
    <>
      {show && (
        <div className={style.popup}>
          <div className={style.popupInside}>
            <div onClick={handleClose} className={style.closeIcon}>+</div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Popup;
