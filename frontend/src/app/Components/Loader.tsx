import React from "react";
import { motion } from "framer-motion";

const TriangleLoader = () => {
  // Color cycling animation for each polygon
  const colorCycle1 = {
    animate: {
      fill: ["#f15a24", "#ed1c24", "#f7931e", "#f15a24"],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.34, 0.66, 1],
      },
    },
  };

  const colorCycle2 = {
    animate: {
      fill: ["#f7931e", "#f15a24", "#ed1c24", "#f7931e"],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.34, 0.66, 1],
      },
    },
  };

  const colorCycle3 = {
    animate: {
      fill: ["#ed1c24", "#f7931e", "#f15a24", "#ed1c24"],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.34, 0.66, 1],
      },
    },
  };

  // Floating animation for the container
  const floatingAnimation = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <div
      className='flex items-center justify-center min-h-screen'
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <motion.div
        className='w-96 h-96 pt-8'
        variants={floatingAnimation}
        animate='animate'
      >
        <svg
          viewBox='0 0 2000 2000'
          className='w-full h-full'
          xmlns='http://www.w3.org/2000/svg'
        >
          {/* First polygon */}
          <motion.polygon
            points='928 781 1021 951 784.5 1371.97 1618 1371.97 1530.32 1544 509 1539 928 781'
            strokeWidth='0'
            variants={colorCycle1}
            animate='animate'
          />

          {/* Second polygon */}
          <motion.polygon
            points='1618 1371.97 784.5 1371.97 874.93 1211 1346 1211 923.1 456 1110.06 456 1618 1371.97'
            strokeWidth='0'
            variants={colorCycle3}
            animate='animate'
          />

          {/* Third polygon */}
          <motion.polygon
            points='418 1372.74 509 1539 928 781 1162.32 1211 1346 1211 923.1 456 418 1372.74'
            strokeWidth='0'
            variants={colorCycle2}
            animate='animate'
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default TriangleLoader;
