import React, { useState, useEffect, useRef } from 'react';
import './Css/chatBot.css';
import sendIcon from './Gfx/send.svg';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('Type here...');
  const [iteration, setIteration] = useState(0);
  
  const chatSessionRef = useRef(null);
  const textAreaRef = useRef(null);

  const validateMessage = () => {
    return inputMessage !== '' && inputMessage !== 'Type here...';
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (iteration === 0) {
      setTimeout(() => {
        initiateConversation();
      }, 2000);
    }
    setIteration(prev => prev + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const initiateConversation = () => {
    setMessages([{
      type: 'reply',
      text: 'Hello! I am ChatBot.'
    }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateMessage()) {
      const newMessages = [...messages];
      newMessages.push({
        type: 'message',
        text: inputMessage
      });
      
      setMessages(newMessages);
      
      setTimeout(() => {
        setMessages([...newMessages, {
          type: 'reply',
          text: '{{ reply }}'
        }]);
      }, 750);

      setInputMessage('Type here...');
      textAreaRef.current?.focus();
    } else {
      setMessages([...messages, {
        type: 'reply',
        text: 'Type something!'
      }]);
    }
  };

  const handleInputFocus = () => {
    if (!validateMessage()) {
      setInputMessage('');
    }
  };

  const handleInputBlur = () => {
    if (!validateMessage()) {
      setInputMessage('Type here...');
    }
  };

  useEffect(() => {
    if (chatSessionRef.current) {
      chatSessionRef.current.scrollTo({
        top: chatSessionRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div className={`chatBot ${isOpen ? 'active' : ''}`}>
      <div className="chatBotHeading">
        <label 
          htmlFor="chatTextBox" 
          id="chatOpenTrigger" 
          className={isOpen ? 'active' : ''}
          onClick={handleOpen}
        >
          Any Queries? Ask Me!
        </label>
      </div>
      
      <hr className={isOpen ? 'active' : ''} />
      
      <div className={`chatBody ${isOpen ? 'active' : ''}`}>
        <div className="chatSession" ref={chatSessionRef}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className="container" 
              id={msg.type === 'message' ? 'messageContainer' : 'replyContainer'}
            >
              <p className={`${msg.type} animateChat ${msg.type === 'reply' ? 'accentColor' : ''}`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <form className={`chatForm ${isOpen ? 'active' : ''}`} onSubmit={handleSubmit} autoComplete="off">
        <div className="typingArea">
          <textarea
            ref={textAreaRef}
            name="chatInput"
            id="chatTextBox"
            className="textArea"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button type="submit" className="sendButton" id="sendButton">
            <img src={sendIcon} alt="Send" />
          </button>
        </div>
        <button type="button" id="chatCloseTrigger" onClick={handleClose}>
          Close Chat!
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
