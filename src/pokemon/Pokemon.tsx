import React, { useEffect, useMemo, useState } from 'react';
import { pokemonWithPower$, Pokemon } from "./store"

const Search = () => {
  const [search, setSearch] = useState("")
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    const sub = pokemonWithPower$.subscribe(setPokemon)
    return () => sub.unsubscribe()
  }, [])

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
    </div>
  )
};