import axios from "axios";
import { useEffect, useState } from "react";
import DetailOnPokemon from "./Components/DetailOnPokemon";
import Navbar from "./Components/Navbar";
import Pagination from "./Components/Pagination";
import PokemonCard from "./Components/PokemonCard";

export default function App() {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState({ count: 0, results: [] });
    const [detailedUrlPokemon, setDetailedUrlPokemon] = useState("");

    const [url, setUrl] = useState(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
    );

    const handleNextPage = () => {
        if (offset < data.count) {
            setOffset(offset + 20);
            setUrl(
                `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
            );
        } else {
            return;
        }
    };

    const handlePrevPage = () => {
        if (offset >= 20) {
            setOffset(offset - 20);
            setUrl(
                `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
            );
        } else {
            return;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            setData(response.data);
        };
        fetchData();
    }, [url]);

    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonClick = async (pokemon) => {
        const response = await axios.get(pokemon.url);
        setSelectedPokemon(response.data);
        setDetailedUrlPokemon(
            `https://pokeapi.co/api/v2/pokemon/${response.data.name}`
        );
    };

    const handleCloseDetail = () => {
        setSelectedPokemon(null);
    };

    return (
        <>
            <div className="min-h-screen mx-auto p-4 bg-gray-600">
                <Navbar />
                <h1 className="text-4xl font-bold text-center mb-6 text-white">
                    Pokémon Explorer
                </h1>
                <p className="text-center mb-4 text-white">
                    Nombre de Pokémon : {data.count}
                </p>
                {!selectedPokemon && (
                    <>
                        <Pagination
                            handleNextPage={handleNextPage}
                            handlePrevPage={handlePrevPage}
                            offset={offset}
                            data={data}
                        />
                    </>
                )}
                {selectedPokemon ? (
                    <>
                        <div className="max-w-6xl mx-auto">
                            <DetailOnPokemon
                                pokemon={selectedPokemon}
                                onClose={handleCloseDetail}
                                detailedUrlPokemon={detailedUrlPokemon}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                            {data.results.map((pokemon, index) => (
                                <PokemonCard
                                    key={index}
                                    name={pokemon.name}
                                    onClick={() => handlePokemonClick(pokemon)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
