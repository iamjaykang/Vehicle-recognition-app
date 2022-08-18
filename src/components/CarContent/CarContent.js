import React from "react";
import { useState, useEffect } from "react";
import './CarContent.css'

const CarContent = ({ carArray }) => {

  return (
    <div className="content">
      {carArray.map((carItem, index) => {
        if (
          (carItem.probability >= 0.97 && carItem.tagName === "Sedan") ||
          (carItem.probability >= 0.9 && carItem.tagName === "SUV")
        ) {
          return <div className="car_type"><span>{carItem.tagName}</span></div>;
        } else if (
          (carItem.probability >= 0.997 && carItem.tagName === "BMW") ||
          (carItem.probability >= 0.99 && carItem.tagName === "Toyota")
        ) {
          return <div className="car_brand"><span>{carItem.tagName}</span></div>;
        } else if (
          (carItem.probability >= 0.99 && carItem.tagName === "White") ||
          (carItem.probability >= 0.9 && carItem.tagName === "Black")
        ) {
          return <div className="car_colour"><a>{carItem.tagName}</a></div>;
        }
      })}
    </div>
  );
};

export default CarContent;
