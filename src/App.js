import React, {Component} from 'react';
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import ComposeForm from './components/ComposeForm'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {  /// Setting state
      data: [],
      showForm: false
    }
  }
  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({data: json})
  }

  toggleStar = (id) => {

    const newStarValue = !(this.state.data.find(message => message.id === id).starred)

    this.setState({ data: this.state.data.map(message => message.id === id ? {...message, starred : !message.starred} : {...message})  })

    const updateStar = async () =>  {
      await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({
          messageIds: [id],
          command: "star",
          star: newStarValue

        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    }

    updateStar()

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
    this.setState({ data: this.state.data.map(message => message.selected ? {...message, read: false} : {...message} )})

    const selectedMessages = this.state.data.filter(message=> message.selected);
    const selectedIds = selectedMessages.map(message => message.id)
    console.log(selectedIds)

    const update2Unread = async () =>  {
      await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({
          messageIds: selectedIds,
          command: "read",
          read: false

        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    }
    update2Unread()
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

  handleRemoveLabel = (event) => {
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

  toggleForm = () => {

    this.setState({showForm: !this.state.showForm })

  }
  handleRemoveMessage= () => {

     const messages = this.state.data
     const result = messages.filter(message => message.selected === false);

     this.setState({data: result})


   }


  handleNewMessage = (e) => {
    e.preventDefault()
    const createMessage = async () =>  {
       console.log("YESAAAAAAA")
       let subject = e.target.subject.value
       let body = e.target.body.value
       let newMessage = { subject, body }
      const response = await fetch('http://localhost:8082/api/messages', {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const message = await response.json()


      this.setState({ data: [...this.state.data, message] })


      // const person = await response.json()
      //     this.setState({people: [...this.state.people, person]})

   }

   createMessage()
 }

  render() {

    let unReadCount = 0;
    let data = this.state.data
     for(let i = 0; i < data.length; i++) {
       if(!data[i].read) {
         unReadCount+= 1
       }

     }


    return (

      <div className="App">

      <div className="container">

        <Toolbar
           allChecked={this.state.data.reduce((acc, ele) => acc && ele.selected, true) }
           noneChecked={this.state.data.reduce((acc, ele) => acc && !ele.selected, true)}
           unReadCount={unReadCount}
           setSelectedMessagesToRead={this.setSelectedMessagesToRead}
           setSelectedMessagesToUnread={this.setSelectedMessagesToUnread}
           handleAddLabel={this.handleAddLabel}
           handleRemoveLabel={this.handleRemoveLabel}
           toggleForm={this.toggleForm}
        />
        {this.state.showForm ? <ComposeForm handleNewMessage={this.handleNewMessage}/> : null}
        <Messages messages={this.state.data}
           toggleStar={this.toggleStar}
           toggleCheck={this.toggleCheck}
         />

      </div>
    </div>)
  }

}

export default App;
