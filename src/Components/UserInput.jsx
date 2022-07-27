import React, { useState } from 'react';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import pokedexFront from "../assets/img/pokedexFront.png"
import footer from "../assets/img/footer.png"


const UserInput = () => {

    const [userName, setUserName] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        dispatch(changeUser(userName));
        navigate("/pokedex");
    }


    return (
        <div className='home-container'>

            <div className='home-child' >
                <img src={pokedexFront} className="home-img" />
                <p className='greeting'>Hi there, Trainer!</p>
                <p className='message'>
                    Enter your name to start your journey.
                </p>
                <form onSubmit={submit}>
                    <input className='home-input'
                        type="text"
                        placeholder='write your name'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <button className='start-button'>Start</button>
                </form>
            </div>
            <div>
            <footer style={{backgroundColor:"black"}}>
                <img src={footer} style={{width: "100%"}}/>
            </footer>
            </div>
        </div>
    );
};

export default UserInput;