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
  setSelectedMessagesToRead= () => {
    this.setState({ data: this.state.data.map(message => message.selected ? {...message, read: true} : {...message} )})
  }
  setSelectedMessagesToUnread= () => {
    this.setState({ data: this.state.data.map(message => message.selected ? {...message, read: false} : {...message} )})
  }
  handleAddLabel= (event) => {
    let newLabel = event.target.value
    const messages = this.state.data;

    messages.forEach(message => {
      if (message.selected) {
        var newLabelInLabels = message.labels.find(function(label) {
          return label === newLabel
        })

        if(!newLabelInLabels){
          message.labels.push(newLabel)
        }
      }
    })
    this.setState({ data: messages });
  }
  handleRemoveLabel= (event) => {
    let selectedLabel = event.target.value
    const messages = this.state.data

    messages.forEach(message => {
      if(message.selected){
        // remove selectedLabel from message.labels
        let result = message.labels.filter(label => label !== selectedLabel)
        console.log(result)
        message.labels = result
      }
      this.setState({ data: messages });

  })
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
