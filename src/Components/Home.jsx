import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTheme } from "../app/slices/UiSlice";
import BigTitle from "./BigTitle";

export default function Home() {
    const theme = useSelector(selectTheme);
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/cars");
            setCars(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    console.log(cars);

    return (
        <div className={`bg-${theme} min-h-screen`}>
            <BigTitle title="Bienvenue sur l'API Pokémon" />
            <p className="text-center text-white">
                Pour voir la liste des pokemons,
                <Link to="/pokemonList" className="text-blue-400">
                    cliquez ici
                </Link>
                .
            </p>
        </div>
    );
}
