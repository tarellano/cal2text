import { useRef, useState } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator, CalendarProps } from "@daypilot/daypilot-lite-react";

type CalProps = {
    handleEventListChange: (args: DayPilot.EventData[]) => void;
}

const Calendar = (calProps: CalProps) => {

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
        calProps.handleEventListChange(dp.events.list);
    }

    const handleMoveEvent = async () => {
        const dp = calendarRef.current!.control;
        calProps.handleEventListChange(dp.events.list);
    }

    const handleResizeEvent = async () => {
        const dp = calendarRef.current!.control;
        calProps.handleEventListChange(dp.events.list);
    }

    const handleDeleteEvent = async (args: { source: DayPilot.Event; }) => {
        const dp = calendarRef.current!.control;
        dp.events.remove(args.source);
        calProps.handleEventListChange(dp.events.list);
    }

    const [calendarConfig, setCalendarConfig] = useState<CalendarProps>({
        viewType: "Week",
        timeRangeSelectedHandling: "Enabled",
        cellHeight: 25,
        showToolTip: false,
        onEventMoved: handleMoveEvent,
        onEventResized: handleResizeEvent,
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
        <div className="flex">
            <DayPilotNavigator
                cellHeight={20}
                showMonths={3}
                rowsPerMonth="Auto"
                selectMode="Week"
                onTimeRangeSelected={handleTimeRangeSelected}
            />
            <DayPilotCalendar {...calendarConfig} ref={calendarRef}/>
        </div>
    )
}


export default Calendar;