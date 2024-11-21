import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // URL QUI EST NETTOYE -> "https://pokeapi.co/api/v2/pokemon/182/"
        const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
        navigate(`/pokemon/${pokemonId}`);
    };

    return (
        <div onClick={handleClick}>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
                <h3 className="text-xl font-bold">{pokemon.name}</h3>
            </div>
        </div>
    );
};

export default PokemonCard;
