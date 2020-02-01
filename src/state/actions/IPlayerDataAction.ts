export interface IPlayerControlAction {
    type: string,
    payload: {playerName: string, control:string, newKey:string}
}

export interface IPlayerColorAction {
    type: string,
    payload: {playerName: string, color:string}
}