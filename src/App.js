import { useEffect, useReducer } from 'react';
import axios from 'axios';
import socket from './socket';

import reducer from './reducer';

import Chat from './components/Chat';
import JoinBlock from './components/JoinBlock';


function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    //оповещаем frontend
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    //оповещаем сокет
    socket.emit('ROOM:JOIN', obj);
    //оповещаем сервер
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;
  
  return (
    <div className="App">
      {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>

  );
}

export default App;
