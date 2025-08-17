import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  CardActionArea, 
  List, 
  ListItem, 
  Divider,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchAllBooks, addBook } from '../api/bookApi';
import type { Book, BookRequestDTO } from '../api/bookApi';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

const Homepage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [formData, setFormData] = useState<BookRequestDTO>({
    title: '',
    author: '',
    genre: '',
    status: 'Available'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchAllBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to load books');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setFormData({
      title: '',
      author: '',
      genre: '',
      status: 'Available'
    });
    setFormErrors({});
    setSubmitError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.author.trim()) errors.author = 'Author is required';
    if (!formData.genre.trim()) errors.genre = 'Genre is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      const newBook = await addBook(formData);
      setBooks(prev => [...prev, newBook]);
      handleCloseAddDialog();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to add book');
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Typography variant="h6">Loading books...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Typography variant="h6" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={4}>
        <Typography variant="h4" component="h1">
          Library Catalog
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ height: 'fit-content' }}
        >
          Add Book
        </Button>
      </Box>

      <Typography variant="body1" color="textSecondary" mb={4}>
        Browse our collection of {books.length} books
      </Typography>

      <Card variant="outlined">
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {books.map((book, index) => (
            <React.Fragment key={book.bookId}>
              <ListItem alignItems="flex-start" disablePadding>
                <CardActionArea 
                  onClick={() => handleBookClick(book.bookId)}
                  sx={{ p: 2 }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6" component="div">
                        {book.title}
                      </Typography>
                      <Chip 
                        label={book.status} 
                        size="small"
                        color={book.status === 'Available' ? 'success' : 'error'}
                      />
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      by {book.author}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Chip label={book.genre} size="small" variant="outlined" />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </ListItem>
              {index < books.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Card>

      {/* Add Book Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Add New Book
            <Button onClick={handleCloseAddDialog} color="inherit">
              <CloseIcon />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={!!formErrors.title}
              helperText={formErrors.title}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              error={!!formErrors.author}
              helperText={formErrors.author}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              error={!!formErrors.genre}
              helperText={formErrors.genre}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleSelectChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Checked Out">Checked Out</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <LoadingButton
            onClick={handleSubmit}
            loading={submitLoading}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Book
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Homepage;