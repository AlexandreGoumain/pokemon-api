import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            fetchCar();
        }
    }, [id]);

    useEffect(() => {
        if (car) {
            setBrand(car.brand);
            setName(car.name);
            setModel(car.model);
            setYear(car.year);
            setPrice(car.price);
            setColor(car.color);
            setUserId(car._id);
        }
    }, [car]);

    const fetchCar = async () => {
        const response = await axios.get(
            `http://localhost:3000/api/cars/${id}`
        );
        setCar(response.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const car = {
            brand,
            name,
            model,
            year,
            price,
            color,
            userId,
        };

        if (isEdit) {
            axios
                .put(`http://localhost:3000/api/cars/${id}`, car, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("Car updated successfully:", response.data);
                });
        } else {
            axios
                .post("http://localhost:3000/api/cars", car, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("Car created successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error creating car:", error);
                });
        }

        navigate("/cars");
    };

    return (
        <div className="bg-gray-200 p-4 rounded-md my-4">
            <h1 className="text-2xl font-bold">Créer une voiture</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="brand">Marque</label>
                    <input
                        type="text"
                        placeholder="Marque"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="model">Modèle</label>
                    <input
                        type="text"
                        placeholder="Modèle"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="year">Année</label>
                    <input
                        type="number"
                        placeholder="Année"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price">Prix</label>
                    <input
                        type="number"
                        placeholder="Prix"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="color">Couleur</label>
                    <input
                        type="text"
                        placeholder="Couleur"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="owner">Propriétaire</label>
                    <input
                        type="text"
                        placeholder="Propriétaire"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                {isEdit ? (
                    <button type="submit">Modifier</button>
                ) : (
                    <button type="submit">Créer</button>
                )}
            </form>
        </div>
    );
}
