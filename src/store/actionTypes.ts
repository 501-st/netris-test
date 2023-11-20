import {ADD_ACTIVE_EVENT, ADD_EVENTS, DELETE_ACTIVE_EVENT} from "./eventsReducer";
import {EventType} from "../App";

export type AddEventsActionType = {
    type: typeof ADD_EVENTS,
    payload: EventType[]
}

export type AddActiveEventActionType = {
    type: typeof ADD_ACTIVE_EVENT,
    payload: EventType
}

export type DeleteActiveEventActionType = {
    type: typeof DELETE_ACTIVE_EVENT,
    payload: number
}