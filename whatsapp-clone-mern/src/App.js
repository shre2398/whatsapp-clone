import './App.css';
import Chat from './Containers/Chat/Chat';
import Sidebar from './Containers/Sidebar/Sidebar';

function App() {
  return (
    <div className='app'>
      <Sidebar></Sidebar>
      <Chat></Chat>
    </div>
  );
}

export default App;
