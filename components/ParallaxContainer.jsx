// components/ParallaxContainer.js
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/ParallaxContainer.module.css';

const ParallaxContainer = ({ children, speed = 0.5, className = '' }) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && inView) {
        const top = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const elementHeight = ref.current.offsetHeight;
        
        if (top < windowHeight && top > -elementHeight) {
          setOffset(top * speed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, inView]);

  return (
    <div 
      ref={node => {
        ref.current = node;
        inViewRef(node);
      }}
      className={`${styles.parallaxContainer} ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;