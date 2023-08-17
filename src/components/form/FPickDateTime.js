import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import PickDateTime from "../PickDateTime";

function FPickDateTime({ name, label, sx, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <>
            <PickDateTime
              label={label}
              sx={{ ...sx }}
              error={checkError}
              value={field.value}
              onChange={(date) => field.onChange(date)}
              {...other}
            />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}

export default FPickDateTime;
