"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    // Here you would typically send this to your backend or open a modal for time selection
    alert(`Selected date: ${selectedDate?.toDateString()}`);
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isOpen ? "auto" : "60px" }}
      transition={{ duration: 0.3 }}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-emerald-800 rounded-lg shadow-xl overflow-hidden z-40"
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center bg-emerald-700 text-white"
      >
        Book a Consultation
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
      {isOpen && (
        <div className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border border-emerald-600"
          />
        </div>
      )}
    </motion.div>
  );
}
