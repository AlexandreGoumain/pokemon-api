export default function MainDataToPresent({ description, data }) {
    return (
        <p className="text-center mb-4 text-white">
            {description} : {data.count}
        </p>
    );
}
