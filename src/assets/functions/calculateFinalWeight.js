export const calculateFinalWeight = (baseWeight, variance) => {
    const minMultiplier = 1 - variance
    const maxMultiplier = 1 + variance

    const randomMultiplier = minMultiplier + Math.random() * (maxMultiplier - minMultiplier)

    const finalWeight = (baseWeight * randomMultiplier).toFixed(2)

    return finalWeight
}