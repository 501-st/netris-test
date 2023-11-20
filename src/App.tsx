import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Event} from "./components/Event";
import {useDispatch} from "react-redux";
import {addActiveEventAction, deleteActiveEventAction, fetchEventsAction} from "./store/eventsReducer";
import {useRootSelector} from "./store";

type Zone = {
    left: number;
    top: number;
    width: number;
    height: number;
}

export type EventType = {
    id: number;
    duration: number;
    timestamp: number;
    zone: Zone;
}

const isEventStillAcrive = (activeEvents: EventType[], id: number) => {
    return !!activeEvents.find(activeEvent => activeEvent.id === id)
}

export const App = () => {
    const previousRef = useRef(0)
    const ref = useRef<HTMLVideoElement>(null)

    const dispatch = useDispatch()
    const events = useRootSelector(state => state.eventsReducer.events)
    const activeEvents = useRootSelector(state => state.eventsReducer.activeEvents)

    useEffect(() => {
        dispatch(fetchEventsAction())
    }, []);

    const moveTo = useCallback((time: number) => {
        if (ref.current) {
            ref.current.currentTime = time;
            ref.current.play();
        }
    }, [])

    const checkIfShouldAddActiveEvent = () => {
        if (ref.current) {
            const currentTime = ref.current.currentTime
            const previousTime = previousRef.current

            activeEvents.forEach(activeEvent => {
                if (currentTime > activeEvent.timestamp + activeEvent.duration){
                    dispatch(deleteActiveEventAction(activeEvent.id))
                }
            })

            if (currentTime - previousRef.current > 0.5){
                previousRef.current = currentTime
                return;
            }

            const eventsShouldBeActivated = events.filter(event => event.timestamp > previousTime && event.timestamp < currentTime)

            eventsShouldBeActivated.forEach(event => {
                dispatch(addActiveEventAction(event))
            })

            previousRef.current = currentTime
        }
    }

    return (
        <Wrapper>
            <VideoWrapper>
                <div style={{position: 'relative'}}>
                    <video id={'video'} ref={ref}
                           src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                           controls
                           width={1280}
                           height={720}
                           onTimeUpdate={checkIfShouldAddActiveEvent}
                    />
                    {activeEvents.map(activeEvent => (
                        <GreenSquare key={activeEvent.id} height={activeEvent.zone.height}
                                     width={activeEvent.zone.width}
                                     left={activeEvent.zone.left} top={activeEvent.zone.top}/>
                    ))}
                </div>
            </VideoWrapper>
            <RowContainer>
                {!events.length && <div>Events are loading...</div>}
                {events.map(event => (
                    <Event moveTo={moveTo} event={event} key={event.id}
                           disabled={isEventStillAcrive(activeEvents, event.id)}/>
                ))}
            </RowContainer>
        </Wrapper>
    );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
  justify-content: center;
`;

const GreenSquare = styled.div<{ width: number; height: number; top: number; left: number; }>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: green;
`;