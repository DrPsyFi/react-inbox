import React, {Component} from 'react';
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import './App.css';
import data from './data.js'

data.forEach(message => {
  if (message.selected) {

  }
  else {
    message.selected = false;
  }
})


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {  /// Setting state
      data
    }
  }

  toggleStar = (id) => {

    this.setState({ data: this.state.data.map(message => message.id === id ? {...message, starred : !message.starred} : {...message})  })

  }
  toggleCheck= (id) => {

    this.setState({ data: this.state.data.map(message => message.id === id ? {...message, selected : !message.selected} : {...message})  })

  }


  toggleAll = () => {
    const messages = this.state.data;
    let newState
    let someSelected = messages.some(message => message.selected === true)
    let everySelected = messages.every(message => message.selected === true)

      if (everySelected)  {
          newState = messages.map(message => {
            message.selected = false
            return message
          })
      }
      else if(!someSelected) {
        console.log(someSelected)
        newState = messages.map(message => {
          message.selected = true
          return message
        })
      }
      else {
        newState = messages.map(message => {
          message.selected = true
          return message
        })
      }
       this.setState({data: newState})

  }

  setSelectedMessagesToRead= () => {
    this.setState({ data: this.state.data.map(message => message.selected ? {...message, read: true , selected: false} : {...message} )})


  }
  setSelectedMessagesToUnread= () => {
    this.setState({ data: this.state.data.map(message => message.selected ? {...message, read: false , selected: false} : {...message} )})

  }
  handleAddLabel= (event) => {
    let newLabel = event.target.value
    const messages = this.state.data;

    messages.map(message => {
      if (message.selected) {
        var newLabelInLabels = message.labels.find(function(label) {
          return label === newLabel
        })

        if(!newLabelInLabels){
          message.labels.push(newLabel)
        }
        message.selected = false

      }
    })
    this.setState({ data: messages })
  }
  handleRemoveLabel= (event) => {
    let selectedLabel = event.target.value
    const messages = this.state.data

    messages.map(message => {
      if(message.selected){
        // remove selectedLabel from message.labels
        let result = message.labels.filter(label => label !== selectedLabel)
        message.labels = result
        message.selected = false
      }
      this.setState({ data: messages });
  })
}
  handleRemoveMessage= () => {

    const messages = this.state.data
    const result = messages.filter(message => message.selected === false);

    this.setState({data: result})

  }

  render() {

    let unReadCount = 0;
    let data = this.state.data
     for(let i = 0; i < data.length; i++) {
       if(!data[i].read) {
         unReadCount+= 1
       }

     }


    return (<div className="App">
      <div className="container">

        <Toolbar
           allChecked={this.state.data.reduce((acc, ele) => acc && ele.selected, true) }
           noneChecked={this.state.data.reduce((acc, ele) => acc && !ele.selected, true)}
           unReadCount={unReadCount}
           setSelectedMessagesToRead={this.setSelectedMessagesToRead}
           setSelectedMessagesToUnread={this.setSelectedMessagesToUnread}
           handleAddLabel={this.handleAddLabel}
           handleRemoveLabel={this.handleRemoveLabel}
           handleRemoveMessage={this.handleRemoveMessage}
           toggleAll={this.toggleAll}
        />
        <Messages messages={this.state.data}
           toggleStar={this.toggleStar}
           toggleCheck={this.toggleCheck}
         />

      </div>
    </div>)
  }

}

export default App;
