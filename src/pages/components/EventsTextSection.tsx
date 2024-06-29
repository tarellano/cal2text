import { DayPilot } from "@daypilot/daypilot-lite-react";
import EventsTextbox from "./EventsTextbox";
import { useState } from "react";


type EventsTextSectionProps = {
    events: DayPilot.EventData[] | null,
}

const EventsTextSection = (props: EventsTextSectionProps) => {

    const [groupByDate, setGroupByDate] = useState(true);
    const [mergeOverlapping, setMergeOverlapping] = useState(true);

    const handleGroupByDateToggle = () => {
        setGroupByDate(!groupByDate);
    }

    const handleMergeOverlappingToggle = () => {
        setMergeOverlapping(!mergeOverlapping);
    }

    return (
        <div className="flex flex-row">
            <EventsTextOptions
                groupByDate={groupByDate}
                handleGroupByDateToggle={handleGroupByDateToggle}
                mergeOverlapping={mergeOverlapping}
                handleMergeOverlappingToggle={handleMergeOverlappingToggle}
            />
            <div className="ml-10">
                <EventsTextbox
                    events={props.events}
                    groupByDate={groupByDate}
                    mergeOverlapping={mergeOverlapping}
                />
            </div>
        </div>
    )
}

type EventsTextOptionsProps = {
    groupByDate: boolean,
    handleGroupByDateToggle: () => void,
    mergeOverlapping: boolean,
    handleMergeOverlappingToggle: () => void,
}

const EventsTextOptions = (props: EventsTextOptionsProps) => {
    return (
        <div className="flex flex-col">
            <div>
                <input
                    id="group-by-date"
                    type="checkbox"
                    checked={props.groupByDate}
                    onChange={props.handleGroupByDateToggle}
                />
                <label htmlFor="group-by-date" className="font-mono"> group by date </label>
            </div>
            <div>
                <input
                    id="merge-overlapping"
                    type="checkbox"
                    checked={props.mergeOverlapping}
                    onChange={props.handleMergeOverlappingToggle}
                />
                <label htmlFor="merge-overlapping" className="font-mono"> merge overlapping </label>
            </div>
        </div>
    )
}

export default EventsTextSection;