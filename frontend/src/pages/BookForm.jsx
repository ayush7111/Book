import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Container, Input } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const { id } = useParams(); // Get the book ID from the URL params
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch book data for editing
      axios
        .get(`https://book-backend-4pyj.onrender.com/api/books/${id}`)
        .then((response) => {
          const { data } = response;
          setTitle(data.title);
          setAuthor(data.author);
          setGenre(data.genre);
          setPrice(data.price);
          setQuantity(data.quantity);
        })
        .catch((error) => {
          console.error("Error fetching book data:", error);
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("image", image);

      if (id) {
        await axios.put(
          `https://book-backend-4pyj.onrender.com/api/books/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          "https://book-backend-4pyj.onrender.com/api/books",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // Redirect to the homepage after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genre"
              variant="outlined"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="book-image">Book Image</label>
            <Input
              id="book-image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {id ? "Update Book" : "Add Book"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BookForm;
