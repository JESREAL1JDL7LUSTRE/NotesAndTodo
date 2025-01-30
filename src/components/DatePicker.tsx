"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DatePickerWithPresets({
    onChange,
    defaultValue,
  }: {
    onChange?: (date: string) => void;
    defaultValue?: Date;
  }) {
    // Fix the useState type syntax
    const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  
    React.useEffect(() => {
      if (defaultValue) {
        setDate(defaultValue);
      }
    }, [defaultValue]);
  
    const handleDateChange = (newDate: Date | undefined) => {
        if (!newDate) return;
        
        // Ensure local time is used
        const localDate = format(newDate, "yyyy-MM-dd"); 
        
        setDate(newDate);
        if (onChange) {
          onChange(localDate); // Send formatted date instead of UTC
        }
      };
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <Select
            onValueChange={(value) => {
              const newDate = addDays(new Date(), parseInt(value));
              handleDateChange(newDate);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => handleDateChange(newDate)}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }