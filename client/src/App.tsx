import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // TODO: Add real login logic here (API call)
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          📚 Bookscape Login
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" mb={3}>
          Welcome back! Sign in to explore your favorite books.
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
          >
            Forgot Password?
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
