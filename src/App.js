import React, {Component} from 'react';
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import './App.css';
import data from './data.js'

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
  render() {
    return (<div className="App">
      <div className="container">

        <Toolbar/>
        <Messages messages={this.state.data} toggleStar={this.toggleStar} toggleCheck={this.toggleCheck} />

      </div>
    </div>)
  }

}

export default App;
