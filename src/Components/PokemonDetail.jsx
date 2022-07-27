import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import header from "../assets/img/header.png"
import headerback from "../assets/img/headerback.png"
import "../pokedex.css"



const PokemonDetail = () => {

    const [pokemon, setPokemon] = useState([]);
    const [species, setSpecies] = useState([]);
    const { id } = useParams();

    const requestSpecies = (url) => {
        axios.get(url)
            .then(res => setSpecies(res.data));
    }
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => {
                setPokemon(res.data)
                requestSpecies(res.data.species.url);
            })
    }, [id])
    const changeColor = color => color === 'yellow' ? '#f7d708' : color === 'white' ? 'gray' : color
    // console.log(pokemon);

    return (
        <><header>
            <img src={header} className="img-header" />
            <img src={headerback} className="back-img-header" />
        </header>
            <main className='pokemon'>
                <section
                    className='pokemon__principal'
                    style={{ background: `linear-gradient(to top, white 0%, white 60% , white 60%, ${changeColor(species.color?.name)} 100%)`, boxShadow: `1px 1px 8px ${changeColor(species.color?.name)}` }}
                >
                    <figure>
                        <img src={pokemon.sprites?.other['official-artwork'].front_default}  style={{width:"100%", maxWidth:"300px"}}/>
                    </figure>
                    <p className='pokemon__id'># {pokemon.id}</p>
                    <section className='pokemon__name'>
                        <div className='linea'></div>
                        <p>{pokemon.name}</p>
                        <div className='linea'></div>
                    </section>
                    <section className='pokemon__features'>
                        <article className='pokemon__feature'>
                            <p>Weight</p>
                            <p>{pokemon.weight}</p>
                        </article>
                        <article className='pokemon__feature'>
                            <p>Height</p>
                            <p>{pokemon.height}</p>
                        </article>
                    </section>
                    <section className='pokemon__typesAbilities'>
                        <section className='pokemon__typeAbilitie'>
                            <h3>Type</h3>
                            <section>
                                    {pokemon.types?.map(type => <p className={`type ${type.type.name}`} key={type.type.name}>{type.type.name}</p>)}
                            </section>
                        </section>
                        <section className='pokemon__typeAbilitie'>
                            <h3>Abilities</h3>
                            <section>
                                {pokemon.abilities?.map(abilitie => <p className='abilitie' key={abilitie.ability.name}>{abilitie.ability.name}</p>)}
                            </section>
                        </section>
                    </section>
                    <h3>Stats</h3>
                    <section className='pokemon__stats'>
                        {pokemon.stats?.map(stat => (
                            <article className='pokemon__stat' key={stat.stat.name}>
                                <section className='stat__tittle'>
                                    <p>{stat.stat.name}</p>
                                    <p>{`${stat.base_stat} / 150`}</p>
                                </section>
                                <section className='stat__bar'>
                                    <div className='stat__barProgress' style={{ width: `${stat.base_stat * 100 / 150}%` }}></div>
                                </section>
                            </article>
                        ))}
                    </section>
                </section>
            </main>
        </>
    );
};

export default PokemonDetail;