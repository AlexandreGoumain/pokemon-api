const PokemonCard = ({ name, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
        >
            <h3 className="text-xl font-bold">{name}</h3>
        </div>
    );
};

export default PokemonCard;
