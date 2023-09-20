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
  Collapse,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { remove } from "../../../slices/experienceSlice";

function ExpCard({ exp, setCurrentExp, expFormRef }) {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const expId = exp._id;
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-card-menu";

  const handleClick = () => {
    setOpen(!open);
  };

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
      dispatch(remove(expId));
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
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            src={exp?.userProfile?.avatarUrl}
            alt={exp?.userProfile?.name}
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
            {exp?.userProfile?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(exp.createdAt)}
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
          <Typography variant="subtitle1">Company:</Typography>
          <ListItemText primary={exp.company} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Industry:</Typography>
          <ListItemText primary={exp.industry} />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <Typography variant="subtitle1">Position</Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Typography variant="subtitle2">Title:</Typography>
              <ListItemText primary={exp.position.title} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Typography variant="subtitle2">Description:</Typography>
              <ListItemText primary={exp.position.description} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Typography variant="subtitle2">Start date:</Typography>
              <ListItemText primary={exp.position.start_date} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Typography variant="subtitle2">End date:</Typography>
              <ListItemText primary={exp.position.end_date} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <Typography variant="subtitle1">Location:</Typography>
          <ListItemText primary={exp.location} />
        </ListItemButton>
        <ListItemButton>
          <Typography variant="subtitle1">Url:</Typography>
          <ListItemText primary={exp.url} />
        </ListItemButton>
      </List>
    </Card>
  );
}

export default ExpCard;
