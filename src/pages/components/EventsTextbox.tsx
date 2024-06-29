import { DayPilot } from "@daypilot/daypilot-lite-react"


type EventsTextboxProps = {
    events: DayPilot.EventData[] | null,
}

const EventsTextbox = (props: EventsTextboxProps) => {

    const parseEventText = (event: DayPilot.EventData) => {
        const start = event.start;
        const end = event.end;

        const date = start.toString("ddd MMM dd", "en-US");
        const start_time = start.toString("hh:mmtt", "en-US");
        const end_time = end.toString("hh:mmtt", "en-US");

        return date + ": " + start_time + " - " + end_time
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
        return <p className="font-mono">Click on the calendar to create an event.</p>
    }

    return (
        <div className="font-mono">
            {createEventList(props.events!)}
        </div>
    )
}

export default EventsTextbox;