import React, { useState, useEffect } from 'react';
import * as rx from "rxjs"

const observable$ = rx.interval(1000)

export const RxCounter = () => {

  const [state, setState] = useState<number>()

  useEffect(() => {
    observable$.subscribe(setState)
  }, [])

  return (
    <div>
      {state}
    </div>
  )
};
