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
    var messages = [...this.state.messages, m]
    this.setState({ messages })
  }

  render() {
    /* console.log(this.state.messages); */
    var { messages } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className="title-logo">
            <img src={logo} className="logo" alt="" />
            Chats
        </div>
          <NamePicker />
        </header>
        <main className="messages">
          {
            messages.map((m, i) => {
              return <div key={i} className="bubble-wrap">
                <div className="bubble">
                  <span>{m}</span>
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
