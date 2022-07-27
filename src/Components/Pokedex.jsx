import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonItem from './PokemonItem';
import "../pokedex.css"
import header from "../assets/img/header.png"
import headerback from "../assets/img/headerback.png"

const Pokedex = () => {

    const [pokemons, setPokemos] = useState([]);
    const [pokemonSearch, setPokemonSearch] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154"
        axios.get(url)
            .then(res => setPokemos(res.data.results));

        axios.get("https://pokeapi.co/api/v2/type/")
            .then(res => setPokemonTypes(res.data.results));
    }, []);

    // console.log(pokemonTypes);

    const user = useSelector(state => state.user);

    const search = (e) => {
        e.preventDefault();
        navigate(`/pokedex/${pokemonSearch}`)
    }

    const filterTypes = (e) => {
        // alert("The type you have selected is:  " + e.target.value)
        axios.get(e.target.value)
            .then(res => setPokemos(res.data.pokemon))
    };

    const [page, setPage] = useState(1);
    const lastIndex = page * 20;
    const firstIndex = lastIndex - 20;
    const pokemonPages = pokemons.slice(firstIndex, lastIndex);

    const lastPage = Math.ceil(pokemons.length / 20);

    const numbers = [];
    for (let i = 1; i <= lastPage; i++) {
        numbers.push(i);
    }

    return (
        <div>
            <header>
                <img src={header} className="img-header" />
                <img src={headerback} className="back-img-header" />
            </header>
            <div className='form-message'>
                <h1 className='greeting'>Welcome</h1>
                <h2 className="pokedex__text"><span>Welcome {user}, </span>find your favorite pokemón</h2>


                <form onSubmit={search}>
                    <input
                        className='poke-input'
                        type="text"
                        placeholder='write here...'
                        value={pokemonSearch}
                        onChange={e => setPokemonSearch(e.target.value)}
                    />
                    <button className='poke-btn'>Search</button>
                </form>
            </div>
            <select className='classic' onChange={filterTypes}>
                <option >Select a Pokemon type</option>
                {pokemonTypes.map((pokemonType) => (
                    <option value={pokemonType.url} key={pokemonType.url}>
                        {pokemonType.name}
                    </option>
                ))}
            </select>

            <br />
            
            <div >
                <div className='poke-container'>
                    {
                        pokemonPages.map(pokemon => (

                            <PokemonItem key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                                pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url}

                            />
                        ))
                    }
                </div>
                <button
                     className='button-numbers'
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Prev Page
                </button>
                {
                    numbers.map(number => (
                        <button
                            className='button-numbers'
                             key={number}
                            onClick={() => setPage(number)}
                        >
                            {number}
                        </button>
                    ))
                }
                <button
                    className='button-numbers'
                    onClick={() => setPage(page + 1)}
                    disabled={page === lastPage}
                >
                    Next Page
                </button>

            </div>

        </div>
    );
};

export default Pokedex;