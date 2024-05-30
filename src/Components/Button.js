import React from 'react';

const Button = ({ text, onClick, icon, icons, className, btn_css, value }) => {
  return (
    <button
      type="submit"
      className={className}
      onClick={onClick}
    >
      {<i className={icons }></i>}
      {" "}{text}{" "}
      {<i className={icon}></i>}
      {<span className={btn_css}>{value}</span>}
    </button>
  );
};

export default Button;
