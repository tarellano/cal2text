import { useState } from "react";
import Calendar from "./Calendar";
import { DayPilot } from "@daypilot/daypilot-lite-react";

type EventTextBoxProps = {
    events: DayPilot.EventData[] | null
}

const EventTextBox = (props: EventTextBoxProps) => {

    const parseEventText = (event: DayPilot.EventData) => {
        return event.start.toString() + " - " + event.end.toString()
    }

    const createEventList = (events: DayPilot.EventData[]) => {
        return (
            <ul>
                {events.map(e => (
                    <li key={e.id}>
                        {parseEventText(e)}
                    </li>
                )
                )}
            </ul>
        )
    }

    if (!props.events || props.events === undefined || props.events!.length == 0) {
        return <div>Click on the calendar to create an event.</div>
    }

    return (
        <div>
            {createEventList(props.events!)}
        </div>
    )
}


const Cal2Text = () => {

    const [events, setEvents] = useState<DayPilot.EventData[] | null>(null);

    const handleEventListChange = (events: DayPilot.EventData[]) => {
        const next_events = [...events];
        setEvents(next_events);
    };

    return (
        <div>
            <Calendar handleEventListChange={handleEventListChange} />
            <EventTextBox events={events} />
        </div>
    )
}

export default Cal2Text;