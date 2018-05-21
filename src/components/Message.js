//1. Import from React
import React from "react"


//2.Create a function
const Message = (props) => {
  const message = props.message;

  function handleStarClick(e) {

    props.toggleStar(message.id);
  }
  function handleCheckClick(e) {


    props.toggleCheck(message.id);
  }

  return (
    <div className={`row message  ${message.read ? "read": "unread"} ${message.selected ? "selected" : ""}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked = {message.selected} onChange={handleCheckClick}/>
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}` } onClick={handleStarClick}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">

        {message.labels.map((label, idx) =>
          <span key={idx} className="label label-warning"> {label} </span>
        )}



        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
