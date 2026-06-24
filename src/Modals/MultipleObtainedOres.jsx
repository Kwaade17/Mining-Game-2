export default function MultipleObtainedOres({setPlayer, obtainedOres, setAreObtained}) {
  const handleCloseModal = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      inventory: [...prevPlayer.inventory, ...obtainedOres]
    }))
    setAreObtained(false)
  }
  
  return(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                  
        {/* The Modal Box */}
        <div className="bg-gray-900 border-2 border-amber-500 rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-2xl animate-floating-text overflow-hidden">
            
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Success!</h2>
            <p className="text-gray-300 text-center mb-6">You mined a chunk of</p>
            
            {/* Render Obtained Ores */}
            <div className="grid grid-cols-3 gap-2 aspect-square bg-gray-850 w-full rounded-xl p-4 mb-6 text-center border border-gray-700 overflow-y-auto">
                {obtainedOres.map((ore) => (
                  <div className="flex flex-col justify-center items-center aspect-square space-y-1 px-1 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-700 overflow-hidden">
                      <img className="w-full h-full object-cover object-center" src={ore.image} alt="Icon" />
                    </div>
                    <div className="w-full flex justify-around font-bold text-white text-[0.5rem] px-0.5">
                      <span>{ore.name}</span>
                      <span>{ore.finalWeight} kg</span>
                    </div>
                  </div>
                ))}
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