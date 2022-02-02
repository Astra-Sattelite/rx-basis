import * as rx from "rxjs"
import * as rxOp from "rxjs/operators"
import axios from "axios"
import pokeSimple from "./pokemon-simple.json"
import * as R from "ramda"

export type Pokemon = {
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
  selected?: boolean
}

const rawPokemon$ = new rx.BehaviorSubject<Pokemon[]>([])

const pokemonWithPower$ = rawPokemon$.pipe(
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

export const selected$ = new rx.BehaviorSubject<number[]>([])

export const pokemon$ = pokemonWithPower$.pipe(
  rxOp.combineLatestWith(selected$),
  rxOp.map(([pokemon, selected]) => 
    R.map(p => ({
      ...p,
      selected: selected.includes(p.id)
    }), pokemon)
  )
)

export const deck$ = pokemon$.pipe(
  rxOp.map(pokemon => 
    R.filter(p => 
      p.selected, 
      pokemon
    )
  )
)

rawPokemon$.next(pokeSimple)
