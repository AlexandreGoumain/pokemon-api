import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center">
            <p>
                Not Found - <code>404</code>
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-red-500 text-white p-2 rounded-md w-32"
            >
                accueil
            </button>
        </div>
    );
}
