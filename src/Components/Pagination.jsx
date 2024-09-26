export default function Pagination({
    handleNextPage,
    handlePrevPage,
    offset,
    data,
}) {
    return (
        <div className="flex justify-center items-center gap-4 pb-6">
            <button
                disabled={offset < 20}
                onClick={handlePrevPage}
                className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-500"
            >
                Précédent
            </button>
            <p className="text-xl font-bold text-white">
                page : {offset / 20 + 1}
            </p>
            <button
                disabled={data.next === null}
                onClick={handleNextPage}
                className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-500"
            >
                Suivant
            </button>
        </div>
    );
}
