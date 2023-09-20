import React, { useRef, useState } from "react";
import { Stack } from "@mui/material";
import ExpForm from "./ExpForm";
import ExpList from "./ExpList";


function AccountExperiences() {

  const [currentExp, setCurrentExp] = useState(null);
  const expFormRef = useRef();

  return (
    <Stack spacing={3}>
      <ExpForm
        currentExp={currentExp}
        setCurrentExp={setCurrentExp}
        expFormRef={expFormRef}
      />
      <ExpList
        setCurrentExp={setCurrentExp}
        expFormRef={expFormRef}
      />
    </Stack>
  );
}

export default AccountExperiences;