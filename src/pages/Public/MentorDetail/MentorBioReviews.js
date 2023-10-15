import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsPerMentor } from "../../../slices/reviewSlice";
import { fDateToMonthYear } from "../../../utils/formatTime";
import { LoadingButton } from "@mui/lab";
import LoadingScreen from "../../../components/LoadingScreen";

function MentorBioReviews({ selectedUser }) {
  const userProfileId = selectedUser._id;
  const dispatch = useDispatch();

  const {
    isLoading,
    reviewsById,
    currentPageReviewsByMentor,
    totalReviewsByMentor,
    totalPages,
  } = useSelector((state) => state.review);
  const [page, setPage] = useState(1);
  const reviews = currentPageReviewsByMentor.map(
    (reviewId) => reviewsById[reviewId]
  );

  useEffect(() => {
    dispatch(getReviewsPerMentor({ userProfileId, page }));
  }, [dispatch, userProfileId, page]);

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        Reviews ({selectedUser.reviewCount})
      </Typography>
      {isLoading ? (
        <LoadingScreen sx={{top: 0, left: 0}}/>
      ) : (
        <>
          {reviews.map((review) => {
            const fReviewDate = review.createdAt
              ? fDateToMonthYear(review.createdAt)
              : "";
            return (
              <Card
                sx={{
                  mt: 1,
                  mb: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "column", md: "row" },
                  alignItems: {xs: "left", sm: "left", md: "center"},
                  justifyContent: "space-between",
                  gap: {xs: 2, sm: 2, md: 0}
                }}
                key={review._id}
              >
                <Stack
                  alignItems="flex-start"
                  sx={{ width: "150px" }}
                  flexShrink="0"
                >
                  <Avatar
                    sx={{ width: "50px", height: "50px", mb: 1 }}
                    src={review.session.from.avatarUrl}
                  />
                  <Typography variant="subtitle2">
                    {review.session.from.name}
                  </Typography>
                  <Typography variant="caption">{fReviewDate}</Typography>
                </Stack>
                <Card sx={{ p: 1, bgcolor: "neutral.100", borderRadius: 1 }}>
                  <Typography variant="body2">{review.content}</Typography>
                </Card>
              </Card>
            );
          })}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {totalReviewsByMentor ? (
              <LoadingButton
                sx={{ mt: 1 }}
                variant="outlined"
                size="small"
                loading={isLoading}
                onClick={() => setPage((page) => page + 1)}
                disabled={Boolean(totalPages === 1)}
              >
                Load more
              </LoadingButton>
            ) : (
              <Typography variant="subtitle1">No Reviews Yet</Typography>
            )}
          </Box>
        </>
      )}
    </Stack>
  );
}

export default MentorBioReviews;
