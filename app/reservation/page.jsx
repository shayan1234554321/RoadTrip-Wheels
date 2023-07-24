"use client";
import React, { useState } from "react";
import style from "./page.module.css";
import { RoundedButton } from "@/components/buttons";
import { colors } from "@/utilities/common";

const Reservation = () => {

  const [ totalCharges , setTotalCharges ] = useState(0)

  const today = new Date();


  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [ form , setForm ] = useState({
    name: "",
    city: "",
    bookingDate: formattedDate,
    returnDate: "",
    image: "https://i.ibb.co/5KWVYn6/range.png"
  }) 


  // Format the date as "YYYY-MM-DD"


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={style.reservation}>
      <div className={style.bgImage}>
        <img src={form.image} alt="" />
      </div>
      <h1 className={style.title}>HAVE A RESERVATION</h1>
      <span className={style.line}></span>
      <form onSubmit={handleSubmit} >
        <div className={style.flexRow}>
          <h4>Select your ride</h4>
          
        </div>
        <div className={style.flexRow}>
          <h4>Booking Date</h4>
          <input type="date" id="dateInput" name="dateInput" />
        </div>
        <div className={style.flexRow}>
          <h4>Return Date</h4>
          <input type="date" id="dateInput" name="dateInput" min={formattedDate} />
        </div>
        <div className={style.flexRow}>
          <h4>Select the desired city</h4>
          
        </div>
        <div className={style.flexRow}>
          <h4>Total Charges : {totalCharges}$</h4>
        </div>
        <RoundedButton color={colors.green} inverted type="submit" >
          RESERVE NOW
        </RoundedButton>
      </form>
    </div>
  );
};

export default Reservation;
