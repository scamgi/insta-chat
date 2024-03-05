import { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth.js';

// we use cookies to know if the user is logged in
import Coockies from 'universal-cookie';
import Chat from './components/Chat.js';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase-config.js';
const cookies = new Coockies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return <div>
      <Auth setIsAuth={setIsAuth} />
    </div>;
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
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
      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
