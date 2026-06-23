export default function Inventory({player, setPlayer}) {
    const itemsPerPage = 25
    const remainingSlots = Math.max(0, itemsPerPage - player.inventory.length )

    const specialCard = (item) => {
        switch (item) {
            case "Rare":
                return "bg-blue-600"
            case "Legendary":
                return "bg-yellow-400"
            case "Mythic":
                return "bg-red-500"
            default:
                return "bg-gray-800"
        }
    }

    const sellAllOres = () => {
        const totalMoney = player.inventory.reduce((sum, ore) => sum + ore.finalValue, 0)
        setPlayer((prevPlayer) => ({...prevPlayer, money: parseFloat((prevPlayer.money + totalMoney).toFixed(2))}))
        setPlayer((prevPlayer) => ({...prevPlayer, bagCapacity: prevPlayer.bagCapacity - prevPlayer.inventory.length}))
        setPlayer((prevPlayer) => ({...prevPlayer, inventory: []}))
    }
    
    return(
        <div className="flex flex-col justify-center items-center bg-gray-900 p-4">
            <div className="w-full max-w-md flex">
                <div className="flex bg-gray-850 gap-2 p-4 mr-auto mb-4 rounded-lg">
                    <img className="w-8 h-8" src="/personal_bag.svg" alt="Personal Bag" />
                    <span className="text-md sm:text-xl text-white font-bold mt-1 my-auto uppercase">Inventory</span>
                </div>

                <button
                    onClick={sellAllOres}
                    className="flex bg-gray-850 gap-2 p-4 mb-4 rounded-lg hover:bg-gray-700/50 cursor-pointer"
                >
                    <img className="w-8 h-8" src="/attach_money.svg" alt="Personal Bag" />
                    <span className="text-md sm:text-xl text-white font-bold mt-1 my-auto uppercase">Sell All</span>
                </button>
            </div>

            <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full max-w-md h-full max-h-2/4 aspect-square p-4 bg-gray-850 rounded-xl">
                {player.inventory.map((item) => (
                    <div className={`${specialCard(item.rarity)} rounded-lg`}></div>
                ))}

                {Array.from({length:remainingSlots}).map((_, idx) => (
                    <div key={idx} className="bg-gray-900 rounded-lg"></div>
                ))}
            </div>
        </div>
    )
}