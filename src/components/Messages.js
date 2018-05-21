//1. Import from React
import React from "react"
import Message from "./Message.js"

//2.Create a function
const Messages = (props) => {
    return (
      <div>

        {props.messages.map(message =>
          <Message key={message.id} message={message} toggleStar={props.toggleStar} toggleCheck={props.toggleCheck}/>
        )}

      </div>

  )
}

export default Messages
