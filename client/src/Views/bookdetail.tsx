// BookDetailPage.tsx
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
import { fetchBookById, updateBook, deleteBook } from "../api/bookApi";
import type { Book } from "../api/bookApi";
import { LoadingButton } from "@mui/lab";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Book>>({});
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
    const updatedBook = await updateBook(Number(bookId), formData as any);
    // Reload the page
    navigate(0);
  } catch (err) {
    setSubmitError("Failed to update book");
    console.error(err);
  } finally {
    setSubmitLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    </Container>
  );
};

export default BookDetailPage;
