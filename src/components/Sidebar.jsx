export default function Sidebar({player, activeTab, setActiveTab, isToggle, setIsToggle}) {
    const sidebarTabs = [ "Main Game", "Inventory", "Shop" ]
    
    return(
        <>
            <div className="hidden sm:flex flex-col bg-gray-850 p-4 border-r-2 border-amber-300">
                <div className="bg-gray-700 px-2 py-2 grid grid-rows-4 gap-y-2 rounded-lg text-center text-lg shadow-lg">
                    <h1 className="flex items-center justify-center text-2xl text-white font-bold">
                        {player.username} State
                    </h1>
                    <p className="inline-flex items-center justify-center bg-gray-800 p-2 rounded-lg">
                        <span className="mr-auto"><img src="/attach_money.svg" /></span>
                        <span className="text-white tracking-wider">{player.money}</span>
                    </p>
                    <p className="inline-flex items-center justify-center bg-gray-800 p-2 rounded-lg">
                        <span className="mr-auto"><img src="/bolt.svg" /></span>
                        <span className="text-white tracking-wider">{player.energy}/{player.maxEnergy}</span>
                    </p>
                    <p className="inline-flex items-center justify-center bg-gray-800 p-2 rounded-lg">
                        <span className="mr-auto"><img src="/personal_bag.svg" /></span>
                        <span className="text-white tracking-wider">{player.bagCapacity}/{player.maxBagCapacity}</span>
                    </p>
                </div>

                <ul className="flex flex-col gap-2 mt-6 pt-4 border-t-4 border-gray-800/75">
                    {sidebarTabs.map((tab) => (
                        <li key={`active-${tab}`} className={`${activeTab === tab ? "bg-gray-800/50" : "bg-transparent"} rounded-lg hover:bg-gray-800/50 transition-colors duration-200 ease-in-out`}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className="w-full flex p-4 text-white text-xl font-bold cursor-pointer"
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            
            {isToggle && (
                <>
                    <div className="w-full h-full sm:hidden backdrop-blur-xs bg-black/50 fixed inset-0" />

                    <div className="w-72 min-h-screen sm:hidden p-4 fixed top-0 left-0 z-50 bg-gray-850 border-r-2 border-amber-300">
                        <button
                            onClick={() => setIsToggle(!isToggle)}
                            className="w-full flex justify-end mb-4"
                        >
                            <img className="w-8 h-8" src="/close.svg" alt="Close" />
                        </button>

                        <div className="bg-gray-700 px-2 py-2 grid grid-rows-4 gap-y-2 rounded-lg text-center text-lg shadow-lg">
                            <h1 className="flex items-center justify-center text-2xl text-white font-bold">
                                {player.username} State
                            </h1>
                            <p className="inline-flex items-center justify-center bg-gray-800 p-2 rounded-lg">
                                <span className="mr-auto"><img src="/attach_money.svg" /></span>
                                <span className="text-white tracking-wider">{player.money}</span>
                            </p>
                            <p className="inline-flex items-center justify-center bg-gray-800 p-2 rounded-lg">
                                <span className="mr-auto"><img src="/bolt.svg" /></span>
                                <span className="text-white tracking-wider">{player.energy}/{player.maxEnergy}</span>
                            </p>
                            <p className="inline-flex items-center justify-center bg-gray-800 p-2 rounded-lg">
                                <span className="mr-auto"><img src="/personal_bag.svg" /></span>
                                <span className="text-white tracking-wider">{player.bagCapacity}/{player.maxBagCapacity}</span>
                            </p>
                        </div>

                        <ul className="flex flex-col gap-2 mt-6 pt-4 border-t-4 border-gray-800/75">
                            {sidebarTabs.map((tab) => (
                                <li key={`active-${tab}`} className={`${activeTab === tab ? "bg-gray-800/50" : "bg-transparent"} rounded-lg hover:bg-gray-800/50 transition-colors duration-200 ease-in-out`}>
                                    <button
                                        onClick={() => {setActiveTab(tab); setIsToggle(!isToggle)}}
                                        className="w-full flex p-4 text-white text-xl font-bold cursor-pointer"
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}