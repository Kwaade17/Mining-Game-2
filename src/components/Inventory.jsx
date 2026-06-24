import React, { useState } from 'react'

export default function Inventory({player, setPlayer}) {
    const [ showDescModal, setShowDescModal ] = useState(false)
    const [ oreDesc, setOreDesc ] = useState(null)
    const [ selectedOreIndex, setSelectedOreIndex ] = useState(null)

    const [ searchQuery, setSearchQuery ] = useState("")

    const specialColor = (item) => {
        if (!item) return "text-white"
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

    const handleFavorite = () => {
        if (!oreDesc || selectedOreIndex === null) return

        const updatedOreDesc = { ...oreDesc, isFavorite: !oreDesc.isFavorite }
        setOreDesc(updatedOreDesc)

        setPlayer((prevPlayer) => {
            const updatedInventory = [...prevPlayer.inventory]
            updatedInventory[selectedOreIndex] = updatedOreDesc
            return { ...prevPlayer, inventory: updatedInventory }
        })
    }

    const sellAllOres = () => {
        if (player.inventory.length === 0) return

        const unFavoriteOres = player.inventory.filter((ore) => !ore.isFavorite)

        if (unFavoriteOres.length === 0) return
        
        const totalMoney = unFavoriteOres.reduce((sum, ore) => sum + ore.finalValue, 0)
        
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            money: parseFloat((prevPlayer.money + totalMoney).toFixed(2)),
            bagCapacity: prevPlayer.bagCapacity - unFavoriteOres.length,
            inventory: prevPlayer.inventory.filter((ore) => ore.isFavorite)
        }))
    }

    const handleSellOre = (ore, indexToSell) => {
        if (ore.isFavorite) {
          window.alert("You cannot sell this!")
          return
        }
        
        if (indexToSell === null) return

        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            money: parseFloat((prevPlayer.money + ore.finalValue).toFixed(2)),
            bagCapacity: prevPlayer.bagCapacity - 1,
            inventory: prevPlayer.inventory.filter((_, index) => index !== indexToSell)
        }))

        setShowDescModal(false)
        setSelectedOreIndex(null)
    }

    const filteredInventory = player.inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const itemsPerPage = 25
    const remainingSlots = Math.max(0, itemsPerPage - filteredInventory.length )
    
    return(
        <div className="flex flex-col justify-center items-center bg-gray-900 p-4">

            <div className="w-full max-w-md px-4 py-2 flex flex-row items-center rounded-xl bg-gray-800">
                <img className="w-4 h-4" src="search.svg" alt="Icon" />
                <input 
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search inventory..."
                    className="w-full text-white rounded-lg px-2 text-sm focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full max-w-md h-full max-h-2/4 aspect-square mt-4 p-4 bg-gray-850 rounded-xl">
                {filteredInventory.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            const actualIndex = player.inventory.indexOf(item)
                            setOreDesc(item); 
                            setSelectedOreIndex(actualIndex);
                            setShowDescModal(!showDescModal);
                        }}
                        className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-2 border-yellow-400 focus:border-2 transition-all duration-150 ease-in-out group">
                        <div className="w-full h-full flex flex-col justify-center items-center gap-2 sm:gap-1 group-hover:scale-105 group-active:scale-95 transition-transform duration-150 ease-in-out">
                            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border border-amber-700 bg-gray-700 overflow-hidden">
                                <img className="w-full h-full object-cover object-center" src={item.image} alt="Icon" />
                            </div>
                            <span className="text-[0.5rem] sm:text-xs text-white font-bold">{item.name}</span>
                        </div>
                        
                        <div className={`${item.isFavorite ? "opacity-100" : "opacity-0"} w-full h-full flex justify-end p-1 absolute inset-0`}>
                            <svg
                                xmlns="http://w3.org"
                                viewBox="0 -960 960 960"
                                className="w-4 h-4 fill-red-500"
                            >
                                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                            </svg>
                        </div>
                    </button>
                ))}

                {Array.from({length: remainingSlots}).map((_, idx) => (
                    <div key={idx} className="bg-gray-900 rounded-lg"></div>
                ))}
            </div>

            <button
                onClick={sellAllOres}
                className="flex justify-center items-center bg-gray-850 gap-1 p-2 mt-4 rounded-lg hover:bg-gray-700/50 cursor-pointer"
            >
                <img className="w-6 h-6" src="/attach_money.svg" alt="Personal Bag" />
                <span className="text-md sm:text-lg text-white font-bold my-auto uppercase">Sell All</span>
            </button>

            {showDescModal && (
                <div className="w-full h-full bg-black/65 fixed inset-0 flex justify-center items-center">
                    <div className="bg-gray-900 border-2 border-amber-500 rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-2xl animate-floating-text">
                
                        <h2 className="text-2xl font-bold text-amber-400 mb-6">Ore Stats</h2>
                        
                        <div className="bg-gray-850 w-full rounded-xl p-4 mb-6 text-center border border-gray-700 relative">
                            <span className="block text-xl font-bold text-white mb-2">{oreDesc?.name}</span>
                            <div className="w-full flex justify-center">
                                <div className="w-14 h-14 rounded-full border-2 border-amber-700 bg-gray-700 overflow-hidden">
                                    <img className="w-full h-full object-cover object-center" src={oreDesc?.image} alt="Icon" />
                                </div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-200 mt-4">
                                <span>Rarity:</span>
                                <span className={`${specialColor(oreDesc)} font-semibold`}>{oreDesc?.rarity}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-200 mt-1">
                                <span>Weight:</span>
                                <span className="text-white font-semibold">{oreDesc?.finalWeight} kg</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-200 mt-1">
                                <span>Value:</span>
                                <span className="text-yellow-400 font-semibold">$ {oreDesc?.finalValue?.toFixed(2)}</span>
                            </div>

                            <div className="w-full h-full absolute inset-0">
                                <button
                                    onClick={() => handleFavorite(oreDesc)}
                                    className="relative w-8 h-8 mt-0.5 mr-0.5 ml-auto flex items-center justify-center cursor-pointer transition-transform active:scale-90 select-none group"
                                    >
                                    <svg
                                        xmlns="http://w3.org"
                                        viewBox="0 -960 960 960"
                                        className="w-6 h-6 fill-gray-400 group-hover:fill-gray-300 transition-colors duration-200"
                                    >
                                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                    </svg>

                                    <svg
                                        xmlns="http://w3.org"
                                        viewBox="0 -960 960 960"
                                        className={`absolute w-6 h-6 fill-red-500 transition-all duration-300 ease-out 
                                        ${oreDesc.isFavorite 
                                            ? "opacity-100 scale-110" // Pop out and show color
                                            : "opacity-0 scale-50 pointer-events-none" // Shrink and vanish
                                        }`}
                                    >
                                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="w-full flex flex-row space-x-2">
                            <button
                                onClick={() => handleSellOre(oreDesc, selectedOreIndex)} // Pass the tracked index
                                className="grow-4 bg-pink-400 hover:bg-pink-300 text-gray-900 font-bold py-1 rounded-xl transition-colors cursor-pointer"
                            >
                                Sell
                            </button>
                            <button
                                onClick={() => {
                                    setShowDescModal(!showDescModal);
                                    setSelectedOreIndex(null);
                                }}
                                className="grow bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-1 rounded-xl transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}
