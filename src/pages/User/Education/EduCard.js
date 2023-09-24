import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Grid
} from "@mui/material";
import { fDate } from "../../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { educationRemove } from "../../../slices/resourceSlice";

function EduCard({ edu, setCurrentEdu, eduFormRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const eduId = edu._id;
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-card-menu";

  const handleCardOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditCard = (eduId) => {
    window.scrollTo({
      top: eduFormRef.current.offsetTop,
      behavior: "smooth",
    });
    setCurrentEdu(eduId);
    handleMenuClose();
  };

  const handleDeleteCard = (eduId) => {
    const res = window.confirm(
      "Are you sure you want to delete this information?"
    );

    if (res) {
      dispatch(educationRemove(eduId));
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
      <MenuItem onClick={() => handleEditCard(eduId)} sx={{ m: 1 }}>
        Edit
      </MenuItem>
      <MenuItem onClick={() => handleDeleteCard(eduId)} sx={{ m: 1 }}>
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" component="div" color="text.primary">
              {edu.field}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleCardOpen}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" color="text.secondary">
          {`Degree: ${edu.degree}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`Description: ${edu.description}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {`End date: ${edu.end_year}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          {`Website: ${edu.url}`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {edu.updatedAt !== edu.createdAt
            ? `Edited on ${fDate(edu.updatedAt)}`
            : `Created on ${fDate(edu.createdAt)}`}
        </Typography>
      </CardContent>
      {renderMenu}
    </Card>
  );
}

export default EduCard;
