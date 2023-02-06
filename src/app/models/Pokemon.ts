//detailed, used when the user wants more information about one pokemon type
export interface Pokemon {
  name: string;
  url: string;
  id: number;

  details: DetailedPokemon | null
}
export interface DetailedPokemon{
  id:number;
  base_experience:number;
  height:number;
  weight:number;
}


