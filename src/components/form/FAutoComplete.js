import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

function FAutoComplete({ name, options, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, ...fieldProps } = field;

        return (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
              {...fieldProps}
              />
            )}
            onChange={(_, newValue) => {
              field.onChange(newValue)
            }}
            {...other}
          />
        );
      }}
    />
  );
}

export default FAutoComplete;
