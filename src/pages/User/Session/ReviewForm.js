import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormProvider from "../../../components/form/FormProvider";
import FTextField from "../../../components/form/FTextField"
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FRating from '../../../components/form/FRating';
import { useDispatch } from 'react-redux';
import { createReview } from '../../../slices/reviewSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #9DA4AE',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const ReviewSchema = Yup.object().shape({
    reviewRating: Yup.number().required("Rating is required"),
    reviewContent: Yup.string().required("Review is required")
  });
  
  const defaultValues = {
    reviewRating: null,
    reviewContent: ""
  };

export default function ReviewForm({children}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { sessionId } = params; 

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log("data", data)
    dispatch(createReview({data, sessionId})).then(() => reset())
    navigate("/account/sessions")
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>{children}</Button>
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Fade in={open}>
          <Box sx={style}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
            <Typography id="transition-modal-title" variant="h6" sx={{mt: 1, mb: 1}}>
             Please rate your overall experience
            </Typography>
            <FRating name="reviewRating" sx={{mb: 3}} />
            <FTextField name="reviewContent" label="Please share your feedback" multiline rows={4}/>
            <LoadingButton
            sx={{mt: 3}}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Thanks for sharing your thoughts
          </LoadingButton>
          </Box>
        </Fade>
        </FormProvider>
      </Modal>
     
    </div>
  );
}