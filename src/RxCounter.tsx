import React, { useState, useEffect } from 'react';
import * as rx from "rxjs"
import * as rxOp from "rxjs/operators"
import * as R from "ramda"

const countdown$ = rx.interval(250).pipe(
  rxOp.startWith(5),
  rxOp.scan(time => time - 1),
  rxOp.takeWhile(time => time > 0)
).pipe(
  rxOp.share()
)

const action$ = new rx.Subject()
const snooze$ = action$.pipe(rx.filter(action => action === "snooze"))
const dismiss$ = action$.pipe(rx.filter(action => action === "dismiss"))

const snoozeableAlarm$ = rx.concat(countdown$, rx.of("Wake up!")).pipe(
  rxOp.repeatWhen(() => snooze$)
)

const observable$ = rx.concat(snoozeableAlarm$.pipe(
  rxOp.takeUntil(dismiss$)
), rx.of("Have a nice day!"))

export const RxAlarmCloak = () => {

  const [state, setState] = useState<number | string>()
  useEffect(() => {
    const sub = observable$.subscribe(setState)
    return () => sub.unsubscribe()
  }, [])

  return (
    <div>
      <h1>Alarm Clock</h1>
      {state}
      <button onClick={() => action$.next("snooze")}>Snooze</button>
      <button onClick={() => action$.next("dismiss")}>Dismiss</button>
    </div>
  )
};
