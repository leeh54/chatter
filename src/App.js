import React from 'react';
import logo from './logo5.png';
import TextInput from './TestInput';
import TalkBubble from './TalkBubble';

import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Chats
        <img src={logo} className="logo" alt="" />
      </header>
      <TalkBubble/>
      <TextInput/>
    </div>
  );
}

export default App;
