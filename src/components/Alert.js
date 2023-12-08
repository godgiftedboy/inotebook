import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    if(word==="danger"){
      word="error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{height: '50px'}}> 
    {/* to prevent the shifting the height was added to the alert === Cumulative Layout Shift */}
  {  props.alert && ( //it was added because alert was set to null at first.
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)} </strong>
        {props.alert.msg}
      </div>
    )}
    </div>
  );
}