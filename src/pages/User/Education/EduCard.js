import React, { useState } from "react";
import {
  Link,
  Card,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { remove } from "../../../slices/educationSlice";

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
      dispatch(remove(eduId));
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
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            src={edu?.userProfile?.avatarUrl}
            alt={edu?.userProfile?.name}
          />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to="/account/profile"
          >
            {edu?.userProfile?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(edu.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <MoreVertIcon sx={{ fontSize: 30 }} onClick={handleCardOpen} />
          </IconButton>
        }
      />
      {renderMenu}
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <Typography variant="subtitle1">Field:</Typography>
          <ListItemText primary={edu.field} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Description:</Typography>
          <ListItemText primary={edu.description} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Degree:</Typography>
          <ListItemText primary={edu.degree} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">End date:</Typography>
          <ListItemText primary={edu.end_date} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Url:</Typography>
          <ListItemText primary={edu.url} />
        </ListItemButton>
      </List>
    </Card>
  );
}

export default EduCard;
