import { DayPilot } from "@daypilot/daypilot-lite-react"


type EventsTextboxProps = {
    events: DayPilot.EventData[] | null,
    groupByDate?: boolean,
    mergeOverlapping?: boolean,
}

const EventsTextbox = (props: EventsTextboxProps) => {

    const formatDate = (event: DayPilot.EventData) => {
        return event.start.toString("ddd MMM dd", "en-US");
    }

    const formatDuration = (event: DayPilot.EventData) => {
        const start_time = event.start.toString("hh:mmtt", "en-US");
        const end_time = event.end.toString("hh:mmtt", "en-US");
        return start_time + " - " + end_time;
    }

    const formatEventText = (event: DayPilot.EventData) => {
        return formatDate(event) + ": " + formatDuration(event);
    }

    const formatEventsText = (events: DayPilot.EventData[]) => {
        const durations = events.map(e => formatDuration(e)).join("; ");
        return formatDate(events[0]) + ": " + durations;
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

    const groupEventsByDate = (events: DayPilot.EventData[]) => {
        return Object.groupBy(events, ({ start }) => start.toString("ddd MMM dd", "en-US"));
    }

    const createEventList = (events: DayPilot.EventData[]) => {

        let filtered_events = sortByStartTime(events);
        if (props.mergeOverlapping) {
            filtered_events = merge(filtered_events);
        }


        const createListItems = (events: DayPilot.EventData[]) => {
            if (props.groupByDate) {
                const filtered_events_by_date = groupEventsByDate(filtered_events);
                const list_items = [];
                let keys = Object.keys(filtered_events_by_date);
                keys.sort();
                for (let key of keys) {
                    if (filtered_events_by_date[key] !== undefined && filtered_events_by_date[key]!.length > 0) {
                        list_items.push(createListItem(key, filtered_events_by_date[key] ?? []));
                    }
                }
                return list_items;
            } else {
                return events.map(e => (
                    <li key={e.id}>
                        {formatEventText(e)}
                    </li>
                )
                );
            }
        }

        const createListItem = (date: string, events: DayPilot.EventData[]) => {
            return (
                <li key={date}>
                    {formatEventsText(events)}
                </li>
            )
        }

        return (
            <ul>
                {createListItems(filtered_events)}
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