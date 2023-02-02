//detailed, used when the user wants more information about one pokemon type
export interface Pokemon {
  name: string;
  details: DetailedPokemon | null
}
export interface DetailedPokemon{
  abilities: string[];
  height: number;
  species: string;
  sprites: string[];
  type: string;
  stats: Stat[];
}

interface Stat {
  name: string;
  baseStat: number;
}

