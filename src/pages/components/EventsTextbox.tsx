import { DayPilot } from "@daypilot/daypilot-lite-react"


type EventsTextboxProps = {
    events: DayPilot.EventData[] | null,
    groupByDate?: boolean,
    mergeOverlapping?: boolean,
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

    const merge = (events: DayPilot.EventData[]) => {
        const copy = [...events];
        const res: DayPilot.EventData[] = [];

        for (let i = 0; i < copy.length; i++) {
            if (res.length == 0) {
                res.push(copy[i]);
            } else {
                let top = res.pop();
                if (top === undefined) throw Error("Popping from empty stack");
                if (top.end.toString().localeCompare(copy[i].start.toString()) >= 0) {
                    top.end = top.end.toString().localeCompare(copy[i].end.toString()) > 0 ? top.end : events[i].end;
                    res.push(top);
                } else {
                    res.push(top);
                    res.push(copy[i]);
                }
            }
        }

        return res;
    }

    const sortByStartTime = (events: DayPilot.EventData[]) => {
        const copy = [...events];
        copy.sort((a, b) => a.start.toString().localeCompare(b.start.toString()));
        return copy;
    }

    const createEventList = (events: DayPilot.EventData[]) => {
        let filtered_events = sortByStartTime(events);
        if (props.mergeOverlapping) {
            filtered_events = merge(filtered_events);
        }
        return (
            <ul>
                {filtered_events.map(e => (
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