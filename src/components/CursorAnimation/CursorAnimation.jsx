import React, { useEffect, useRef } from 'react';
import './CursorAnimation.css';

const CursorAnimation = () => {
  const cursorRef = useRef(null);
  const circlesRef = useRef([]);
  const coords = { x: 0, y: 0 };

  useEffect(() => {
    const circles = circlesRef.current;

    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = '#6290FD';
    });

    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${13}px, ${13}px)`;
      }

      circles.forEach((circle, index) => {
        const nextCircle = circles[index + 1] || circles[0];

        circle.x += (x - circle.x) * 0.3;
        circle.y += (y - circle.y) * 0.3;

        circle.style.transform = `translate(${circle.x - 24}px, ${circle.y - 21}px) scale(${(circles.length - index) / circles.length})`;

        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      {[...Array(20)].map((_, index) => (
        <div className="circle" key={index} ref={(el) => (circlesRef.current[index] = el)}></div>
      ))}
    </div>
  );
};

export default CursorAnimation;
