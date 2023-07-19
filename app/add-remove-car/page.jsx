"use client";
import React, { useEffect, useState } from "react";
import { RoundedButton } from "@/components/buttons";
import style from "./page.module.css";
import { colors, Api } from "@/utilities/common";
import Popup from "@/components/popup";
import toast from "react-hot-toast";
import axios from "axios";

const CarItem = ({ id, name, description, image, cost_per_day, setData }) => {
  const [loading, setLoading] = useState(false);

  const deleteCar = async () => {
    setLoading(true);
    try {
      toast(`Deleting ${name} `);
      const response = await axios.delete(Api.deleteCar(id));
      if (response.status === 200) {
        toast.success("Car deleted successfully!");
        setData((prev) => prev.filter((car) => car.id !== id));
      } else {
        toast.error("Something went wrong, try again");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
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
        <RoundedButton loading={loading} onClick={deleteCar} color={colors.red}>
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

const AddRemoveCar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cost_per_day: 0,
    imageFile: null,
    description: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (e, name) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (form.imageFile) {
      const formData = new FormData();
      formData.append("file", form.imageFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      );

      try {
        toast("Uploading car");
        // Get image url from cloudinary

        const cloudinaryResponse = await axios.post(
          Api.cloudinary(process.env.NEXT_PUBLIC_CLOUDINARY_NAME),
          formData
        );

        const image = cloudinaryResponse.data.url;

        // upload car to database

        const response = await axios.post(Api.createCar, {
          name: form.name,
          image: image,
          cost_per_day: form.cost_per_day,
          description: form.description,
        });

        if (response.status === 200) {
          setData((prev) => [...prev, response.data.data]);
          toast.success("Car added successfully");
        } else {
          toast.error("There was an error adding the car");
        }
      } catch (error) {
        console.log(error);
        toast.error("There was an error adding the car");
      } finally {
        setLoading(false);
        setShow(false);
      }
    } else {
      toast.error("Please select an image");
    }
  };

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
      <div className={style.addCar}>
        <RoundedButton onClick={() => setShow(true)} color={colors.blue}>
          ADD CAR
        </RoundedButton>
      </div>
      <h1>ALL CARS</h1>
      <div className={style.itemsContainer}>
        {data?.map((item, i) => {
          return <CarItem key={item.name + i} {...item} setData={setData} />;
        })}
      </div>
      <Popup show={show} setShow={setShow}>
        <form className={style.form} onSubmit={handleSubmit}>
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
                type="file"
                accept="image/*"
                id="getImage"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    imageFile: e.target.files[0] ? e.target.files[0] : "",
                  }))
                }
              />
            </div>
            <img
              src={form.imageFile ? URL.createObjectURL(form.imageFile) : ""}
              alt=""
            />
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
            <RoundedButton loading={loading} type="submit" color={colors.green}>
              ADD CAR
            </RoundedButton>
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default AddRemoveCar;
