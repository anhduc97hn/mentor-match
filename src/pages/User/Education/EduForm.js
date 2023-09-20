import React, { useEffect } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";
import { FormProvider, FTextField } from "../../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { create, update } from "../../../slices/educationSlice";
import { LoadingButton } from "@mui/lab";

const EduSchema = Yup.object().shape({
  degree: Yup.string().required("Degree is required"),
  field: Yup.string().required("Field is required"),
  description: Yup.string().required("Description is required"),
  end_year: Yup.string().required("End year is required"),
});

const defaultValues = {
  degree: "",
  field: "",
  description: "",
  end_year: "",
  url: "",
};

function EduForm({
  currentEdu,
  setCurrentEdu,
  eduFormRef,
}) {
  const { dataById, isLoading } = useSelector((state) => state.education);
  const updatedEduId = useSelector((state) =>
    currentEdu
      ? state.education.currentPageData.find((edu) => edu === currentEdu)
      : null
  );

  const methods = useForm({
    resolver: yupResolver(EduSchema),
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
    if (updatedEduId) {
      const updatedEdu = dataById[updatedEduId];
      setValue("degree", updatedEdu.degree);
      setValue("field", updatedEdu.field);
      setValue("description", updatedEdu.description);
      setValue("url", updatedEdu.url);
      setValue("end_year", updatedEdu.end_year);
    }
  }, [updatedEduId, dataById, setValue]);

  const renderDynamicFields = (fields, prefix = "") => {
    return Object.keys(fields).map((fieldName) => (
      <FTextField
        key={prefix + fieldName}
        name={`${prefix}${fieldName}`}
        fullWidth
        placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        sx={{
          "& fieldset": {
            borderWidth: `1px !important`,
            borderColor: alpha("#919EAB", 0.32),
          },
        }}
      />
    ));
  };

  const onSubmit = (data) => {
    if (updatedEduId) {
      dispatch(update({ updatedEduId, data })).then(() => reset());
      setCurrentEdu(null);
    } else {
      dispatch(create(data)).then(() => reset());
    }
  };

  const handleCancelEditing = () => {
    setCurrentEdu(null);
    reset();
  };

  return (
    <div ref={eduFormRef}>
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {renderDynamicFields(defaultValues)}
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
              {updatedEduId && (
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

export default EduForm;
