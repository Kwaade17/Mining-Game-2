import { useState } from "react"
import { cavesData } from "../assets/cavesData"
import { mineOre } from "../assets/functions/mineOre"
import ObtainedOre from "../Modals/ObtainedOre"

export default function MainGame({player, setPlayer}) {
    const [ currentPage, setCurrentPage ] = useState(1)
    const itemsPerPage = 9
    const totalPages = Math.max(1, Math.ceil(cavesData.length/itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentCaves = cavesData.slice(startIndex, startIndex + itemsPerPage)
    const remainingSlots = Math.max(0, itemsPerPage - currentCaves.length)

    const [ isObtained, setIsObtained ] = useState(false)

    const [ result, setResult ] = useState(null)

    function handlePrevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    function handleNextPage() {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const [ isMining, setIsMining ] = useState(false)
    const [ obtainedOres, setObtainedOres ] = useState([])

    const handleMine = (cave) => {
        if (isMining) return

        const minedResults = Array.from({ length: 5 }, () => mineOre(cave, player, setPlayer, setIsObtained))

        setObtainedOres((prevOres) => [...prevOres, ...minedResults])
        setResult(minedResults[minedResults.length - 1] ?? null)

        setIsMining(false)
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
                                        onClick={() => {
                                            setIsMining(true)
                                            handleMine(cave)
                                        }}
                                        className="w-full flex justify-center items-center bg-amber-600 sm:p-0.5 text-white text-xs sm:text-sm font-bold rounded-md mt-auto cursor-pointer active:bg-amber-600/75 hover:bg-amber-600/75 hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                                    >
                                        {isMining ? "MINING..." : "MINE"}
                                    </button>
                                </div>
                            </div>
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

            {isObtained && ( <ObtainedOre setPlayer={setPlayer} oreObtained={result} setIsObtained={setIsObtained} /> )}

        </div>
    )
}