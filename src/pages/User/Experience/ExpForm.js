import React, { useEffect } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";
import { FormProvider, FTextField } from "../../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { experienceCreate, experienceUpdate } from "../../../slices/resourceSlice";
import { LoadingButton } from "@mui/lab";

const ExpSchema = Yup.object().shape({
  company: Yup.string().required("Company is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  position: Yup.object().shape({
    title: Yup.string().required("Position title is required"),
    description: Yup.string().required("Position description is required"),
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
  }),
});

const defaultValues = {
  company: "",
  industry: "",
  location: "",
  url: "",
  position: {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  }
};

function ExpForm({ currentExp, setCurrentExp, expFormRef }) {
  const { dataById, isLoading } = useSelector((state) => state.experience);
  const updatedExpId = useSelector((state) =>
    currentExp
      ? state.experience.currentPageData.find((exp) => exp === currentExp)
      : null
  );

  const methods = useForm({
    resolver: yupResolver(ExpSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatedExpId) {
      const updatedExp = dataById[updatedExpId];
      setValue("company", updatedExp.company);
      setValue("industry", updatedExp.industry);
      setValue("location", updatedExp.location);
      setValue("url", updatedExp.url);
      setValue("position.title", updatedExp.position.title);
      setValue("position.description", updatedExp.position.description);
      setValue("position.start_date", updatedExp.position.start_date);
      setValue("position.end_date", updatedExp.position.end_date);
    }
  }, [updatedExpId, dataById, setValue]);

  const renderDynamicFields = (fields, prefix = "") => {
    return Object.keys(fields).map((fieldName) => {
      if (fieldName === "position") return null
      
      const label = prefix + fieldName !== "position"
        ? fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        : "";

      return (
        <FTextField
          key={prefix + fieldName}
          name={`${prefix}${fieldName}`}
          fullWidth
          label={label}
          sx={{
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: alpha("#919EAB", 0.32),
            },
          }}
        />
      );
    });
  };

  const onSubmit = (data) => {
    if (updatedExpId) {
      dispatch(experienceUpdate({ itemId: updatedExpId, data })).then(() => {
        setCurrentExp(null);
        reset();
      });
    } else {
      dispatch(experienceCreate(data)).then(() => reset());
    }
  };

  const handleCancelEditing = () => {
    setCurrentExp(null);
    reset();
  };

  return (
    <div ref={expFormRef}>
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {renderDynamicFields(defaultValues)}
            {renderDynamicFields(defaultValues.position, "position.")}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting || isLoading}
              >
                Create
              </LoadingButton>
              {updatedExpId && (
                <LoadingButton
                  variant="contained"
                  color="error"
                  size="small"
                  loading={isSubmitting || isLoading}
                  onClick={handleCancelEditing}
                >
                  Cancel editing
                </LoadingButton>
              )}
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </div>
  );
}

export default ExpForm;
