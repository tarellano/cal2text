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

    const overlaps = (event_1: DayPilot.EventData, event_2: DayPilot.EventData) => {
        return event_1.end.toString().localeCompare(event_2.start.toString()) >= 0;
    }

    const hasLaterEnd = (event_1: DayPilot.EventData, event_2: DayPilot.EventData) => {
        return event_1.end.toString().localeCompare(event_2.end.toString()) > 0
    }

    const merge = (events: DayPilot.EventData[]) => {
        const res: DayPilot.EventData[] = [];
        for (let i = 0; i < events.length; i++) {
            if (res.length == 0) {
                res.push(events[i]);
            } else {
                let latest_event = res.pop();
                if (latest_event === undefined) throw Error("Popping from empty stack");
                if (overlaps(latest_event, events[i])) {
                    const end = hasLaterEnd(latest_event, events[i]) ? latest_event.end : events[i].end;
                    const merged_event = {
                        start: latest_event.start,
                        end: end,
                        id: DayPilot.guid(),
                        text: "free"
                    }
                    res.push(merged_event);
                } else {
                    res.push(latest_event);
                    res.push(events[i]);
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