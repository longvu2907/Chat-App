import React from "react";
import "./index.scss";

export default function GenderSelect({ register }) {
  return (
    <div className='gender-input'>
      <span>Gender:</span>
      <ul>
        <li>
          <input
            type='radio'
            id='male'
            name='gender'
            value='male'
            {...register("gender")}
          />
          <label htmlFor='male'>Male</label>
          <div className='check'></div>
        </li>
        <li>
          <input
            type='radio'
            id='female'
            name='gender'
            value='female'
            {...register("gender")}
          />
          <label htmlFor='female'>Female</label>
          <div className='check'></div>
        </li>
      </ul>
    </div>
  );
}
