import { useRef } from "react"
import { bagShop, energyBundleShop, energyShop } from "../assets/shopData"

export default function Shop({player, setPlayer}) {
  const pageScrollRef = useRef(null)
  const energyScrollRef = useRef(null)
  const energyCapScrollRef = useRef(null)
  const bagScrollRef = useRef(null)

  const handleWheelScroll = (e, ref) => {
    if (!ref.current) return

    ref.current.scrollLeft += e.deltaY
  }
  
  return(
    <div className="w-full h-full overflow-y-scroll scrollbar-none bg-gray-900">
      <div className="p-4 space-y-4">
        <div className="flex flex-col w-full p-4 rounded-xl bg-gray-800">
          
          <span className="px-2 mb-4 font-bold text-white text-xl sm:text-3xl">
            Energy Shop
          </span>
          <div
            ref={energyScrollRef}
            onWheel={(e) => handleWheelScroll(e, energyScrollRef)}
            className="flex mb-4 space-x-2 overflow-x-scroll scrollbar-none scroll-smooth"
          >
            {energyShop.map((item, index) => (
              <div key={`${item.name}-${index}`} className="w-48 shrink-0 p-4 space-y-2.5 sm:space-y-4 text-center flex flex-col justify-center items-center rounded-xl text-white bg-gray-700">
                <span className="w-full p-0.5 sm:p-1 rounded-xl font-bold text-white bg-gray-800 text-sm sm:text-md">
                  {item.name}
                </span>
                <div className="w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-full bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-full h-full object-cover object-center fill-white"
                  >
                    <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/>
                  </svg>
                </div>
                <span className="w-full rounded-xl px-4 py-2 text-xs sm:text-sm border-2 border-dashed border-amber-600 bg-gray-800">
                  {item.details}
                </span>
                <button
                  onClick={() => {
                    if (player.money <= item.price) {
                      window.alert(`Not enough money to buy ${item.name} you need $${item.price}`)
                      return
                    }

                    if (item.energy > player.maxEnergy) {
                      window.alert("You cannot buy this!")
                      return
                    }

                    if ((player.energy + item.energy) > player.maxEnergy) {
                      window.alert(`You cannot buy this, because it excess to your ${player.maxEnergy} max energy.`)
                      return
                    }

                    setPlayer((prevPlayer) => ({
                      ...prevPlayer,
                      money: prevPlayer.money - item.price,
                      energy: prevPlayer.energy + item.energy
                    }))}
                  }
                  className="w-full rounded-xl p-1 mt-auto sm:mt-1 font-bold text-sm sm:text-md text-lime-800 bg-lime-400 hover:bg-lime-300 cursor-pointer">
                  $ {item.price}
                </button>
              </div>
            ))}
          </div>
          
          <span className="px-2 mb-4 font-bold text-white text-xl sm:text-3xl">
            Energy Bundle Shop
          </span>
          <div
            ref={energyCapScrollRef}
            onWheel={(e) => handleWheelScroll(e, energyCapScrollRef)}
            className="flex space-x-2 overflow-x-scroll scrollbar-none scroll-smooth"
          >
            {energyBundleShop.map((item, index) => (
              <div key={`${item.name}-${index}`} className="w-48 shrink-0 p-4 space-y-2.5 sm:space-y-4 text-center flex flex-col justify-center items-center rounded-xl text-white bg-gray-700">
                <span className="w-full p-0.5 sm:p-1 rounded-xl font-bold text-white bg-gray-800 text-sm sm:text-md">
                  {item.name}
                </span>
                <div className="w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-full bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-full h-full object-cover object-center fill-white"
                  >
                    <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/>
                  </svg>
                </div>
                <span className="w-full rounded-xl px-4 py-2 text-xs sm:text-sm border-2 border-dashed border-amber-600 bg-gray-800">
                  {item.details}
                </span>
                <button
                  onClick={() => {
                    if (player.money <= item.price) {
                      window.alert(`Not enough money to buy ${item.name} you need $${item.price}`)
                      return
                    }

                    setPlayer((prevPlayer) => ({
                      ...prevPlayer,
                      money: prevPlayer.money - item.price,
                      maxEnergy: prevPlayer.maxEnergy + item.energy
                    }))}
                  }
                  className="w-full rounded-xl p-1 mt-auto sm:mt-1 font-bold text-sm sm:text-md text-lime-800 bg-lime-400 hover:bg-lime-300 cursor-pointer">
                  $ {item.price}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full p-4 rounded-xl bg-gray-800">
          <span className="px-2 mb-4 font-bold text-white text-xl sm:text-3xl">
            Bag Shop
          </span>
          <div
            ref={bagScrollRef}
            onWheel={(e) => handleWheelScroll(e, bagScrollRef)}
            className="flex space-x-2 overflow-x-auto scrollbar-none scroll-smooth"
          >
            {bagShop.map((item, index) => (
              <div key={`${item.name}-${index}`} className="w-48 shrink-0 p-4 space-y-2.5 sm:space-y-4 text-center flex flex-col justify-center items-center rounded-xl text-white bg-gray-700">
                <span className="w-full p-1 rounded-xl font-bold text-sm sm:text-md text-white bg-gray-800">
                  {item.name}
                </span>
                <div className="w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-full bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-full h-full object-cover object-center fill-white"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160v-320q0-85 44.5-152T360-732v-28q0-50 35-85t85-35q50 0 85 35t35 85v28q71 33 115.5 100T760-480v320q0 33-23.5 56.5T680-80H280Zm0-80h400v-320q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480v320Zm348.5-171.5Q640-343 640-360v-120H320v80h240v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5ZM440-756q11-2 20-3t20-1q11 0 20 1t20 3v-4q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v4ZM280-160h400-400Z"/>
                  </svg>
                </div>
                <span className="w-full rounded-xl px-4 py-2 text-xs sm:text-sm border-2 border-dashed border-amber-600 bg-gray-800">
                  {item.details}
                </span>
                <button
                  disabled={item.isBought}
                  onClick={() => {
                    if (player.money <= item.price) {
                      window.alert(`Not enough money to buy ${item.name} you need $${item.price}`)
                      return
                    }

                    if (item.isBought) return

                    item.isBought = true

                    setPlayer((prevPlayer) => ({
                      ...prevPlayer,
                      money: prevPlayer.money - item.price,
                      maxBagCapacity: prevPlayer.maxBagCapacity + item.capacity
                    }))}
                  }
                  className={`w-full rounded-xl p-1 mt-auto text-sm sm:text-md font-bold ${item.isBought ? "bg-slate-500 cursor-not-allowed" : "text-lime-800 bg-lime-400 hover:bg-lime-300 cursor-pointer"}`}>
                    {item.isBought ? "OWNED" : `$ ${item.price}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}