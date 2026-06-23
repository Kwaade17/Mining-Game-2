import { useState } from "react";
import MainGame from "./components/MainGame";
import Sidebar from "./components/Sidebar";
import Inventory from "./components/Inventory";

function App({playerState}) {
  const [ activeTab, setActiveTab ] = useState("Main Game")
  const [ isToggle, setIsToggle ] = useState(false)

  const [ player, setPlayer ] = useState({...playerState})

  const renderedContent = () => {
    switch (activeTab) {
      case "Main Game":
        return <MainGame player={player} setPlayer={setPlayer} />
      case "Inventory":
        return <Inventory player={player} setPlayer={setPlayer} />
      case "Shop":
        return <div className="w-full h-full flex justify-center items-center bg-lime-600">
                <span className="text-4xl text-bold font-black">Hello! Welcome to Shop</span>
               </div>
      default:
        return <MainGame />
    }
  }

  return(
    <div className="w-full h-screen relative grid grid-cols-1 sm:grid-cols-[260px_1fr] bg-gray-950">
      <button 
        onClick={() => setIsToggle(!isToggle)}
        className="mt-4 ml-4 sm:hidden absolute top-0 left-0">
        <img className="w-10 h-10" src="menu.svg" alt="Menu" />
      </button>

      <Sidebar player={player} activeTab={activeTab} setActiveTab={setActiveTab} isToggle={isToggle} setIsToggle={setIsToggle} />

      {renderedContent()}
    </div>
  )
}

export default App;