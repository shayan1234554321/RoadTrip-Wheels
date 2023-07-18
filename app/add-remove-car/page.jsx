"use client";
import React, { useState } from "react";
import { RoundedButton } from "@/components/buttons";
import style from "./page.module.css";
import { colors } from "@/utilities/common";
import Popup from "@/components/popup";

const CarItem = ({ name, description, image, cost_per_day }) => {
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
        <RoundedButton color={colors.red}>REMOVE</RoundedButton>
      </div>
      <div className={style.right}>
        <div className={style.imageContainer}>
          <img src={image} alt="car image" />
        </div>
      </div>
    </div>
  );
};

const AddRemoveCar = () => {

  const [ show , setShow ] = useState(false)

  const response = [
    {
      image: "https://i.ibb.co/5KWVYn6/range.png",
      name: "Range Rover",
      description: "A great choice for traveling with your besties",
      cost_per_day: "27",
    },
    {
      image: "https://i.ibb.co/mHgRBsq/chevrolet.png",
      name: "Chevrolet",
      description: "A great choice for traveling with your besties",
      cost_per_day: "13",
    },
    {
      image: "https://i.ibb.co/s5jgd7R/fortuner.png",
      name: "Fortuner",
      description: "A great choice for traveling with your besties",
      cost_per_day: "23",
    },
    {
      image: "https://i.ibb.co/s5jgd7R/fortuner.png",
      name: "Fortuner",
      description: "A great choice for traveling with your besties",
      cost_per_day: "23",
    },
    {
      image: "https://i.ibb.co/s5jgd7R/fortuner.png",
      name: "Fortuner",
      description: "A great choice for traveling with your besties",
      cost_per_day: "23",
    },
  ];


  return (
    <div className={style.addRemoveContainer}>
      <div className={style.addCar}>
        <RoundedButton onClick={()=>setShow(true)} color={colors.blue}>ADD CAR</RoundedButton>
      </div>
      <h1>ALL CARS</h1>
      <div className={style.itemsContainer}>
        {response.map((item, i) => {
          return <CarItem key={item.name + i} {...item} />;
        })}
      </div>
      <Popup show={show} setShow={setShow} >
        hello
      </Popup>
    </div>
  );
};

export default AddRemoveCar;
