import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

import './App.css';
import Chat from './Containers/Chat/Chat';
import Sidebar from './Containers/Sidebar/Sidebar';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('b302e9fea3541be91c7c', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      setMessages([...messages, data]);
    });

    console.log(messages);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className='app'>
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
