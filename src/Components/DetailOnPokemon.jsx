import axios from "axios";
import { useEffect, useState } from "react";
import { typePokemonBackground } from "../utils/typePokemonBackground";

const DetailOnPokemon = ({ pokemon, onClose }) => {
    const mainType = pokemon.types[0].type.name;
    const [abilitiesDetails, setAbilitiesDetails] = useState([]);

    useEffect(() => {
        const fetchAbilitiesDetails = async () => {
            const abilitiesData = await Promise.all(
                pokemon.abilities.map(async (a) => {
                    const response = await axios.get(a.ability.url);
                    return response.data;
                })
            );
            setAbilitiesDetails(abilitiesData);
        };

        fetchAbilitiesDetails();
    }, [pokemon.abilities]);

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-xl relative max-w-xs mx-auto">
            <div className="text-dark p-2 rounded-xl text-center">
                <h2 className="text-3xl font-bold">{pokemon.name}</h2>
                {/* <p className="text-sm">Niveau {pokemon.base_experience}</p> */}
            </div>
            <div
                className={`flex justify-center mt-4 p-4 rounded-lg ${typePokemonBackground(
                    mainType
                )}`}
            >
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="w-32 h-32"
                />
            </div>
            <div className="p-4 gap-2 flex flex-col">
                <p className="font-bold">
                    Type: {pokemon.types.map((t) => t.type.name).join(", ")}
                </p>
                <p className="font-bold mr-2">
                    Abilities:
                    {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </p>
                <div className="flex flex-col mb-2 bg-gray-300 p-2 rounded-lg">
                    <p className="font-bold">Abilities Details :</p>
                    {abilitiesDetails.map((ability) => {
                        const effectEntry = ability.effect_entries.find(
                            (entry) => entry.language.name === "en"
                        );
                        return effectEntry ? (
                            <p key={ability.name} className="text-sm my-2">
                                {effectEntry.effect}
                            </p>
                        ) : (
                            <p key={ability.name} className="text-sm my-2">
                                Aucun effet trouvé pour cette langue.
                            </p>
                        );
                    })}
                </div>

                <p className="font-bold">Cries:</p>
                <ul className="mb-4">
                    <li className="mr-2">
                        Latest:{" "}
                        <a
                            href={pokemon.cries.latest}
                            target="_blank"
                            className="text-blue-500"
                        >
                            Latest Cry
                        </a>
                    </li>
                    <li>
                        Legacy:{" "}
                        <a
                            href={pokemon.cries.legacy}
                            target="_blank"
                            className="text-blue-500"
                        >
                            Legacy Cry
                        </a>
                    </li>
                </ul>
                <div>
                    {/* <a
                        href={pokemon.pokemon_v2_pokemon
                            .map((p) => p.name)
                            .join(", ")}
                    >
                        voir les pokemons de la même catégorie :
                    // </a> */}
                </div>
            </div>
            <div className="flex justify-center w-full">
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white p-2 rounded-md w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailOnPokemon;
