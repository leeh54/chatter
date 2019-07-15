import React from 'react';
import logo from './logo5.png';
import TextInput from './TestInput';

import './App.css';
import NamePicker from './NamePicker';

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import Camera from 'react-snap-pic'

class App extends React.Component {
  state = {
    messages: [],
    name: '',
    editName: false,
    showCamera: false
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name) {
      this.setState({ name })
    }

    /* <=========================> */
    firebase.initializeApp({
      apiKey: "AIzaSyC6kqtO0mZH6ASGWg4ec_ijAU7DUK7_Kpc",
      authDomain: "hcde438.firebaseapp.com",
      projectId: "hcde438",
      storageBucket: "hcde438.appspot.com",
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

  takePicture = (img) => {
    console.log(img)
    this.setState({ showCamera: false })
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
              return (<Message key={i} m={m} name={name} />)
            })
          }
        </main>
        {this.state.showCamera && <Camera takePicture={this.takePicture} />}
        <TextInput sendMessage={text => this.send({ text })}
          showCamera={() => this.setState({ showCamera: true })} />
      </div>
    );
  }
}
export default App;

function Message(props) {
  var { m, name } = props
  return (<div className="message-box" from={m.from === name ? "me" : "you"}
  >
    {m.from !== name && <div className="from">
      <span>{m.from}</span>
    </div>}
    <div className="bubble-wrap">
      <div className="bubble">
        <span>{m.text}</span>
      </div>
    </div>
  </div>)
}