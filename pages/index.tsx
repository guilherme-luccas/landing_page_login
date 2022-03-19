//REACT
import { useState } from "react";

//NEXT
import Image from "next/image";
import { useRouter } from "next/router";

//MATERIAL-UI
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import Switch from "@mui/material/Switch";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

//ICONS & IMAGES
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../public/CriptoLogo.png";

//FORM
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

type InitialValues = {
  email: string;
  password: string;
};

enum CREDENTIALS {
  email = "email@teste.com.br",
  password = "123456",
}

const Home = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Um email válido é necessário"),
    password: Yup.string().required("Uma senha vádlia é necessária"),
  });
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        if (
          CREDENTIALS.email === values.email &&
          CREDENTIALS.password === values.password
        ) {
          router.push({
            pathname: "/dashboard",
          });
        } else {
          setLoginError("Login/Senha inválidos");
        }
      } catch (error: any) {}
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <FormikProvider value={formik}>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <Image
              src={logo}
              alt="Clara net logo, Cloud with power on button"
              width={100}
              height={100}
            />

            <Typography variant="h3" sx={{ color: "gray" }}>
              Bem-vindo!
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: { xs: "80%", sm: "50%", md: "70%", lg: "50%" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                {...getFieldProps("email")}
                placeholder="E-mail"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                sx={{ width: "100%", mb: 2 }}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                {...getFieldProps("password")}
                placeholder="Senha"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
                variant="filled"
                sx={{ width: "100%" }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Checkbox />

                  <Typography gutterBottom={false} sx={{}}>
                    Lembrar-me
                  </Typography>
                </Stack>
                <Button sx={{ color: "red", fontSize: 11, fontWeight: "bold" }}>
                  Esqueci minha senha
                </Button>
              </Stack>
              {loginError && (
                <Typography sx={{ color: "red" }}>{loginError}</Typography>
              )}
              <Stack spacing={1} sx={{ alignItems: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                    backgroundColor: "#FFD700",
                    "&:hover": {
                      background: "#FFD700",
                    },
                  }}
                >
                  Entrar
                </Button>
                <Button
                  startIcon={<GoogleIcon />}
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Logar com Google
                </Button>
                {/* <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography>Trocar de tema</Typography>
                  <Switch />
                </Stack> */}
              </Stack>
            </Form>
          </Stack>
        </Box>
      </FormikProvider>
      <Stack
        sx={{
          width: "50%",
          position: "relative",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Image
          alt="Employes"
          src="/../public/background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </Stack>
    </Stack>
  );
};

export default Home;
