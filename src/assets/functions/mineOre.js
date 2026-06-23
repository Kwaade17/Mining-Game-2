import { calculateFinalWeight } from "./calculateFinalWeight"

export const mineOre = (selectedCave, player, setPlayer, setIsObtained) => {
    if (!player) {
        console.error("No player data in playerStatefile!")
        return
    }
    
    if (player.energy < selectedCave.energyConsumption) {
        window.alert("Insufficient Energy!")
        return
    }

    if (player.bagCapacity === player.maxBagCapacity) {
        window.alert("Bag is full! Sell your ore first")
        return
    }

    if (!selectedCave || !selectedCave.ores) {
        console.error("No cave data provided to mineOre!")
        return
    }

    const totalLuck = selectedCave.ores.reduce((sum, ore) => sum + ore.luck, 0)

    const roll = Math.ceil(Math.random() * totalLuck)

    let obtainedOre = null
    let currentWeight = 0

    for (const ore of selectedCave.ores) {
        currentWeight += ore.luck

        if (roll <= currentWeight) {
            obtainedOre = { ...ore }
            break
        }
    }

    if (obtainedOre) {
        obtainedOre.finalWeight = calculateFinalWeight(obtainedOre.baseWeight, 0.15)
        obtainedOre.finalValue = parseFloat(obtainedOre.baseValue * obtainedOre.finalWeight)
        obtainedOre.isFavorite = false
    }
    
    setPlayer((prevPlayer) => ({
        ...prevPlayer,
        bagCapacity: prevPlayer.bagCapacity + 1,
        energy: prevPlayer.energy - selectedCave.energyConsumption
    }))

    setIsObtained(true)

    return obtainedOre
}