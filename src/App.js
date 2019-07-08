import React from 'react';
import logo from './logo5.png';
import TextInput from './TestInput';

import './App.css';
import NamePicker from './NamePicker';

class App extends React.Component {
  state = {
    messages: [],
    name: '',
    editName: false,
  }

  componentWillMount(){
    var name = localStorage.getItem('name')
    if(name){
      this.setState({name})
    }
  }

  sendMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages,]
    this.setState({ messages: newMessagesArray })
  }

  setEditName = (editName) => {
    if(!editName){
      localStorage.setItem('name', this.state.name)
    }
    this.setState({editName})
  }

  render() {
    var { messages, name } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className="title-logo">
            <img src={logo} className="logo" alt="" />
            Chats
        </div>
          <NamePicker
            name={this.state.name}
            editName={this.state.editName}
            changeName={name => this.setState({ name })}
            setEditName={this.setEditName}
          />
        </header>
        <main className="messages">
          {
            messages.map((m, i) => {
              return <div key={i} className="message-box" from={m.from === name ? "me" : "you"}
              >
                {m.from!==name && <div className="from">
                  <span>{m.from}</span>
                </div>}
                <div className="bubble-wrap">
                  <div className="bubble">
                    <span>{m.text}</span>
                  </div>
                </div>
              </div>
            })
          }
        </main>
        <TextInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}
export default App;
