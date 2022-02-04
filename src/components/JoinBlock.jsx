import React, { useState } from 'react';
import axios from 'axios';


function JoinBlock({onLogin}) {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(true);

    const onEnter = async () => {
        if (!roomId || !userName) {
           return  alert('Неверные данные');
        }
        const obj = {
            roomId,
            userName,
        }
        setLoading(true);
        await axios.post('/rooms', obj);
        onLogin(obj);
    };

    return (
        <div className='auth'>
            <div>
                <input placeholder='Комната' value={roomId} onChange={e => setRoomId(e.target.value)}/>
            </div>
            <div>
                <input placeholder='Ваше имя' value={userName} onChange={e => setUserName(e.target.value)}/>
            </div>
            <div>
                <button onClick={onEnter}>
                    {isLoading ? 'ВОЙТИ' : 'ВХОД...'}
                </button>
            </div>
            
        </div>
    );
}

export default JoinBlock;