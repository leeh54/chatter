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

  sendMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages,]
    this.setState({ messages: newMessagesArray })
  }

  render() {
    var { messages } = this.state
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
            setEditName={editName => this.setState({ editName })}
          />
        </header>
        <main className="messages">
          {
            messages.map((m, i) => {
              return <div key={i} className="message-box">
                <div className="from">
                  <span>{m.from}</span>
                </div>
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
