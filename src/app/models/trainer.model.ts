import { Pokemon } from "../components/pokemon/Pokemon";
export interface Trainer {
    id: number;
    username: string;
    pokemon: Pokemon []
}