import { useRef, useState } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator, CalendarProps } from "@daypilot/daypilot-lite-react";

const Calendar = () => {

    const calendarRef = useRef<DayPilotCalendar>(null);

    const handleTimeRangeSelected = (args: { day: any; }) => {
        calendarRef.current!.control.update({
            startDate: args.day
        });
    }

    const handleNewEvent = async (args: { start: any; end: any; }) => {
        const dp = calendarRef.current!.control;
        dp.clearSelection();
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: "free"
        });
    }

    const handleDeleteEvent = async (args: { source: DayPilot.Event; }) => {
        const dp = calendarRef.current!.control;
        dp.events.remove(args.source);
    }

    const [calendarConfig, setCalendarConfig] = useState<CalendarProps>({
        viewType: "Week",
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: handleNewEvent,
        contextMenu: new DayPilot.Menu({
            items: [
              {
                text: "Delete",
                onClick: handleDeleteEvent
              }
            ]
          }),
    });

    return (
        <div>
            <DayPilotNavigator 
                selectMode="Week"
                onTimeRangeSelected={handleTimeRangeSelected}
            />
            <DayPilotCalendar {...calendarConfig} ref={calendarRef}/>
        </div>
    )
}


export default Calendar;