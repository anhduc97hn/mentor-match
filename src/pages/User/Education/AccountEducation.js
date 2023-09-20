import React, { useRef, useState } from "react";
import { Stack } from "@mui/material";
import EduForm from "./EduForm";
import EduList from "./EduList";


function AccountEducation() {
  const [currentEdu, setCurrentEdu] = useState(null);
  const eduFormRef = useRef();
  
  return (
   <Stack spacing={3}>
      <EduForm
        currentEdu={currentEdu}
        setCurrentEdu={setCurrentEdu}
        eduFormRef={eduFormRef}
      />
      <EduList
        setCurrentEdu={setCurrentEdu}
        eduFormRef={eduFormRef}
      />
    </Stack>
  )
}

export default AccountEducation