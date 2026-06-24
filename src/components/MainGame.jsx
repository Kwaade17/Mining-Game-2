import React, { useState } from 'react'
import { cavesData } from "../assets/cavesData"
import { mineOre } from "../assets/functions/mineOre"
import ObtainedOre from "../Modals/ObtainedOre"
import MultipleObtainedOres from "../Modals/MultipleObtainedOres"

export default function MainGame({player, setPlayer}) {
    const [ currentPage, setCurrentPage ] = useState(1)
    const itemsPerPage = 9
    const totalPages = Math.max(1, Math.ceil(cavesData.length/itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentCaves = cavesData.slice(startIndex, startIndex + itemsPerPage)
    const remainingSlots = Math.max(0, itemsPerPage - currentCaves.length)

    function handlePrevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    function handleNextPage() {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }
    
    const [ isMining, setIsMining ] = useState(false)
    
    const [ isObtained, setIsObtained ] = useState(false)
    const [ areObtained, setAreObtained ] = useState(false)

    const [ obtainedOres, setObtainedOres ] = useState([])
    const [ result, setResult ] = useState(null)

    const handleMine = (cave) => {
      if (player.bagCapacity === player.maxBagCapacity || player.energy < cave.energyConsumption) {
        mineOre(cave, player)
        setIsMining(false)
        return
      }
      
      setResult(mineOre(cave, player, setPlayer, setIsMining) ?? null)
      setIsObtained(true)
    }

    const handleMultipleMines = (cave) => {
      if (player.bagCapacity === player.maxBagCapacity || player.energy < cave.energyConsumption) {
        mineOre(cave, player)
        setIsMining(false)
        return
      }

      const totalMines = Math.min(player.maxBagCapacity, player.maxBagCapacity - player.inventory.length, Math.floor(player.energy / cave.energyConsumption))

      const minedResults = Array.from({ length: totalMines }, () => mineOre(cave, player, setPlayer, setIsMining))

      setObtainedOres((prevOres) => [...prevOres, ...minedResults])
      setResult(minedResults[minedResults.length - 1] ?? null)
      
      setAreObtained(true)
    }
    
    return(
        <div className="bg-gray-900 flex flex-col items-center justify-center text-center p-4">
            
            <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full max-w-md aspect-square p-4 bg-gray-850 rounded-2xl border-2 border-amber-700">
                
                {currentCaves.map((cave, idx) => (
                    player.level >= cave.requiredLevel ? (
                        <div key={idx} className="group relative bg-amber-300 rounded-2xl border-2 border- border-yellow-300 overflow-hidden">
                            <img className="w-full h-full object-cover object-center scale-115" src={cave.image} alt="Cave Image" />
                            
                            <div className="w-full h-full bg-linear-to-br from-amber-300/75 to-gray-900/50 absolute inset-0">
                                <div className="w-full h-full flex flex-col p-2">
                                    <div className="flex items-center justify-center">
                                        <span className="sm:p-2 text-xs sm:text-lg text-white text-shadow-2xs font-bold group-hover:animate-floating-text">
                                            {cave.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsMining(true)}
                                        className="w-full flex justify-center items-center bg-amber-600 sm:p-0.5 text-white text-xs sm:text-sm font-bold rounded-md mt-auto cursor-pointer active:bg-amber-600/75 hover:bg-amber-600/75 hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                                    >
                                        {isMining ? "MINING..." : "MINE"}
                                    </button>
                                </div>
                            </div>
                            
                            {isMining && (
                              <div className="w-full h-full flex justify-center items-center p-4 fixed inset-0 bg-black/75 text-white z-50">
                                <div className="w-full max-w-md aspect-square flex flex-col justify-center p-8 rounded-2xl bg-gray-900 border-2 border-amber-600">
                                  <div className="w-full h-full flex flex-col space-y-2 p-4 rounded-2xl border border-gray-700 bg-gray-850">
                                    <button
                                        onClick={() => setIsMining(false)}
                                        className="self-end mb-4 cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 -960 960 960"
                                            className="w-10 h-10 fill-white"
                                        >
                                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                        </svg>
                                    </button>
                                    <span className="text-4xl font-bold mt-6">
                                      Choose Type of Mining
                                    </span>
                                    <div className="flex flex-col mt-auto space-y-2">
                                        <button
                                        onClick={() => handleMine(cave)}
                                        className="font-bold text-sm p-4 mt-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-400"
                                        >
                                            Single Ore
                                        </button>
                                        <button
                                        disabled={player.bagCapacity > player.maxBagCapacity - 2}
                                        onClick={() => handleMultipleMines(cave)}
                                        className={`font-bold text-sm p-4 mt-1 rounded-lg ${player.bagCapacity > player.maxBagCapacity - 2 ? "bg-red-400 opacity-50" : "bg-lime-500 hover:bg-green-600 active:bg-green-600"}`}
                                        >
                                        {player.bagCapacity > player.maxBagCapacity - 2 ? "Disabled" : `Multiple Ore (x${Math.min(player.maxBagCapacity, player.maxBagCapacity - player.inventory.length, Math.floor(player.energy / cave.energyConsumption))})`}
                                        </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                        </div>
                    ) : (
                        <div key={idx} className="bg-gray-800 rounded-2xl text-white text-sm cursor-not-allowed">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                                <img className="w-8 h-8" src="/lock.svg" alt="Lock Icon" />
                                <span className="tracking-wider">Required <b>Lvl. {cave.requiredLevel}</b></span>
                            </div>
                        </div>
                    )
                ))}

                {Array.from({length: remainingSlots}).map((_, idx) => (
                    <div
                        key={`coming-soon-${idx}`}
                        className="group flex items-center justify-center bg-gray-900 rounded-2xl cursor-not-allowed border-2 border-dashed border-yellow-600"
                    >
                        <span className="text-white font-bold group-hover:animate-floating-text">Coming Soon</span>
                    </div>
                ))}

            </div>

            <div className="flex items-center bg-gray-850 p-4 mt-4 rounded-2xl">
                <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-2xl ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-900' : 'group hover:bg-gray-700/80 bg-gray-750'}`}
                >
                    <img className="group-hover:-translate-x-1 transition-transform duration-150 ease-in-out" src="/arrow_back_ios.svg" />
                </button>
                <span className="mx-4 text-2xl text-white font-bold tracking-widest">
                    {currentPage}/{totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-2xl ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-900' : 'group hover:bg-gray-700/80 bg-gray-750'}`}
                >
                    <img className="group-hover:translate-x-1 transition-transform duration-150 ease-in-out" src="/arrow_forward_ios.svg" />
                </button>
            </div>

            {isObtained && (<ObtainedOre setPlayer={setPlayer} oreObtained={result} setIsObtained={setIsObtained} /> )}
            {areObtained && (<MultipleObtainedOres setPlayer={setPlayer} obtainedOres={obtainedOres} setAreObtained={setAreObtained} />)}

        </div>
    )
}