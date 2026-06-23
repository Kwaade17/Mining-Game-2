export default function ObtainedOre({player, setPlayer, minedResult, setMinedResult}) {
    const handleCloseModal = () => {
        setPlayer((prevPlayer) => ({...prevPlayer, inventory: [...prevPlayer.inventory, minedResult]}))
        setMinedResult(null)
    }
    
    return(
        <>
            {minedResult && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                            
                    {/* The Modal Box */}
                    <div className="bg-gray-800 border-2 border-amber-500 rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-2xl animate-floating-text">
                        
                        <h2 className="text-2xl font-bold text-amber-400 mb-2">Success!</h2>
                        <p className="text-gray-300 text-center mb-6">You mined a chunk of</p>
                        
                        {/* Ore Stats */}
                        <div className="bg-gray-900 w-full rounded-xl p-4 mb-6 text-center border border-gray-700">
                            <span className="block text-xl font-bold text-white mb-2">{minedResult.name}</span>
                            <div className="flex justify-between text-sm text-gray-400 mt-4">
                                <span>Weight:</span>
                                <span className="text-white font-semibold">{minedResult.finalWeight} kg</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400 mt-1">
                                <span>Value:</span>
                                <span className="text-yellow-400 font-semibold">🪙 {minedResult.finalValue.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button 
                            onClick={handleCloseModal} // Setting it back to null closes the modal
                            className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 rounded-xl transition-colors cursor-pointer"
                        >
                            Collect
                        </button>

                    </div>
                </div>
            )}
        </>
    )
}