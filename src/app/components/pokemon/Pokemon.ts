export interface Pokemon{
    name: string,
    abilities: string[],
    height: number,
    species: string,
    sprites: string[],
    type: string,
    stats:Stat[]
}

interface Stat{
    name: string,
    baseStat: number
}