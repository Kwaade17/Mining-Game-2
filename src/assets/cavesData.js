import caveOne from '../assets/images/cave_one.png'

export const cavesData = [
    {
        name: "Basic Cave",
        description: "This cave is a starter level cave where you can find most common ores and rare ores that can help you progress and unlock the other caves.",
        image: caveOne,
        requiredLevel: 1,
        energyConsumption: 5,
        ores: [
            { name: "Bronze", baseWeight: 0.5, baseValue: 5, rarity: "Common", luck: 80, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4G_PpYsN27MI0z4VWfOIaSdVw7kUYIiHA1A&s" },
            { name: "Silver", baseWeight: 1.25, baseValue: 25, rarity: "Uncommon", luck: 10, image: "https://img.magnific.com/free-photo/damaged-grunge-texture-background_1194-601937.jpg?semt=ais_hybrid&w=740&q=80" },
            { name: "Gold", baseWeight: 2.0, baseValue: 75, rarity: "Rare", luck: 5, image: "https://as2.ftcdn.net/jpg/05/33/56/33/1000_F_533563311_ryuNwj5NZPWGjoCZcPovYiEUrm2Fxjca.jpg" },
            { name: "Diamond", baseWeight: 3.0, baseValue: 125, rarity: "Legendary", luck: 4, image: "https://static.vecteezy.com/system/resources/thumbnails/033/287/395/small/abstract-blue-diamond-texture-crystal-close-up-background-3d-rendering-photo.jpg" },
            { name: "Emerald", baseWeight: 3.8, baseValue: 210, rarity: "Mythic", luck: 1, image: "https://static.vecteezy.com/system/resources/thumbnails/049/324/325/small/green-crystal-background-macro-shot-of-emerald-gemstone-texture-photo.jpeg" },
        ]
    }
]