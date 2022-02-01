import * as rx from "rxjs"
import * as rxOp from "rxjs/operators"
import axios from "axios"
import pokeSimple from "./pokemon-simple.json"
import * as R from "ramda"

type Pokemon = {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number
  power?: number
}

const rawPokemon$ = new rx.BehaviorSubject<Pokemon[]>([])

export const pokemonWithPower$ = rawPokemon$.pipe(
  rxOp.map(pokemon => 
    R.map(p => ({
      ...p,
      power: 
        p.hp +
        p.attack + 
        p.defense + 
        p.special_attack +
        p.special_defense +
        p.speed
    }), pokemon)
  )
)

rawPokemon$.next(pokeSimple)
