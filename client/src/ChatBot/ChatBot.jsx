import React, { useState, useEffect, useRef } from 'react';
import './Css/chatBot.css';
import sendIcon from './Gfx/send.svg';
import chatbotLogo from './Gfx/chatbot.png';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [iteration, setIteration] = useState(0);
  const [threadId, setThreadId] = useState(null);
  
  const chatSessionRef = useRef(null);
  const textAreaRef = useRef(null);

  // Load messages from sessionStorage when component mounts
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatBotMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
      setIteration(1); // Prevent initial message if there's history
    }
  }, []);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatBotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const validateMessage = () => {
    return inputMessage !== '' && inputMessage !== 'Type here...';
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (iteration === 0 && messages.length === 0) {
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
      text: 'Hello! I am Brenda, your customer service representative for OnTheGo. How can I help you today?'
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateMessage()) {
      const newMessages = [...messages];
      newMessages.push({
        type: 'message',
        text: inputMessage
      });

      setMessages(newMessages);

      try {
        const response = await axios.post('http://localhost:3001/api/chatbot/chat', { 
          message: inputMessage,
          threadId: threadId 
        });
        
        const { reply, threadId: newThreadId } = response.data;
        setThreadId(newThreadId);

        setMessages([...newMessages, {
          type: 'reply',
          text: reply
        }]);
      } catch (error) {
        console.error('Error communicating with backend:', error);
        setMessages([...newMessages, {
          type: 'reply',
          text: 'Sorry, there was an error processing your request.'
        }]);
      }

      setInputMessage('');
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
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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
              <span style={{ fontSize: '16px', fontWeight: '500' }}>Chat with Brenda</span>
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
                onKeyPress={handleKeyPress}
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
