import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import DetailOnPokemon from "./Components/DetailOnPokemon";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import PokemonList from "./Components/PokemonList";
import { PokemonProvider } from "./context/PokemonContext";

import CarDetails from "./Components/CarDetails";
import Cars from "./Components/Cars";
import CreateCar from "./Components/CreateCar";

export default function App() {
    return (
        <Provider store={store}>
            <PokemonProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pokemonList" element={<PokemonList />} />
                        <Route
                            path="/pokemon/:id"
                            element={<DetailOnPokemon />}
                        />

                        <Route path="/cars" element={<Cars />} />
                        <Route path="/cars/:id" element={<CarDetails />} />
                        <Route path="/cars/create" element={<CreateCar />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </PokemonProvider>
        </Provider>
    );
}
