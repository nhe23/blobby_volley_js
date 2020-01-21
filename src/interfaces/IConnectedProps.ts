import {Dispatch, Action, AnyAction} from "redux";
import { IState } from "../state/IState";

interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
  }

export type IConnectedProps = IState & ConnectedReduxProps;