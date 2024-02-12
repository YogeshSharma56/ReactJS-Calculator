import React from 'react'
import './Button.css'

const Button = ({className, BtnValue, onClick}) => {
    
  return (
    <button className={className} onClick={onClick}>
        {BtnValue}
        </button>
  );

};


export default Button ;

