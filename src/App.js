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
  render() {

    let unReadCount = 0;
    let data = this.state.data
     for(let i = 0; i < data.length; i++) {
       if(!data[i].read) {
         unReadCount+= 1
       }
       console.log(unReadCount)
     }


    return (<div className="App">
      <div className="container">

        <Toolbar
           allChecked={this.state.data.reduce((acc, ele) => acc && ele.selected, true) }
           noneChecked={this.state.data.reduce((acc, ele) => acc && !ele.selected, true)}
           unReadCount={unReadCount}
           setSelectedMessagesToRead={this.setSelectedMessagesToRead}
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
