import React from 'react';

const Button = ({ text, onClick, icon, icons, className, btn_css, value, disabled }) => {
  return (
    <button
      type="submit"
      className={`${className} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icons && <i className={icons}></i>}
      {" "}{text}{" "}
      {icon && <i className={icon}></i>}
      {value && <span className={btn_css}>{value}</span>}
    </button>
  );
};

export default Button;
