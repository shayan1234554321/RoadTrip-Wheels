'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import style from './page.module.css';

const ItemContainer = ({ image, name, cost_per_day }) => {
  return (
    <div className={style.itemContainer}>
      <img src={image} alt='car' />
      <div>
        <h3>{name}</h3>
        <p>- €350 deposit upon any car PuchaSet</p>
        <table className={style.car_table}>
          <tr>
            <td>Finance fee</td>
            <td>€{cost_per_day}</td>
          </tr>
          <tr>
            <td>Option to purchase fee</td>
            <td>€{cost_per_day * 2}</td>
          </tr>
          <tr>
            <td>Total ammount payable</td>
            <td>€{cost_per_day * 10}</td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>10 days</td>
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

