import React, { useEffect } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";
import { FormProvider, FTextField } from "../../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { certificationCreate, certificationUpdate } from "../../../slices/resourceSlice";
import { LoadingButton } from "@mui/lab";

const CertiSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  name: "",
  description: "",
  url: "",
};

function CertiForm({ currentCerti, setCurrentCerti, certiFormRef }) {
  const { dataById, isLoading } = useSelector((state) => state.certification);
  const updatedCertiId = useSelector((state) =>
    currentCerti
      ? state.certification.currentPageData.find(
          (certi) => certi === currentCerti
        )
      : null
  );

  const methods = useForm({
    resolver: yupResolver(CertiSchema),
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
    if (updatedCertiId) {
      const updatedCerti = dataById[updatedCertiId];
      setValue("name", updatedCerti.name);
      setValue("description", updatedCerti.description);
      setValue("url", updatedCerti.url);
    }
  }, [updatedCertiId, dataById, setValue]);

  const renderDynamicFields = (fields, prefix = "") => {
    return Object.keys(fields).map((fieldName) => (
      <FTextField
        key={prefix + fieldName}
        name={`${prefix}${fieldName}`}
        fullWidth
        label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
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
    if (updatedCertiId) {
      dispatch(certificationUpdate({ itemId: updatedCertiId, data })).then(
        () => {
          setCurrentCerti(null);
          reset();
        }
      );
    } else {
      dispatch(certificationCreate(data)).then(() => reset());
    }
  };

  const handleCancelEditing = () => {
    setCurrentCerti(null);
    reset();
  };

  return (
    <div ref={certiFormRef}>
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
              {updatedCertiId && (
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

export default CertiForm;
