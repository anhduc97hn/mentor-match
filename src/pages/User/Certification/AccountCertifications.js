import React, { useRef, useState } from "react";
import { Stack } from "@mui/material";
import CertiForm from "./CertiForm";
import CertiList from "./CertiList";


function AccountCertifications() {
  
  const [currentCerti, setCurrentCerti] = useState(null);
  const certiFormRef = useRef();

  return (
   <Stack spacing={3}>
      <CertiForm
        currentCerti={currentCerti}
        setCurrentCerti={setCurrentCerti}
        certiFormRef={certiFormRef}
      
      />
      <CertiList
        setCurrentCerti={setCurrentCerti}
        certiFormRef={certiFormRef}
      
      />
    </Stack>
  )
}

export default AccountCertifications