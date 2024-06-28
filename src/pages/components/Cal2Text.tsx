import { useState } from "react";
import Calendar from "./Calendar";
import { DayPilot } from "@daypilot/daypilot-lite-react";
import EventsTextbox from "./EventsTextbox";



const Cal2Text = () => {

    const [events, setEvents] = useState<DayPilot.EventData[] | null>(null);

    const handleEventListChange = (events: DayPilot.EventData[]) => {
        const next_events = [...events];
        setEvents(next_events);
    };

    return (
        <div>
            <Calendar handleEventListChange={handleEventListChange} />
            <div className="m-5">
                <EventsTextbox events={events} />
            </div>
        </div>
    )
}

export default Cal2Text;