import React, { useRef } from 'react';
import styles from './CarouselSection.module.css'; // Import CSS module

function CarouselSection() {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);

  // Handle left and right arrow clicks
  const handleLeftClick = () => {
    if (wrapperRef.current && carouselRef.current) {
      wrapperRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const handleRightClick = () => {
    if (wrapperRef.current && carouselRef.current) {
      wrapperRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <i className={`${styles.arrow} ${styles.left} fa-solid fa-angle-left`} onClick={handleLeftClick}></i>
        <ul className={styles.carousel} ref={carouselRef}>
          <li className={styles.card}>
            <div className={styles.img}>
              <img src="c4.jpg" alt="img" draggable="false" />
            </div>
            <h2>Blanche Pearson</h2>
            <span>Sales Manager</span>
          </li>
          <li className={styles.card}>
            <div className={styles.img}>
              <img src="c3.jpg" alt="img" draggable="false" />
            </div>
            <h2>Joenas Brauers</h2>
            <span>Web Developer</span>
          </li>
          <li className={styles.card}>
            <div className={styles.img}>
              <img src="c4.jpg" alt="img" draggable="false" />
            </div>
            <h2>Lariach French</h2>
            <span>Online Teacher</span>
          </li>
          <li className={styles.card}>
            <div className={styles.img}>
              <img src="c3.jpg" alt="img" draggable="false" />
            </div>
            <h2>James Khosravi</h2>
            <span>Freelancer</span>
          </li>
          <li className={styles.card}>
            <div className={styles.img}>
              <img src="home5.jpg" alt="img" draggable="false" />
            </div>
            <h2>Kristina Zasiadko</h2>
            <span>Bank Manager</span>
          </li>
        </ul>
        <i className={`${styles.arrow} ${styles.right} fa-solid fa-angle-right`} onClick={handleRightClick}></i>
      </div>
    </div>
  );
}

export default CarouselSection;
