'use client';
import React, { useEffect, useRef, useState } from 'react';
import style from './page.module.css';
import arrow from '@/assets/images/arrow.png';
import PropTypes from 'prop-types';
import Link from 'next/link';

const ItemContainer = ({ id, image, name, description }) => {
  return (
    <div className={style.itemContainer}>
      <div className={style.inside}>
        <div>
          <div className={style.bgCircle}></div>
          <Link href={`/cars?id=${id}`}>
            <img src={image} alt='item' />
          </Link>
        </div>
        <h3>{name}</h3>
        <h2>.........</h2>
        <h4>{description}</h4>
      </div>
    </div>
  );
};

const Home = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const carousal = useRef(null);

  const response = [
    {
      id: '1',
      image: 'https://i.ibb.co/5KWVYn6/range.png',
      name: 'Range Rover',
      description: 'A great choice for traveling with your besties',
      cost_per_day: '27',
    },
    {
      id: '2',
      image: 'https://i.ibb.co/mHgRBsq/chevrolet.png',
      name: 'Chevrolet',
      description: 'A great choice for traveling with your besties',
      cost_per_day: '13',
    },
    {
      id: '3',
      image: 'https://i.ibb.co/s5jgd7R/fortuner.png',
      name: 'Fortuner',
      description: 'A great choice for traveling with your besties',
      cost_per_day: '23',
    },
    {
      id: '4',
      image: 'https://i.ibb.co/s5jgd7R/fortuner.png',
      name: 'Fortuner',
      description: 'A great choice for traveling with your besties',
      cost_per_day: '23',
    },
    {
      id: '5',
      image: 'https://i.ibb.co/s5jgd7R/fortuner.png',
      name: 'Fortuner',
      description: 'A great choice for traveling with your besties',
      cost_per_day: '23',
    },
  ];

  const goRight = () => {
    const scroll = isMobile
      ? carousal?.current?.scrollLeft + carousal?.current?.offsetWidth
      : carousal?.current?.scrollLeft + carousal?.current?.offsetWidth / 3;

    carousal?.current?.scrollTo({
      left: scroll,
      behavior: 'smooth',
    });
  };

  const goLeft = () => {
    const scroll = isMobile
      ? carousal?.current?.scrollLeft - carousal?.current?.offsetWidth
      : carousal?.current?.scrollLeft - carousal?.current?.offsetWidth / 3;
    carousal?.current?.scrollTo({
      left: scroll,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    const handleScroll = () => {
      setScrollLeft(carousal.current.scrollLeft);
    };
    carousal?.current?.addEventListener('scroll', handleScroll);

    return () => {
      carousal?.current?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={style.home}>
      <h1>SELECT YOUR RIDE</h1>
      <h4>You Have The Best Choice</h4>
      <div className={style.carousalContainer}>
        <div className={style.left}>
          <div
            onClick={goLeft}
            style={{
              backgroundColor:
                scrollLeft === 0 ? 'rgba(0, 0, 0, 0.2)' : 'var(--green)',
            }}
          >
            <img src={arrow.src} alt='left icon' />
          </div>
        </div>

        <div ref={carousal} className={style.carousal}>
          {response.map((car, i) => (
            <ItemContainer key={car + i} {...car} />
          ))}
        </div>

        <div className={style.right}>
          <div
            onClick={goRight}
            style={{
              backgroundColor:
                scrollLeft + carousal?.current?.offsetWidth >=
                carousal?.current?.scrollWidth
                  ? 'rgba(0, 0, 0, 0.2)'
                  : 'var(--green)',
            }}
          >
            <img src={arrow.src} alt='right icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

ItemContainer.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Home;

