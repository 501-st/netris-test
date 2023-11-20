import React, {memo} from 'react';
import styled from 'styled-components';
import {EventType} from "../App";
import {useDispatch} from "react-redux";
import {addActiveEventAction} from "../store/eventsReducer";

type OwnProps = {
    moveTo: (time: number) => void;
    event: EventType;
    disabled: boolean;
}

const getFormattedTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    let minutes = date.getMinutes().toString() + ':';
    let seconds = date.getSeconds().toString() + ':';
    let milliseconds = date.getMilliseconds().toString();

    if (minutes.length < 3) {
        minutes = '0' + minutes
    }

    if (seconds.length < 3) {
        seconds = '0' + seconds
    }

    while (milliseconds.length < 3) {
        milliseconds = '0' + milliseconds
    }

    return minutes + seconds + milliseconds
}

export const Event = memo((props: OwnProps) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        if (props.disabled){
            return
        }
        dispatch(addActiveEventAction(props.event))
        props.moveTo(props.event.timestamp)
    }

    return (
        <Container onClick={handleClick}>
            {getFormattedTime(props.event.timestamp)}
        </Container>
    );
});

const Container = styled.div`
  padding: 5px;
  font-family: Roboto, sans-serif;
  cursor: pointer;

  &:hover {
    color: aquamarine;
  }
`;