import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {eventsReducer} from "./eventsReducer";
import {StateType} from "typesafe-actions";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {eventsWatcher} from "../saga/eventsSaga";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    eventsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
})

sagaMiddleware.run(eventsWatcher)

export type RootState = StateType<typeof rootReducer>;

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;