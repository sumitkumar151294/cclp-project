import React from 'react';

const Button = ({ text, onClick, end_icon, start_icon, className, btn_css, value, disabled }) => {
  return (
    <button
      type="submit"
      className={`${className} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {start_icon && <i className={start_icon}></i>}
      {" "}{text}{" "}
      {end_icon && <i className={end_icon}></i>}
      {value && <span className={btn_css}>{value}</span>}
    </button>
  );
};

export default Button;
