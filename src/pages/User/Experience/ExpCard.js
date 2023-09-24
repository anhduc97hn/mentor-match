import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Grid,
} from "@mui/material";
import { fDate } from "../../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { experienceRemove } from "../../../slices/resourceSlice";

function ExpCard({ exp, setCurrentExp, expFormRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const expId = exp._id;
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-card-menu";

  const handleCardOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditCard = (expId) => {
    window.scrollTo({
      top: expFormRef.current.offsetTop,
      behavior: "smooth",
    });
    setCurrentExp(expId);
    handleMenuClose();
  };

  const handleDeleteCard = (expId) => {
    const res = window.confirm(
      "Are you sure you want to delete this information?"
    );

    if (res) {
      dispatch(experienceRemove(expId));
    }
    return;
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleEditCard(expId)} sx={{ m: 1 }}>
        Edit
      </MenuItem>
      <MenuItem onClick={() => handleDeleteCard(expId)} sx={{ m: 1 }}>
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="subtitle1"
              component="div"
              color="text.primary"
            >
              {exp.company}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleCardOpen}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" color="text.secondary">
          {`Job Title: ${exp.position.title}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`Description: ${exp.position.description}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`Start date: ${exp.position.start_date}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`End date: ${exp.position.end_date}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`Industry: ${exp.industry}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`Address: ${exp.location}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {`Website: ${exp.url}`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {exp.updatedAt !== exp.createdAt
            ? `Edited on ${fDate(exp.updatedAt)}`
            : `Created on ${fDate(exp.createdAt)}`}
        </Typography>
      </CardContent>
      {renderMenu}
    </Card>
  );
}

export default ExpCard;
