//1. Import from React
import React from "react"
//2.Create a function

////const Toolbar = (props) =>
///Below is an example of destructuring props

const Toolbar = ({allChecked, noneChecked, setSelectedMessagesToRead,setSelectedMessagesToUnread, unReadCount,toggleForm,
  handleAddLabel, handleRemoveLabel, handleRemoveMessage}) => {
  let checkClass

    if (allChecked) {
      checkClass= "fa-check-square-o"
    }
    else if (noneChecked) {
      checkClass= "fa-square-o"
    }
    else {
      checkClass= "fa-minus-square-o"
    }


    return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unReadCount}</span>
          unread messages
        </p>

        <button className="btn btn-danger"
          onClick={toggleForm}
        >
          <i className="fa fa-plus"></i>


        </button>

        <button className="btn btn-default">
          <i className={`fa ${checkClass}`}></i>
        </button>

        <button className="btn btn-default"
          disabled={noneChecked}
          onClick={setSelectedMessagesToRead}
          >
          Mark As Read
        </button>

        <button className="btn btn-default"
          disabled={noneChecked}
          onClick={setSelectedMessagesToUnread}
          >
          Mark As Unread
        </button>

        <select className="form-control label-select"
          disabled={noneChecked}
          onChange={handleAddLabel}
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select"
        disabled={noneChecked}
        onChange={handleRemoveLabel}
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default"
        disabled={noneChecked}
        onClick={handleRemoveMessage}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

  )
}

export default Toolbar
