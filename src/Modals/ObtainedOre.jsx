export default function ObtainedOre({setPlayer, oreObtained, setIsObtained}) {
    const handleCloseModal = () => {
        setPlayer((prevPlayer) => ({...prevPlayer, inventory: [...prevPlayer.inventory, oreObtained]}))
        setIsObtained(false)
    }

    const specialColor = (item) => {
        switch (item.rarity) {
            case "Rare":
                return "text-blue-600"
            case "Legendary":
                return "text-yellow-400"
            case "Mythic":
                return "text-red-500"
            default:
                return "text-white"
        }
    }
    
    return(
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    
            {/* The Modal Box */}
            <div className="bg-gray-900 border-2 border-amber-500 rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-2xl animate-floating-text">
                
                <h2 className="text-2xl font-bold text-amber-400 mb-2">Success!</h2>
                <p className="text-gray-300 text-center mb-6">You mined a chunk of</p>
                
                {/* Ore Stats */}
                <div className="bg-gray-850 w-full rounded-xl p-4 mb-6 text-center border border-gray-700">
                    <span className="block text-xl font-bold text-white mb-2">{oreObtained?.name}</span>
                    <div className="w-full flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-gray-700 overflow-hidden">
                            <img className="w-full h-full object-cover object-center" src={oreObtained?.image} alt="Icon" />
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-200 mt-4">
                        <span>Rarity:</span>
                        <span className={`${specialColor(oreObtained)} font-semibold`}>{oreObtained?.rarity}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-200 mt-1">
                        <span>Weight:</span>
                        <span className="text-white font-semibold">{oreObtained?.finalWeight} kg</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-200 mt-1">
                        <span>Value:</span>
                        <span className="text-yellow-400 font-semibold">$ {oreObtained?.finalValue.toFixed(2)}</span>
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
    )
}