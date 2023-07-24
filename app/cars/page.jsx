'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import style from './page.module.css';

const ItemContainer = ({ image, name, cost_per_day }) => {
  const [value, setValue] = useState(5);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const intValue = parseInt(inputValue.replace(/\D/g, ''), 10);
    setValue(intValue);
  };

  return (
    <div className={style.itemContainer}>
      <img src={image} alt='car' />
      <div>
        <h3>{name}</h3>
        <table className={style.car_table}>
          <tr>
            <td>Cost</td>
            <td>${cost_per_day}</td>
          </tr>
          <tr>
            <td>Days</td>
            <input
              type='text'
              value={value}
              onChange={handleInputChange}
              placeholder='Enter an integer'
            />
          </tr>
          <tr>
            <td>Total</td>
            <td>${cost_per_day * value}</td>
          </tr>
        </table>
        <p>
          <strong>5.9% APR</strong>Representative
        </p>
        <Link href='/home'>Discover more models</Link>
      </div>
    </div>
  );
};

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // To execute the fetch operation

  const response = {
    id: id,
    image: 'https://i.ibb.co/5KWVYn6/range.png',
    name: 'Range Rover',
    description: 'A great choice for traveling with your besties',
    cost_per_day: '27',
  };

  return <ItemContainer {...response} />;
}

ItemContainer.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost_per_day: PropTypes.number.isRequired,
};

