import React, { useEffect, useState } from 'react';
import { changeFirstLetter, changeNameStats, changeColor } from '../helpers/helper';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "../pokedex.css"



const PokemonItem = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState({});
    const [species, setSpecies] = useState([]);
    const navigate = useNavigate();

    const requestSpecies = (url) =>{
        axios.get(url)
        .then(res => setSpecies(res.data));
    }

    useEffect(() => {
        axios.get(pokemonUrl).then(res => {
            setPokemon(res.data)
            requestSpecies(res.data.species.url)
        });

    }, []);

    console.log(species);


    return (
        <>
            <article className="pokeCard" onClick={() => navigate(`/pokedex/${pokemon.id}`)}
    style={{background: `linear-gradient(to top, white 0%, white 60% , white 60%, ${changeColor(species.color?.name)} 100%)`, boxShadow: `1px 1px 8px ${changeColor(species.color?.name)}`}}
            >
                <section
                    className='pokemon__principal'
                >
                    <figure className="pokeCard__image">
                        <img src={pokemon.sprites?.other['official-artwork'].front_default} style={{ width: "150px" }} />
                    </figure>

                    <h3 className='pokeCard__name'>{pokemon.name}</h3>
                    <section className="pokeCard__type">
                        <p>{pokemon.types?.map(type => changeFirstLetter(type.type.name)).join(' / ')}</p>
                        <p>Type</p>
                    </section>
                    <section className="pokeCard__stats">
                        {
                            pokemon.stats?.map(stat => (
                                <article className='pokeCard__stats' key={stat.stat.url}>
                                    <p className="stat__name">{changeNameStats(stat.stat.name)}</p>
                                    <p className="stat__number" style={{color: `${changeColor(species.color?.name)}`}}>{stat.base_stat}</p>
                                </article>
                            ))
                        }
                    </section>

                </section>
            </article>

        </>
    );
};

export default PokemonItem;