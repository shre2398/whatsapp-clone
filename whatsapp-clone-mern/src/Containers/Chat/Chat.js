import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import './Chat.css';
import axios from '../../axios';

function Chat({ messages }) {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post('/messages/new', {
      message: input,
      name: 'Shreyas C',
      timestamp: 'Just now!!',
      received: false
    });

    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__headerInfo'>
          <h3> Room name </h3> <p> Last seen at... </p>{' '}
        </div>{' '}
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>{' '}
          <IconButton>
            <AttachFileIcon />
          </IconButton>{' '}
          <IconButton>
            <MoreVertIcon />
          </IconButton>{' '}
        </div>{' '}
      </div>
      <div className='chat__body'>
        {' '}
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && 'chat__receiver'}`}>
            <span className='chat__name'> {message.name} </span>{' '}
            {message.message}{' '}
            <span className='chat__timestamp'> {message.timestamp} </span>{' '}
          </p>
        ))}
        {/* <p className='chat__message chat__receiver'>
                <span className='chat__name'>Shreyasss</span>
                This is a message
                <span className='chat__timestamp'>{new Date().toUTCString()}</span>
              </p> */}{' '}
      </div>
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Type a message'
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type='submit'>
            Send a message{' '}
          </button>{' '}
          <MicIcon />
        </form>{' '}
      </div>{' '}
    </div>
  );
}

export default Chat;
