import { typePokemonBackground } from "../utils/typePokemonBackground";

const DetailOnPokemon = ({ pokemon, onClose }) => {
    const mainType = pokemon.types[0].type.name;

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
                <p className="font-bold">
                    Abilities:
                    {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </p>
                <p className="font-bold">Cries:</p>
                <ul className="mb-4">
                    <li>
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
