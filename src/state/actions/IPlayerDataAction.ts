export interface IPlayerControlAction {
    type: string,
    payload: {playerName: string, control:string, newKey:string}
}