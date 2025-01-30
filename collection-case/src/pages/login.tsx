'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Container, TextField, Button, Typography, Card, CardContent, Alert, Box } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  
    if (result?.error) {
      setError('Giriş bilgileri hatalı!');
    } else {
      router.push('/');
    }
  };
  

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: '100%', p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Giriş Yap
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Şifre"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ textTransform: 'none' }}>
                GİRİŞ YAP
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
