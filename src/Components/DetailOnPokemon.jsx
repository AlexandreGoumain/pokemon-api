import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { typePokemonBackground } from "../utils/typePokemonBackground";

const DetailOnPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [abilitiesDetails, setAbilitiesDetails] = useState([]);

    const fetchPokemon = async () => {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            setPokemon(response.data);
        } catch (error) {
            console.error("Error fetching pokemon:", error);
        }
    };

    const fetchAbilitiesDetails = async () => {
        if (!pokemon) return;
        try {
            const abilitiesData = await Promise.all(
                pokemon.abilities.map(async (a) => {
                    const response = await axios.get(a.ability.url);
                    return response.data;
                })
            );
            setAbilitiesDetails(abilitiesData);
        } catch (error) {
            console.error("Error fetching abilities:", error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [id]);

    useEffect(() => {
        fetchAbilitiesDetails();
    }, [pokemon]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    const mainType = pokemon.types[0].type.name;

    return (
        <>
            {pokemon && (
                <div className="bg-gray-200 p-4 rounded-lg shadow-xl relative max-w-xs mx-auto">
                    <div className="text-dark p-2 rounded-xl text-center">
                        <h2 className="text-3xl font-bold underline">
                            {pokemon.name}
                        </h2>
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
                        <div className="font-bold flex gap-2">
                            Type:
                            <p className="underline">
                                {pokemon.types
                                    .map((t) => t.type.name)
                                    .join(", ")}
                            </p>
                        </div>
                        <div className="font-bold flex gap-2">
                            Abilities:
                            <p className="underline">
                                {pokemon.abilities
                                    .map((a) => a.ability.name)
                                    .join(", ")}
                            </p>
                        </div>

                        <div className="flex flex-col mb-2 bg-gray-300 p-2 rounded-lg">
                            <p className="font-bold">Abilities Details :</p>
                            {abilitiesDetails.map((ability) => {
                                const effectEntry = ability.effect_entries.find(
                                    (entry) => entry.language.name === "en"
                                );
                                return effectEntry ? (
                                    <p
                                        key={ability.name}
                                        className="text-sm my-2"
                                    >
                                        {effectEntry.effect}
                                    </p>
                                ) : (
                                    <p
                                        key={ability.name}
                                        className="text-sm my-2"
                                    >
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
                    </div>

                    <div className="flex justify-center w-full">
                        <button
                            className="bg-red-500 text-white p-2 rounded-md w-full"
                            onClick={() => navigate("/")}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {!pokemon && <div>Loading...</div>}
        </>
    );
};

export default DetailOnPokemon;
