"use client";
import Clock from "react-live-clock";

const LiveClock = () => {
  return (
    <div className="text-dark text-muted-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-[0.33rem] dark:text-white">
      {/* <CalendarIcon className="w-5 h-5" /> */}
      <span className="hidden text-[.9rem] font-medium sm:block">
        <Clock
          format={"hh:mm A - dddd, MMMM DD, YYYY"}
          ticking={true}
          timezone={"Africa/Kigali"}
        />
      </span>
    </div>
  );
};

export default LiveClock;
