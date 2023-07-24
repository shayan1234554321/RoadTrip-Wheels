"use client";
/* eslint-disable no-undef */

import React, { useEffect, useState } from "react";
import { RoundedButton } from "@/components/buttons";
import style from "./page.module.css";
import { colors, Api } from "@/utilities/common";
import axios from "axios";
import PropTypes from "prop-types";

const CarItem = ({ id, name, description, image, cost_per_day, setData }) => {

  const deleteCar = async () => {
    
  };

  return (
    <div className={style.carItem}>
      <div className={style.left}>
        <h4>
          Name <span>{name}</span>
        </h4>
        <h4>
          Cost / Day <span>{cost_per_day} $</span>
        </h4>
        <h4>
          Description <span>{description}</span>
        </h4>
        <RoundedButton onClick={deleteCar} color={colors.red}>
          REMOVE
        </RoundedButton>
      </div>
      <div className={style.right}>
        <div className={style.imageContainer}>
          <img src={image} alt="car image" />
        </div>
      </div>
    </div>
  );
};

const MyReservations = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(Api.getCars);

      setData(response.data.data);
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
        {data?.map((item, i) => {
          return <CarItem key={item.name + i} {...item} setData={setData} />;
        })}
      </div>
    </div>
  );
};

CarItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  image: PropTypes.string.isRequired,
  cost_per_day: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired
};


export default MyReservations;
