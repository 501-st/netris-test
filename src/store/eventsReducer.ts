import {EventType} from "../App";
import {AddActiveEventActionType, AddEventsActionType, DeleteActiveEventActionType} from "./actionTypes";

type ActionTypes = AddEventsActionType | AddActiveEventActionType | DeleteActiveEventActionType

type EventsState = {
    events: EventType[],
    activeEvents: EventType[]
}

const defaultState: EventsState = {
    events: [],
    activeEvents: []
}
export const FETCH_EVENTS = 'FETCH_EVENTS'
export const ADD_EVENTS = 'ADD_EVENTS'
export const ADD_ACTIVE_EVENT = 'ADD_ACTIVE_EVENT'
export const DELETE_ACTIVE_EVENT = 'DELETE_ACTIVE_EVENT'

export const eventsReducer = (state = defaultState,
                              action: ActionTypes) => {
    switch (action.type) {
        case ADD_EVENTS:
            return {...state, events: action.payload}
        case ADD_ACTIVE_EVENT:
            return {...state, activeEvents: [...state.activeEvents, action.payload]}
        case DELETE_ACTIVE_EVENT:
            return {
                ...state,
                activeEvents: [...state.activeEvents.filter(activeEvent => activeEvent.id !== action.payload)]
            }
        default:
            return state
    }
}

export const fetchEventsAction = () => {
    return {
        type: FETCH_EVENTS,
    }
}

export const addEventsAction = (payload: EventType[]) => {
    return {
        type: ADD_EVENTS,
        payload
    }
}

export const addActiveEventAction = (payload: EventType) => {
    return {
        type: ADD_ACTIVE_EVENT,
        payload
    }
}

export const deleteActiveEventAction = (payload: number) => {
    return {
        type: DELETE_ACTIVE_EVENT,
        payload
    }
}