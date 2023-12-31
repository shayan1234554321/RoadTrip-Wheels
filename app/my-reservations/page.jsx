"use client";

import React, { useEffect } from "react";
import style from "./page.module.css";
import { Api } from "@/utilities/common";
import axios from "axios";
import PropTypes from "prop-types";
import { useStateContext } from "@/context/StateContext";
import calendar from "@/assets/images/calendar.png";
import { RoundedButton } from "@/components/buttons";
import { colors } from "@/utilities/common";
import { toast } from "react-hot-toast";


const CarItem = ({ id, car, city, cost, starting_date, end_date }) => {
  const { user, setReservations } = useStateContext();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(Api.deleteReservation(user.username, id));
      if (response.status === 200) {
        const response = await axios.get(Api.getReservations(user.username));
        const data = await response.data;
        setReservations(await data.data);
        toast.success("Reservation deleted successfully");
      } else {
        toast.error("There was an error");
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className={style.carItem}>
      <div className={style.left}>
        <h4>
          Your Ride <span>{car.name}</span>
        </h4>
        <h4>
          Booking Date <span>{starting_date}</span>{" "}
          <img src={calendar.src} alt="calendar" className={style.calendar} />
        </h4>
        <h4>
          Returning Date <span>{end_date}</span>{" "}
          <img src={calendar.src} alt="calendar" className={style.calendar} />
        </h4>
        <h4>
          City <span>{city}</span>
        </h4>
        <RoundedButton  color={colors.red} inverted={false} type="submit" onClick ={ handleDelete } >
            Delete Reservation
        </RoundedButton>
      </div>
      <div className={style.right}>
        <h4 className={style.cost}>
          Total Charges:<span>${cost}</span>
        </h4>
        <div className={style.imageContainer}>
          <img src={car.image} alt="car image" />
        </div>
      </div>
    </div>
  );
};

const MyReservations = () => {
  const { user, reservations, setReservations } = useStateContext();

  const getData = async () => {
    try {
      const response = await axios.get(Api.getReservations(user.username));
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
        {reservations?.map((item, i) => (
          <CarItem key={item.id + i} {...item} />
        ))}
        {reservations.length === 0 && <h2>You have no reservations</h2>}
      </div>
    </div>
  );
};

CarItem.propTypes = {
  id: PropTypes.number.isRequired,
  car: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  starting_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
};

export default MyReservations;
