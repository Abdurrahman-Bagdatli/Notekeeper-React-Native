import {DARKMODE, FETCH_TASKS, WHİTEMODE } from "./actionsType"

export const darkModeOnn= () => ({
    type:DARKMODE,
}
)

export const whiteModeOnn = () => ({
    type:WHİTEMODE,
})
export const fetch_Task = (items) => ({
    type: FETCH_TASKS,
    payload: items,
});