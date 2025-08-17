import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, updateBook, deleteBook, updateBookStatus  } from "../api/bookApi";
import { addRental } from "../api/rentalApi";
import type { Book } from "../api/bookApi";
import type { RentalRequestDTO } from "../api/rentalApi";
import { LoadingButton } from "@mui/lab";
import { Edit, Delete, ArrowBack, Book as BookIcon } from "@mui/icons-material";
import useUser from "../api/cutomHook"; // Import the useUser hook

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams();
  const user = useUser(); // Get user info from the hook
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [rentalData, setRentalData] = useState<RentalRequestDTO>({
    bookId: Number(bookId),
    username: user?.username || "", // Pre-fill with logged-in user's username
    rentalDate: new Date().toISOString().split("T")[0],
    returnDate: "",
  });
  const [rentalDuration, setRentalDuration] = useState<number>(7);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBook = async () => {
      try {
        if (!bookId) {
          setError("Book ID is required");
          return;
        }
        const data = await fetchBookById(Number(bookId));
        setBook(data);
        setFormData({
          title: data.title,
          author: data.author,
          genre: data.genre,
          status: data.status,
        });
      } catch (err) {
        setError("Failed to load book");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [bookId]);

  useEffect(() => {
    // Update username in rentalData when user changes
    if (user?.username) {
      setRentalData((prev) => ({
        ...prev,
        username: user.username,
      }));
    }
  }, [user]);

  const handleDelete = async () => {
    try {
      if (!bookId) return;
      setSubmitLoading(true);
      await deleteBook(Number(bookId));
      navigate("/homepage", {
        state: { message: "Book deleted successfully" },
      });
    } catch (err) {
      setSubmitError("Failed to delete book");
      console.error(err);
    } finally {
      setSubmitLoading(false);
      setDeleteConfirmOpen(false);
    }
  };

  const handleUpdate = async () => {
  try {
    if (!bookId) return;
    setSubmitLoading(true);
    
    // If only status is being changed, use the specific endpoint
    if (Object.keys(formData).length === 1 && formData.status) {
      await updateBookStatus(Number(bookId), formData.status);
    } else {
      // For other updates, use the general update endpoint
      const updatedBook = await updateBook(Number(bookId), formData as any);
    }
    
    navigate(0); // Reload the page
  } catch (err) {
    setSubmitError("Failed to update book");
    console.error(err);
  } finally {
    setSubmitLoading(false);
  }
};

  const handleRentBook = async () => {
    try {
      if (!bookId) return;
      setSubmitLoading(true);

      // Calculate return date based on duration
      const returnDate = new Date(rentalData.rentalDate);
      returnDate.setDate(returnDate.getDate() + rentalDuration);

      const rentalRequest: RentalRequestDTO = {
        bookId: Number(bookId),
        username: rentalData.username,
        rentalDate: rentalData.rentalDate,
        returnDate: returnDate.toISOString().split("T")[0],
      };

      // Create rental record
      await addRental(rentalRequest);

      // Update book status to "Borrowed" using the new endpoint
      await updateBookStatus(Number(bookId), "Borrowed");

      // Show success and reload
      setSubmitError(null);
      setRentDialogOpen(false);
      navigate(0); // Reload the page
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to rent book"
      );
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRentalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRentalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentalDuration(Number(e.target.value));
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Typography variant="h6">Loading book...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Alert severity="error">{error}</Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Back to Books
          </Button>
        </Box>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Alert severity="warning">Book not found</Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Back to Books
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={4}
        >
          <Box>
            {editMode ? (
              <TextField
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h3" gutterBottom>
                {book.title}
              </Typography>
            )}
            {editMode ? (
              <TextField
                fullWidth
                name="author"
                value={formData.author}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                By {book.author}
              </Typography>
            )}
          </Box>

          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Back
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                {editMode ? (
                  <>
                    <TextField
                      name="genre"
                      label="Genre"
                      value={formData.genre}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      select
                      name="status"
                      label="Status"
                      value={formData.status}
                      onChange={handleChange}
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Borrowed">Borrowed</option>
                    </TextField>
                  </>
                ) : (
                  <>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ mr: 1 }}
                      >
                        Genre:
                      </Typography>
                      <Chip label={book.genre} color="primary" size="small" />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ mr: 1 }}
                      >
                        Status:
                      </Typography>
                      <Chip
                        label={book.status}
                        color={
                          book.status === "Available" ? "success" : "error"
                        }
                        size="small"
                      />
                    </Box>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>

          {submitError && (
            <Alert severity="error" onClose={() => setSubmitError(null)}>
              {submitError}
            </Alert>
          )}

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                  disabled={submitLoading}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  onClick={handleUpdate}
                  loading={submitLoading}
                  startIcon={<Edit />}
                >
                  Save Changes
                </LoadingButton>
              </>
            ) : (
              <>
                {book.status === "Available" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<BookIcon />}
                    onClick={() => setRentDialogOpen(true)}
                  >
                    Rent Book
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setDeleteConfirmOpen(true)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{book.title}" by {book.author}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <LoadingButton
            color="error"
            onClick={handleDelete}
            loading={submitLoading}
            startIcon={<Delete />}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Rent Book Dialog */}
      <Dialog
        open={rentDialogOpen}
        onClose={() => setRentDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Rent Book</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Your Username"
              name="username"
              value={rentalData.username}
              onChange={handleRentalChange}
              fullWidth
              required
              disabled={!!user?.username}
            />
            <TextField
              label="Rental Date"
              type="date"
              name="rentalDate"
              value={rentalData.rentalDate}
              onChange={handleRentalChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Rental Duration (days)"
              type="number"
              value={rentalDuration}
              onChange={handleDurationChange}
              fullWidth
              inputProps={{
                min: 1,
                max: 30,
              }}
            />
            {submitError && (
              <Alert severity="error" onClose={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRentDialogOpen(false)}>Cancel</Button>
          <LoadingButton
            variant="contained"
            onClick={handleRentBook}
            loading={submitLoading}
            startIcon={<BookIcon />}
            disabled={!rentalData.username}
          >
            Confirm Rental
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookDetailPage;
