import React from 'react';
import logo from './logo5.png';
import TextInput from './TestInput';

import './App.css';
import NamePicker from './NamePicker';

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

class App extends React.Component {
  state = {
    messages: [],
    name: '',
    editName: false,
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name) {
      this.setState({ name })
    }

    /* <=========================> */
    firebase.initializeApp({
      apiKey: "AIzaSyBAJVwrP5J4AhVKd5ijYtcTF9XMV6tIcY4",
      authDomain: "msgr-2.firebaseapp.com",
      projectId: "msgr-2",
      storageBucket: "msgr-2.appspot.com",
    });

    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
    /* <=========================> */
  }

  /* <===========================> */
  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a, b) => b.ts - a.ts)
    this.setState({ messages })
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }
  /* <===========================> */

  // sendMessage = (m) => {
  //   const message = {
  //     text: m,
  //     from: this.state.name
  //   }
  //   var newMessagesArray = [message, ...this.state.messages,]
  //   this.setState({ messages: newMessagesArray })
  // }

  setEditName = (editName) => {
    if (!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({ editName })
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
                {m.from !== name && <div className="from">
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
        <TextInput sendMessage={text=> this.send({text})} />
      </div>
    );
  }
}
export default App;
