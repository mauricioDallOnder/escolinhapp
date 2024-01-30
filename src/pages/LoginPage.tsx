import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn, useSession } from "next-auth/react";
import { useForm,SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Layout from '@/components/TopBarComponents/Layout';

interface LoginFormInputs {
  username: string;
  password: string;
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const router = useRouter();
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session) {
      reset(); // Limpa o formulário se o usuário já estiver logado
    }
  }, [session, reset]);



  const onSubmit = async (data: LoginFormInputs) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });


    if (result?.error) {
      alert(result.error);
    }

    if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <Layout>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} sx={{backgroundColor: "linear-gradient(to right, #2C7A7B, #38B2AC)"}} elevation={6} square>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuário"
                autoFocus
                {...register("username", { required: "Username required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                {...register("password", { required: "Password required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
             
             <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!!session} // Desabilita o botão se a sessão existir
              >
                {session ? "Já Logado" : "Fazer Login"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media.istockphoto.com/id/1295248329/pt/foto/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=2048x2048&w=is&k=20&c=4_gGjVl7gZS4rMQVQ99-8TMm0UpYG6-fw2UY2yf9GJs=)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      </Layout>
  );
}
