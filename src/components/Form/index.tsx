import React from "react";

const Form = ({children, className, title, onSubmit}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      <h1>{title}</h1>
      {children}
    </form>
  )
}

export default Form;