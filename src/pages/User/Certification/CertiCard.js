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
import { remove } from "../../../slices/certificationSlice";

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
      dispatch(remove(certiId));
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
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            src={certi?.userProfile?.avatarUrl}
            alt={certi?.userProfile?.name}
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
            {certi?.userProfile?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(certi.createdAt)}
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
          <Typography variant="subtitle1">Name:</Typography>
          <ListItemText primary={certi.name} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Description:</Typography>
          <ListItemText primary={certi.description} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Url:</Typography>
          <ListItemText primary={certi.url} />
        </ListItemButton>
      </List>
    </Card>
  );
}

export default CertiCard;
