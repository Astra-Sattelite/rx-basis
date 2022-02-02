import React, { useEffect, useMemo, useState } from 'react';
import { Pokemon, selected$, pokemon$, deck$ } from './store';
import { useObservableState } from "observable-hooks"
import * as R from "ramda"

export const Deck = () => {
  const deck = useObservableState(deck$, [])

  return (
    <div>
      <h4>Deck</h4>
      <div>
        {R.map(p => 
          <div key={p.id} style={{
            display: "flex"
          }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name} 
            />
            <div>
              <div>{p.name}</div>
            </div>
          </div>,
          deck
        )}
      </div>
    </div>
  )
};


const Search = () => {
  const [search, setSearch] = useState("")

  const pokemon = useObservableState(pokemon$, [])

  const filteredPokemon = useMemo(() => {
    return pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [pokemon, search])

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filteredPokemon.map(p => (
          <div key={p.name}>
            <input type="checkbox"
              checked={p.selected}
              onChange={() => {
                if (selected$.value.includes(p.id)) {
                  selected$.next(selected$.value.filter(id => id !== p.id))
                } else {
                  selected$.next([...selected$.value, p.id])
                }
              }}
            />
            <strong>{p.name}</strong> - {p.power}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PokemonS() {

  const lazyGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: "1fr 1fr"
  }

  return (
    <div style={lazyGridStyle}>
      <Search />
      <Deck />
    </div>
  )
};