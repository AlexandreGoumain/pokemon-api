import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    const fetchCar = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/cars/${id}`
            );
            setCar(response.data);
        } catch (error) {
            console.error("Error fetching car:", error);
        }
    };

    const handleDeleteCar = async () => {
        await axios.delete(`http://localhost:3000/api/cars/${id}`);
        navigate("/cars");
    };

    const handleEditCar = () => {
        navigate(`/cars/edit/${id}`);
    };

    useEffect(() => {
        fetchCar();
    }, [id]);

    console.log(car);

    return (
        <div>
            {car ? (
                <>
                    <Link to="/cars" className="text-blue-500">
                        Retour à la liste des voitures
                    </Link>
                    <h1>CarDetails {id}</h1>
                    <div className="flex flex-row gap-2 justify-around">
                        <div className="flex flex-col gap-2">
                            <p>Marque: {car.brand}</p>
                            <p>Modèle: {car.name}</p>
                            <p>Année: {car.year}</p>
                            <p>Prix: {car.price} €</p>
                            <p>Couleur: {car.color}</p>
                            <p>Propriétaire: {car.owner.email}</p>
                        </div>
                        <div className="flex justify-center flex-col gap-2">
                            <button
                                className="bg-blue-500 text-white p-2 rounded-md"
                                onClick={handleEditCar}
                            >
                                Modifier
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded-md"
                                onClick={handleDeleteCar}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Aucune voiture trouvée</p>
            )}
        </div>
    );
}
