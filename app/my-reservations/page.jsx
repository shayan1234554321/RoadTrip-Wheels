"use client";

import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { Api } from "@/utilities/common";
import axios from "axios";
import PropTypes from "prop-types";
import { useStateContext } from "@/context/StateContext";
import calendar from "@/assets/images/calendar.png";
import Image from "next/image";

const CarItem = ({ name, city, image, cost, starting_date, end_date}) => {
  const date1 = new Date(starting_date);
  const date2 = new Date(end_date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const startDay = date1.getDate();
  const startMonth = monthNames[date1.getMonth()];
  const endDay = date2.getDate();
  const endMonth = monthNames[date2.getMonth()];

  return (
    <div className={style.carItem}>
      <div className={style.left}>
        <h4>
          Your Ride <span>{name}</span>
        </h4>
        <h4>
          Booking Date <span>{startDay} {startMonth}</span> <Image src = {calendar} alt = 'calendar' className={style.calendar} />
        </h4>
        <h4>
          Returning Date <span>{endDay} {endMonth}</span> <Image src = {calendar} alt = 'calendar' className={style.calendar} />
        </h4>
        <h4>
          City <span>{city}</span>
        </h4>
      </div>
      <div className={style.right}>
        <h4 className={style.cost}>
          Total Charges:<span>${cost}</span>
        </h4>
        <div className={style.imageContainer}>
          <img src={image} alt="car image" />
        </div>
      </div>
    </div>
  );
};

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { cars } = useStateContext();
  let car ={name: 'example', image: 'example'};
  const userId = JSON.parse(localStorage.getItem("userId"));

  const getData = async () => {
    try {
      const response = await axios.get(Api.getReservations(userId));
      const data = await response.data;
      setReservations(await data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.addRemoveContainer}>
      <h1>YOUR RESERVATIONS</h1>
      <div className={style.itemsContainer}>
        {reservations?.map((item, i) => {
          car = cars.find((car) => car.id === item.car_id);
          return <CarItem key={item.name + i} {...item} image={car.image} name={car.name} />;
        })}
        {reservations.length === 0 && <h2>You have no reservations</h2>}
      </div>
    </div>
  );
};

CarItem.propTypes = {
  city: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired, 
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  starting_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
};


export default MyReservations;
