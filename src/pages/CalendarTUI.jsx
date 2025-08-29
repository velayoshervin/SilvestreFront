import React, { useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css"; // Stylesheet for calendar
import "./CalendarTUI.css";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
  IconCalendarEvent,
  IconCalendarCog,
  IconClock,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import {
  SegmentedControl,
  Menu,
  Button,
  Modal,
  TextInput,
  Tooltip,
  Select,
  Checkbox,
  Avatar,
  Textarea,
} from "@mantine/core";
import { FaHandHolding } from "react-icons/fa";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { useDisclosure } from "@mantine/hooks";
import { formatISO, sub } from "date-fns";

function getReminderOptions(eventDateTime) {
  const date = eventDateTime;
  return [
    {
      value: "",
      label: "",
    },

    {
      value: formatISO(
        sub(date, {
          days: 7,
          hours: date.getHours() - 7,
          minutes: date.getMinutes(),
        })
      ),
      label: "A week before",
    },
    {
      value: formatISO(
        sub(date, {
          days: 3,
          hours: date.getHours() - 7,
          minutes: date.getMinutes(),
        })
      ),
      label: "3 days before",
    },
    {
      value: formatISO(
        sub(date, {
          days: 1,
          hours: date.getHours() - 7,
          minutes: date.getMinutes(),
        })
      ),
      label: "A day before",
    },
    {
      value: formatISO(
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0)
      ),
      label: "Morning of the event",
    },
    {
      value: formatISO(new Date(date.getTime() - 60 * 60 * 1000)),
      label: "1 hour before",
    },
    {
      value: formatISO(new Date(date.getTime() - 30 * 60 * 1000)),
      label: "30 minutes before",
    },
    {
      value: formatISO(new Date(date.getTime() - 15 * 60 * 1000)),
      label: "15 minutes before",
    },
  ];
}

const calendars = [
  { id: "reserved", name: "Reserved", color: "#a8d5ba" },
  { id: "booked", name: "Booked", color: "#f4a6a6" },
  { id: "blocked", name: "Blocked", color: "#c0c0c0" },
  { id: "activity", name: "Activity", color: "#88c9bf" },
  { id: "meeting", name: "Meeting", color: "#6a7fdb" },
];

const mockEvents = [
  {
    id: "1",
    calendarId: "booked",
    title: "Bridal Shower",
    category: "time",
    start: "2025-08-30T10:00:00+08:00",
    end: "2025-08-30T12:00:00+08:00",
    location: "Silvestre Events Hall",
    isAllday: false,
    attendees: [
      { id: "u1", name: "Jane Doe" },
      { id: "u2", name: "John Smith" },
    ],
  },
  {
    id: "2",
    calendarId: "reserved",
    title: "Venue Reserved",
    category: "allday",
    start: "2025-08-31",
    end: "2025-09-01",
    location: "",
    isAllday: true,
  },
  {
    id: "3",
    calendarId: "meeting",
    title: "Team Planning Meeting",
    category: "time",
    start: "2025-08-29T14:00:00+08:00",
    end: "2025-08-29T15:30:00+08:00",
    location: "Conference Room",
    isAllday: false,
    attendees: [
      { id: "u3", name: "Manager A" },
      { id: "u4", name: "Staff B" },
    ],
  },
  {
    id: "4",
    calendarId: "blocked",
    title: "Blocked for Maintenance",
    category: "allday",
    start: "2025-08-02",
    end: "2025-08-03",
    location: "Main Hall",
    isAllday: true,
  },
  {
    id: "5",
    calendarId: "activity",
    title: "Zumba Session",
    category: "time",
    start: "2025-08-16T18:00:00+08:00",
    end: "2025-08-16T19:00:00+08:00",
    location: "Activity Room A",
    isAllday: false,
  },
];

