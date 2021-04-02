import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import './Chat.css';

function Chat() {
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        <p className='chat__message'>
          <span className='chat__name'>Shreyasss</span>
          This is a message
          <span className='chat__timestamp'>{new Date().toUTCString()}</span>
        </p>

        <p className='chat__message'>
          <span className='chat__name'>Shreyasss</span>
          This is a message
          <span className='chat__timestamp'>{new Date().toUTCString()}</span>
        </p>

        <p className='chat__message'>
          <span className='chat__name'>Shreyasss</span>
          This is a message
          <span className='chat__timestamp'>{new Date().toUTCString()}</span>
        </p>
      </div>
    </div>
  );
}

export default Chat;
