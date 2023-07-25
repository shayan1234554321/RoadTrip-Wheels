"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { RoundedButton } from "@/components/buttons";
import { Api, colors } from "@/utilities/common";
import axios from "axios";
import { useStateContext } from "@/context/StateContext";
import { FormattedDate, getNextDay } from "@/utilities/formateDate";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const Reservation = () => {
  const [totalCharges, setTotalCharges] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useStateContext();
  const formattedDate = FormattedDate();
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({
    car_id: "",
    city: "",
    bookingDate: formattedDate,
    returnDate: getNextDay(formattedDate),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    toast("Creating reservation");
    try {
      const response = await axios.post(Api.createReservation(user.id), {
        car_id: form.car_id,
        starting_date: form.bookingDate,
        end_date: form.returnDate,
        city: form.city,
        cost: totalCharges,
      });
  
      if (response.status === 200) {
        toast.success("Reservation created successfully");
        push("/my-reservations");
      } else {
        toast.error("There was an error");
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(Api.getCars);
      setData(response.data.data);
      if(id){
        setForm((prev) => ({ ...prev, car_id: id }));
      }else{
        setForm((prev) => ({ ...prev, car_id: response.data.data[0].id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingChange = (e) => {
    setForm((prev) => ({
      ...prev,
      bookingDate: e.target.value,
      returnDate: getNextDay(e.target.value),
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data && form.bookingDate && form.returnDate) {
      const date1 = new Date(form.bookingDate);
      const date2 = new Date(form.returnDate);

      const timeDiff = Math.abs(date2 - date1);

      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      setTotalCharges(
        daysDiff * data?.find((car) => car.id == form.car_id)?.cost_per_day
      );
    }
  }, [form]);

  return (
    <div className={style.reservation}>
      <div className={style.bgImage}>
        <img
          src={data?.find((car) => car.id == form.car_id)?.image}
          alt="car image"
        />
      </div>
      <h1 className={style.title}>HAVE A RESERVATION</h1>
      {data?.length > 0 ? (
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.flexRow}>
            <h4>Select your ride</h4>
            <select
              onChange={(e) =>
                setForm((prev) => ({ ...prev, car_id: e.target.value }))
              }
              value={form?.car_id}
            >
              {data ? (
                data.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name}
                  </option>
                ))
              ) : (
                <option value={"No car available"}>No car available</option>
              )}
            </select>
          </div>
          <div className={style.flexRow}>
            <h4>Booking Date</h4>
            <div style={{ position: "relative" }}>
              <div className={style.datePickerBlocker}></div>
              <input
                value={form.bookingDate}
                onChange={handleBookingChange}
                type="date"
                id="dateInput"
                name="dateInput"
                min={formattedDate}
                onKeyDown={() => {}}
                className={style.dateInput}
              />
            </div>
          </div>
          <div className={style.flexRow}>
            <h4>Return Date</h4>
            <div style={{ position: "relative" }}>
              <div className={style.datePickerBlocker}></div>
              <input
                className={style.dateInput}
                type="date"
                id="dateInput"
                name="dateInput"
                value={form.returnDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, returnDate: e.target.value }))
                }
                min={getNextDay(form.bookingDate)}
                onKeyDown={() => {}}
              />
            </div>
          </div>
          <div className={style.flexRow}>
            <h4>Enter desired city</h4>
            <input
              type="text"
              placeholder="City"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, city: e.target.value }))
              }
              required
            />
          </div>
          <div className={style.flexRow}>
            <h4>Total Charges : {totalCharges}$</h4>
          </div>
          <RoundedButton loading={loading} color={colors.green} inverted type="submit">
            RESERVE NOW
          </RoundedButton>
        </form>
      ) : (
        <h2>No Vehicle available</h2>
      )}
    </div>
  );
};

export default Reservation;
