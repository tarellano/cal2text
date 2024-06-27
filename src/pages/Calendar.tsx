import { useRef } from "react";
import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

const Calendar = () => {

    const calendarRef = useRef<DayPilotCalendar>(null);

    const handleTimeRangeSelected = (args: { day: any; }) => {
        calendarRef.current?.control.update({
            startDate: args.day
        });
    }

    return (
        <div>
            <DayPilotNavigator 
                selectMode="Week"
                onTimeRangeSelected={handleTimeRangeSelected}
            />
            <DayPilotCalendar viewType="Week" durationBarVisible={false} ref={calendarRef}/>
        </div>
    )
}


export default Calendar;