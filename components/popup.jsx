import React from "react";
import style from "./components.module.css";

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

export default Popup;
