import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button 
      {...props} 
      className={props.className || 'default-button-style'}
    >
      {children}
    </button>
  );
};

export default Button;