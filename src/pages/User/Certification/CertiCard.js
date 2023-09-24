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
import { certificationRemove } from "../../../slices/resourceSlice";

function CertiCard({ certi, setCurrentCerti, certiFormRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const certiId = certi._id;
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-card-menu";

  const handleCardOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditCard = (certiId) => {
    window.scrollTo({
      top: certiFormRef.current.offsetTop,
      behavior: "smooth",
    });
    setCurrentCerti(certiId);
    handleMenuClose();
  };

  const handleDeleteCard = (certiId) => {
    const res = window.confirm(
      "Are you sure you want to delete this information?"
    );

    if (res) {
      dispatch(certificationRemove(certiId));
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
      <MenuItem onClick={() => handleEditCard(certiId)} sx={{ m: 1 }}>
        Edit
      </MenuItem>
      <MenuItem onClick={() => handleDeleteCard(certiId)} sx={{ m: 1 }}>
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
              {certi.name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleCardOpen}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" color="text.secondary">
          {`Description: ${certi.description}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {`Website: ${certi.url}`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {certi.updatedAt !== certi.createdAt
            ? `Edited on ${fDate(certi.updatedAt)}`
            : `Created on ${fDate(certi.createdAt)}`}
        </Typography>
      </CardContent>
      {renderMenu}
    </Card>
  );
}

export default CertiCard;