const CalendarTUI = () => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);

  useEffect(() => {
    if (calendarRef.current && !calendarInstance.current) {
      calendarInstance.current = new Calendar(calendarRef.current, {
        defaultView: "week",
        usageStatistics: false,
        date: new Date(),
        useCreationPopup: false,
        useFormPopup: true,
        week: {
          dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          hourStart: 7,
          hourEnd: 24,
          taskView: false,
        },
        template: {
          weekDayName(model) {
            // Convert TZDate to real local Date string
            const modelDate = new Date(model.dateInstance.d); // Safe unwrap
            const today = new Date();

            // Use toLocaleDateString with time zone for reliable match
            const modelDateStr = modelDate.toLocaleDateString("en-CA", {
              timeZone: "Asia/Manila",
            });
            const todayStr = today.toLocaleDateString("en-CA", {
              timeZone: "Asia/Manila",
            });

            const isToday = modelDateStr === todayStr;

            const bgColor = isToday ? "#262626" : "#f3f4f6";
            const textColor = isToday ? "#fff" : "#333";

            return `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${bgColor};
        padding: 10px;
        border-radius: 6px;
        gap: 2px;
        color: ${textColor};
      ">
        <span style="font-weight: bold; font-size: 14px;">${model.dayName}</span>
        <span style="font-size: 24px; font-weight: bold">${model.date}</span>
      </div>
    `;
          },
        },
      });

      calendarInstance.current.render();
      calendarInstance.current.setCalendars(calendars);
      calendarInstance.current.createEvents(mockEvents);
      console.log("Calendar instance created", calendarInstance.current);

      calendarInstance.current.on("selectDateTime", (event) => {
        const selected = event.start;
        setSelectedDate(selected);
        //
        //   "start": "2025-07-29T16:00:00.000Z",
        //   "end": "2025-07-29T16:00:00.000Z",
        //   "isAllday": true,
        //   "nativeEvent": {
        //     "isTrusted": true
        //   },
        //   "gridSelectionElements": []

        if (
          event.guide &&
          typeof event.guide.clearGuideElement === "function"
        ) {
          event.guide.clearGuideElement();
        }

        if (event.stop) {
          event.stop(); // stops event propagation
        }

        setMenuPosition({
          x: event.nativeEvent.clientX,
          y: event.nativeEvent.clientY,
        });
        setMenuOpened(true);
        return false;
      });
    }

    // Optional cleanup
    return () => {
      if (calendarInstance.current) {
        calendarInstance.current.destroy();
        calendarInstance.current = null;
      }
    };
  }, []);

  const [calendarView, setCalendarView] = useState("week");
  const [calendarHeader, setCalendarHeader] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  );

  const mousePosRef = useRef();
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCalendarId, setSelectedCalendarId] = useState(calendars[0].id);
  const [allDay, setAllDay] = useState(false);
  const [reminderOptions, setReminderOptions] = useState([]);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState();
  const [selectedReminder, setSelectedReminder] = useState("");

  const handleMouseDown = (e) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const calendarViewHandler = (value) => {
    setCalendarView(value);

    // Change the view first
    calendarInstance.current.changeView(value, true);

    // Then wait for the DOM/render to settle before updating the header
    setTimeout(() => {
      updateCalendarHeader();
    }, 0);
  };

  const handleTodayClick = () => {
    calendarInstance.current.today();
    updateCalendarHeader();
  };

  const handlePrev = () => {
    calendarInstance.current.prev();
    updateCalendarHeader();
  };

  const handleNext = () => {
    calendarInstance.current.next();
    updateCalendarHeader();
  };

  const updateCalendarHeader = () => {
    const calendar = calendarInstance.current;
    const view = calendar.getViewName();
    const date = calendar.getDate().toDate();

    if (view === "month") {
      setCalendarHeader(
        date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      );
    } else if (view === "week") {
      const start = calendar.getDateRangeStart().toDate();
      const end = calendar.getDateRangeEnd().toDate();

      setCalendarHeader(
        `${start.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${end.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`
      );
    } else if (view === "day") {
      setCalendarHeader(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    const start = 7 * 60; // 7:00 AM in minutes
    const end = 22 * 60; // 10:00 PM in minutes
    options.push({ value: "", label: "" });
    for (let mins = start; mins <= end; mins += 30) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      const time = new Date();
      time.setHours(hours);
      time.setMinutes(minutes);

      const label = time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      options.push({ value: label, label });
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleAddEvent = () => {
    const reminderOptionList = getReminderOptions(selectedDate);
    setReminderOptions(reminderOptionList);

    open();
  };

  const handleManageDate = () => {};

  function darkenColor(hex, amount = 20) {
    let c = hex.replace("#", "");

    if (c.length === 3) {
      c = c
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const num = parseInt(c, 16);
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00ff) - amount;
    let b = (num & 0x0000ff) - amount;

    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <div className="w-full flex justify-end py-2 px-5 bg-blue-50 gap-2 relative tui-calendar-container rounded-xl">
      <div className="w-[300px] h-[100vh] border border-gray-400 sticky rounded-xl"></div>
      <div className="w-[1200px] h-[100vh] rounded-xl overflow-scroll border bg-white">
        <div className="header flex justify-between px-10 bg-white items-center my-8 ">
          <p className="text-[24px] text-gray-900">{calendarHeader}</p>
          <div className="flex gap-2">
            <SegmentedControl
              data={[
                { label: "Month", value: "month" },
                { label: "Week", value: "week" },
                { label: "Day", value: "day" },
              ]}
              value={calendarView}
              onChange={calendarViewHandler}
            />
          </div>

          <div className="flex items-center gap-2">
            <IconChevronLeft
              size={24}
              className="cursor-pointer border border-gray-200 rounded bg-[#f5f6f7] "
              onClick={handlePrev}
            />
            <button
              className="cursor-pointer border border-gray-200 rounded bg-[#f5f6f7] px-2 text-[10px]"
              onClick={handleTodayClick}
            >
              Today
            </button>
            <IconChevronRight
              size={24}
              className="cursor-pointer border border-gray-200 rounded bg-[#f5f6f7] "
              onClick={handleNext}
            />
          </div>
        </div>
        <div
          ref={calendarRef}
          className="h-full relative"
          onMouseDown={handleMouseDown}
        >
          {menuOpened && (
            <Menu
              opened={menuOpened}
              onClose={() => setMenuOpened(false)}
              position="bottom-start"
              withArrow
              withinPortal
              shadow="md"
              width={200}
              styles={{
                dropdown: {
                  position: "fixed",
                  top: menuPosition.y,
                  left: menuPosition.x,
                },
              }}
            >
              <Menu.Target>
                <div
                  style={{
                    position: "fixed",
                    top: menuPosition.y,
                    left: menuPosition.x,
                  }}
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item onClick={handleAddEvent} className="flex">
                  <div className="flex items-center gap-2">
                    <IconCalendarEvent size={16} />
                    <span className="text-sm">Add event</span>
                  </div>
                </Menu.Item>
                <Menu.Item onClick={handleManageDate}>
                  <div className="flex items-center gap-2">
                    <IconCalendarCog size={16} />
                    <span className="text-sm">Manage date</span>
                  </div>
                </Menu.Item>
                <Menu.Item color="red" onClick={() => setMenuOpened(false)}>
                  Close
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}

          <>
            <Modal
              opened={opened}
              onClose={close}
              title="Add event"
              className="rounded-xl"
            >
              <form method="POST">
                <TextInput label="Event name"></TextInput>
                <div className="flex justify-between items-center py-4">
                  <div className="flex gap-2">
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <IconCalendar size={18} />
                    </p>
                    <p>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(selectedDate)}
                    </p>
                  </div>
                  <div id="calendars" className="flex gap-2.5 items-center">
                    {calendars.map((cal) => {
                      const isSelected = cal.id === selectedCalendarId;
                      console.log(
                        "cal id:",
                        cal.id,
                        "isSelected ",
                        isSelected,
                        "selectedCalendarId:",
                        selectedCalendarId
                      );
                      return (
                        <Tooltip
                          key={cal.id}
                          label={cal.name}
                          color={cal.color}
                        >
                          <button
                            type="button"
                            className="rounded-full w-4 h-4 transition duration-300"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedCalendarId(cal.id);
                            }}
                            style={{
                              backgroundColor: cal.color,
                              boxShadow: `
                              0 0 0 2px ${isSelected ? "white" : cal.color},
                             0 0 0 4px ${
                               isSelected ? darkenColor(cal.color) : cal.color
                             }  `,
                            }}
                            // aria-pressed={isSelected}
                          >
                            <span className="sr-only">{cal.name}</span>
                          </button>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
                <div id="time" className="flex">
                  <div id="time" className="flex items-center gap-2">
                    <IconClock size={18} />
                    <Select
                      data={timeOptions}
                      placeholder="Start time"
                      searchable
                      nothingFoundMessage="No time found"
                      withScrollArea
                      disabled={allDay}
                      value={startTime}
                      onChange={setStartTime}
                      styles={{
                        input: {
                          border: "none", // remove border
                          outline: "none", // remove outline (focus ring)
                          boxShadow: "none", // remove any shadow on focus
                          paddingLeft: 16,
                          paddingRight: 40, // leave space for dropdown icon
                          borderRadius: 9999, // pill shape
                        },
                        root: {
                          width: 120,
                          border: "1px solid #d1d5db",
                          borderRadius: 9999,
                        },
                        rightSection: {
                          pointerEvents: "none", // keeps icon clickable disabled (optional)
                        },
                      }}
                      radius="xl"
                    />
                    <Select
                      data={timeOptions}
                      placeholder="End time"
                      searchable
                      nothingFoundMessage="No time found"
                      withScrollArea
                      disabled={allDay}
                      value={endTime}
                      onChange={setEndTime}
                      styles={{
                        input: {
                          border: "none", // remove border
                          outline: "none", // remove outline (focus ring)
                          boxShadow: "none", // remove any shadow on focus
                          paddingLeft: 16,
                          paddingRight: 40, // leave space for dropdown icon
                          borderRadius: 9999, // pill shape
                        },
                        root: {
                          width: 120,
                          border: "1px solid #d1d5db",
                          borderRadius: 9999,
                        },
                        rightSection: {
                          pointerEvents: "none", // keeps icon clickable disabled (optional)
                        },
                      }}
                      radius="xl"
                    />
                    <Checkbox
                      label="All day event?"
                      checked={allDay}
                      onChange={(event) =>
                        setAllDay(event.currentTarget.checked)
                      }
                    />
                  </div>
                </div>
                <div
                  id="attendees"
                  className="pt-6  flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Tooltip label="people invited to this event" color="blue">
                      <IconUser size={20}></IconUser>
                    </Tooltip>

                    <Avatar size={30} stroke={1.5}></Avatar>
                    <div id="participants"></div>
                  </div>

                  <button
                    className="flex items-center bg-green-500 rounded-2xl  text-white px-4 py-1"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <IconUserPlus size={14}></IconUserPlus> invite
                  </button>
                </div>

                <Select
                  data={reminderOptions}
                  placeholder="set reminder"
                  label="Set reminder"
                  value={selectedReminder}
                  onChange={setSelectedReminder}
                  className="py-4"
                ></Select>

                <Textarea
                  label="description"
                  value={description}
                  placeholder="add short description"
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
                ></Textarea>
                <button className="rounded-2xl w-full border border-gray-300 bg-blue-500 text-white py-[6px] mt-4 ">
                  Submit
                </button>
              </form>
            </Modal>
          </>
          <></>
        </div>
      </div>
    </div>
  );
};

export default CalendarTUI;
