import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Box, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import axios from "axios";
import BookCard from "../components/BookCard";

const ITEMS_PER_PAGE = 4;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://book-backend-4pyj.onrender.com/api/books",
          {
            params: {
              page: currentPage,
              limit: ITEMS_PER_PAGE,
              searchTerm: searchTerm,
            },
          }
        );
        setBooks(response.data.books);
        setTotalBooks(response.data.totalCount);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" my={3}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {books.length === 0 ? (
        <Typography variant="h5" align="center" gutterBottom>
          No Books
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {books.map((book, index) => (
              <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(totalBooks / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
