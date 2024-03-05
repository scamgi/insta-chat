import { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth.js';

// we use cookies to know if the user is logged in
import Coockies from 'universal-cookie';
const cookies = new Coockies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return <div>
      <Auth setIsAuth={setIsAuth} />
    </div>;
  }

  return (
    <div>
      {room ? (
        <div>Chat</div> // UI
      ) : (
        <div className='room'>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button
            onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
