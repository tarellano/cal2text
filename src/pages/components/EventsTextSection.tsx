import { DayPilot } from "@daypilot/daypilot-lite-react";
import EventsTextbox from "./EventsTextbox";

type EventsTextSectionProps = {
    events: DayPilot.EventData[] | null,
}


const EventsTextSection = (props : EventsTextSectionProps) => {

    return (
        <EventsTextbox {...props} />
    )
}

export default EventsTextSection;