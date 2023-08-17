import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function PickDateTime({ label, sx, value, onChange,...other }) {
  return (
      <DateTimePicker disablePast label={label} sx={{ ...sx }} value={value} onChange={onChange}{...other} />
  );
}
