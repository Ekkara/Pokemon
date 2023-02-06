import { Pokemon } from "./Pokemon";
export interface Trainer {
    id: number;
    username: string;
    pokemon: Pokemon []
}