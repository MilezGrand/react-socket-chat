import React from 'react';

function JoinBlock() {
    return (
        <div className='auth'>
            <div>
            <input placeholder='Комната'></input>
            </div>
            <div>
            <input placeholder='Ваше имя'></input>
            </div>
            <div>
            <button>Войти</button>
            </div>
            
        </div>
    );
}

export default JoinBlock;