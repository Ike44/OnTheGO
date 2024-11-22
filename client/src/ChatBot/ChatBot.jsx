import React, { useState, useEffect, useRef } from 'react';
import './Css/chatBot.css';
import sendIcon from './Gfx/send.svg';
import chatbotLogo from './Gfx/chatbot.png';

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
      }, 1000);
    }
    setIteration(prev => prev + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const initiateConversation = () => {
    setMessages([{
      type: 'reply',
      text: 'Hello! I am ChatBot. How can I help you today?'
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
        text: 'Please type something so I can better assist you.'
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
      {!isOpen ? (
        <img 
          src={chatbotLogo} 
          alt="ChatBot" 
          onClick={handleOpen}
          style={{ 
            height: '40px', 
            width: 'auto', 
            cursor: 'pointer',
            padding: '8px',
            backgroundColor: '#1a73e8',
            borderRadius: '20%',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}
        />
      ) : (
        <>
          <div style={{
            padding: '15px',
            backgroundColor: '#1a73e8',
            color: 'white',
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={chatbotLogo} 
                alt="ChatBot" 
                style={{ height: '30px', width: 'auto' }}
              />
              <span style={{ fontSize: '16px', fontWeight: '500' }}>ChatBot Assistant</span>
            </div>
            <button 
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '5px'
              }}
            >
              ×
            </button>
          </div>
          
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
                placeholder="Type your message..."
              />
              <button type="submit" className="sendButton" id="sendButton">
                <img src={sendIcon} alt="Send" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBot;
