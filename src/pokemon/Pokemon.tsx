import React, { useEffect } from 'react';
import { pokemonWithPower$ } from "./store"

export const Pokemon = () => {
  useEffect(() => {
    pokemonWithPower$.subscribe(console.log)
  }, []);

  return (
    <div>
      poke
    </div>
  )
};
