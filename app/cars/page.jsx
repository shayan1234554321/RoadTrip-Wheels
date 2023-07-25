'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RoundedButton } from '@/components/buttons';
import { colors } from '@/utilities/common';
import PropTypes from 'prop-types';
import arrow from '@/assets/images/arrow.png';
import { Api } from '@/utilities/common';
import axios from 'axios';

import style from './page.module.css';

const ItemContainer = ({ id, image, name, cost_per_day }) => {
  const [value, setValue] = useState(5);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const intValue = parseInt(inputValue.replace(/\D/g, ''), 10);
    setValue(intValue);
  };

  return (
    <div className={style.details_itemContainer}>
      <img src={image} alt='car' className={style.details_image} />
      <div className={style.details_table_container}>
        <h3>{name}</h3>
        <table className={style.car_table}>
          <tr>
            <td>Cost</td>
            <td className={style.table_right_item}>${cost_per_day}</td>
          </tr>
          <tr>
            <td>Days</td>
            <td className={style.table_right_item}>
              <input
                type='text'
                value={value}
                onChange={handleInputChange}
                placeholder='Enter an integer'
              />
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td className={style.table_right_item}>${cost_per_day * value}</td>
          </tr>
        </table>
        <h2 className={style.details_separator}>..................</h2>
        <Link href={`/reservation?id=${id}`}>
          <RoundedButton color={colors.green}>RESERVE</RoundedButton>
        </Link>
      </div>
      <div className={style.details_button_container}>
        <Link href={`/home`} className={style.details_button_link}>
          <img src={arrow.src} alt='left icon' height='5px' />
        </Link>
      </div>
    </div>
  );
};

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Api.getCar(id));
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return data.data ? <ItemContainer {...data.data} /> : <p>No cars here</p>;
}

ItemContainer.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost_per_day: PropTypes.number.isRequired,
};

