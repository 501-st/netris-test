import {call, put, takeEvery} from 'redux-saga/effects'
import {EventType} from '../App';
import axios from "axios";
import {addEventsAction, FETCH_EVENTS} from "../store/eventsReducer";

const fetchEventsFromApi = () => axios.get('https://run.mocky.io/v3/085041d6-c0a5-4d4c-8ba9-829a0212d75b')

function* fetchEventsWorker(): any {
    let events: EventType[] = (yield call(fetchEventsFromApi)).data

    events = events.sort(function (a, b) {
        return a.timestamp - b.timestamp;
    }).map((item, index) => {
        return {...item, id: index}
    });

    yield put(addEventsAction(events))
}

export function* eventsWatcher() {
    yield takeEvery(FETCH_EVENTS, fetchEventsWorker)
}