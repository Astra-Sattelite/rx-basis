import React, { useState } from 'react'
import './App.scss'
import * as rx from "rxjs"
import * as rxOp from "rxjs/operators"
import { User, Users } from "./types"
import * as R from "ramda"

const App = () => {

  const users: Users = {
    data: [
      { status: "active"
      , age: 14
      },
      { status: "active"
      , age: 32
      },
      { status: "inactive"
      , age: 17
      },
    ]
  }

  const users2: Users = {
    data: [
      { status: "active"
      , age: 14
      },
      { status: "active"
      , age: 32
      },
      { status: "inactive"
      , age: 17
      },
      { status: "active"
      , age: 32
      },
      { status: "inactive"
      , age: 43
      },
      { status: "active"
      , age: 23
      }
    ]
  }

  const observable$ = new rx.Observable((subscriber: rx.Subscriber<Users>) => {
    subscriber.next(users2)
    subscriber.next(users)
    subscriber.next(users2)
  }).pipe(
    rxOp.pluck("data"), 
    
    rxOp.filter((value) => value.length >= 5),

    rxOp.map((value: User[]) => {
      // console.log("2) Got data from first operator", value)
      return R.filter(user => user.status === "active", value)
    }),


    rxOp.map((value: User[]) => {
      // console.log("3) Got data from second operator", value)
      return R.reduce((averageAge, user) => averageAge + user.age, 0, value) / value.length
    }),
    rxOp.map((value: number) => {
      // console.log("4) Got data from third operator", value)
      if(value < 18) throw new Error("Average age is too young")

      else return value
    })
  )

  const observer = {
    next: (val: any) => {
      console.log("Observer got a value of " + val)
    },
    error: (err: any) => {
      console.log("Observable got error " + err)
    },
    complete: () => {
      console.log("Observer got a complete notification")
    }
  }

  observable$.subscribe(observer)

  return (
    <div className="AppMain"> 
    </div>
  )
}

export default App