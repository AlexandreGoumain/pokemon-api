import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PokemonContext = createContext(null);

export const PokemonProvider = ({ children }) => {
    const [pokemon, setPokemon] = useState([]);

    const fetchPokemon = async () => {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        setPokemon(response.data.results);
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return (
        <PokemonContext.Provider value={{ pokemon, setPokemon }}>
            {children}
        </PokemonContext.Provider>
    );
};
