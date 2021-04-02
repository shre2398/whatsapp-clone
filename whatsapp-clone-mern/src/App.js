import './App.css';
import Chat from './Containers/Chat/Chat';
import Sidebar from './Containers/Sidebar/Sidebar';

function App() {
  return (
    <div className='app'>
      <div className='app__body'>
        <Sidebar></Sidebar>
        <Chat></Chat>
      </div>
    </div>
  );
}

export default App;
