import React from "react";

const QuickReplyChild = props => {
  

    const handleClick = (event)=>{
        props.click(event,props.payload.fields.payload.stringValue,props.payload.fields.text.stringValue )
        
    }

  if (props.payload.fields.payload) {
    return (
      <div className="border small">
        <p onClick={handleClick}>{props.payload.fields.text.stringValue}</p>
        <p >{props.payload.fields.payload.stringValue}</p>
      </div>
    );
  } else {
    return (
      <div className="border small">
        <p >{props.payload.fields.text.stringValue}</p>
        <p >{props.payload.fields.link.stringValue}</p>
      </div>
    );
  }
};

export default QuickReplyChild;
