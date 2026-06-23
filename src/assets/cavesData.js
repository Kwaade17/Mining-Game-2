import caveOne from '../assets/images/cave_one.png'

export const cavesData = [
    {
        name: "Basic Cave",
        description: "This cave is a starter level cave where you can find most common ores and rare ores that can help you progress and unlock the other caves.",
        image: caveOne,
        requiredLevel: 1,
        energyConsumption: 5,
        ores: [
            { name: "Bronze", baseWeight: 0.5, baseValue: 5, rarity: "Common", luck: 80 },
            { name: "Silver", baseWeight: 1.25, baseValue: 25, rarity: "Uncommon", luck: 10 },
            { name: "Gold", baseWeight: 2.0, baseValue: 75, rarity: "Rare", luck: 5 },
            { name: "Diamond", baseWeight: 3.0, baseValue: 125, rarity: "Legendary", luck: 4 },
            { name: "Emerald", baseWeight: 3.8, baseValue: 210, rarity: "Mythic", luck: 1 },
        ]
    }
]