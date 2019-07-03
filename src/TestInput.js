import React from 'react'
import { FiSend } from "react-icons/fi"; 

class TextInput extends React.Component {

    state={
        text: "",
        /*
        text:"Write your message here...",
        */
    }

    send = () => {
        this.props.sendMessage(this.state.text)
        this.setState({text:""})
    }

    keyPress = (e) => {
        if(e.key === 'Enter'){
            this.send()
        }
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render(){
        var {text} = this.state
        return (<div className="text-input">
        <input value={text}
            onKeyPress={this.keyPress}
            placeholder="Write your message here"
            onChange={this.handleChange}
        />
        <button disabled={!text} onClick={this.send}>
            <FiSend />
        </button>
        </div>)
    }
}

export default TextInput