import React from 'react';

const Input = (props) => {
  return (
    <input 
      {...props} 
      className={props.className || 'default-input-style'} 
    />
  );
};

export default Input;