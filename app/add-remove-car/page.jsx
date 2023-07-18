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
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cost_per_day: 0,
    imageFile: null,
    description: "",
  });

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

  const handleChange = (e, name) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className={style.addRemoveContainer}>
      <div className={style.addCar}>
        <RoundedButton onClick={() => setShow(true)} color={colors.blue}>
          ADD CAR
        </RoundedButton>
      </div>
      <h1>ALL CARS</h1>
      <div className={style.itemsContainer}>
        {response.map((item, i) => {
          return <CarItem key={item.name + i} {...item} />;
        })}
      </div>
      <Popup show={show} setShow={setShow}>
        <form className={style.form}>
          <div className={style.flexRow}>
            <h4>Name</h4>
            <input
              value={form.name}
              onChange={(e) => handleChange(e, "name")}
              type="text"
              placeholder="Range rover"
              minLength={3}
              maxLength={50}
              required
            />
          </div>
          <div className={style.flexRow}>
            <h4>Cost / day</h4>
            <input
              value={form.cost_per_day}
              name="cost_per_day"
              onChange={(e) => handleChange(e, "cost_per_day")}
              type="number"
              placeholder="12"
              min={1}
              max={1000}
              required
            />
            <h4>$</h4>
          </div>
          <div className={`${style.flexRow} ${style.imageInput}`}>
            <div className={style.flexRow}>
              <h4>Image</h4>
              <label htmlFor="getImage">Select Image</label>
              <input
                required
                type="file"
                accept="image/*"
                id="getImage"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    imageFile: e.target.files[0]
                      ? URL.createObjectURL(e.target.files[0])
                      : "",
                  }))
                }
              />
            </div>
            <img src={form.imageFile} alt="" />
          </div>
          <div className={style.flexRow}>
            <h4>Description</h4>
            <textarea
              value={form.description}
              name="description"
              onChange={(e) => handleChange(e, "description")}
              type="text"
              placeholder="The car for your daily needs"
              maxLength={250}
              minLength={5}
              required
            />
          </div>
          <div className={style.buttonContainer}>
            <RoundedButton type="submit" color={colors.green}>
              ADD CAR
            </RoundedButton>
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default AddRemoveCar;
