import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BookCard = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`https://book-backend-4pyj.onrender.com/update/${book._id}`);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${book._id}`);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Card
      sx={{
        position: "relative", // Ensure the card is relatively positioned
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={book.image}
        alt={book.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {book.author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: ${book.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Quantity: {book.quantity}
        </Typography>
      </CardContent>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <IconButton aria-label="menu" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </div>
    </Card>
  );
};

export default BookCard;
