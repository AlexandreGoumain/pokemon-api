import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BigTitle from "./BigTitle";
import MainDataToPresent from "./MainDataToPresent";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { selectTheme } from "../app/slices/UiSlice";

export default function PokemonList() {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState({ count: 0, results: [] });
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
    const theme = useSelector(selectTheme);

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleNextPage = () => {
        if (offset + 20 < data.count) {
            setOffset(offset + 20);
        }
    };

    const handlePrevPage = () => {
        setOffset(offset - 20);
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    console.log(data.results);

    return (
        <div className={`bg-${theme} mx-auto p-4`}>
            <BigTitle title="Pokémon Explorer" />
            <MainDataToPresent description="Nombre de Pokémon" data={data} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {data.results.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </div>

            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                offset={offset}
                data={data}
            />
        </div>
    );
}
