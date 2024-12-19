import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cars() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const fetchCars = async () => {
        const response = await axios.get("http://localhost:3000/api/cars");
        setCars(response.data);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    console.log(cars);

    const handleCarClick = (id) => {
        navigate(`/cars/${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Liste des voitures</h1>
            <Link to="/cars/create">Créer une voiture</Link>
            {cars.length > 0 ? (
                cars.map((car) => (
                    <div
                        key={car.id}
                        className="bg-gray-200 p-4 rounded-md my-4"
                        onClick={() => handleCarClick(car._id)}
                    >
                        <p>Marque: {car.brand}</p>
                        <p>Modèle: {car.name}</p>
                        <p>Année: {car.year}</p>
                        <p>Prix: {car.price} €</p>
                        <p>Couleur: {car.color}</p>
                        <p>Propriétaire: {car.owner.email}</p>
                    </div>
                ))
            ) : (
                <p>Aucune voiture trouvée</p>
            )}
        </div>
    );
}
