//REACT
import { useEffect, useState } from "react";

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

//ICONS & IMAGES
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import Logo from "../src/assets/criptologo.png";
import Background from "../src/assets/background.jpg";

//FORM
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//AUTH
import { useSession, signIn } from "next-auth/react";

import ForgotPassword from "../src/components/forgotPassword";

type InitialValues = {
  email: string;
  password: string;
};

enum CREDENTIALS {
  email = "email@teste.com.br",
  password = "123456",
}

const Home = () => {
  const { data } = useSession();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Um email válido é necessário")
      .required("Preencher o campo de email"),
    password: Yup.string().required("Preencher o campo de email"),
  });
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setEmail(values.email);

      try {
        if (
          CREDENTIALS.email === values.email &&
          CREDENTIALS.password === values.password
        ) {
          console.log("Logou");
        } else {
          setLoginError("Login/Senha inválidos");
        }
      } catch (error: any) {}
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  function handleForgotPassword() {
    setForgotPassword(!forgotPassword);
  }
  useEffect(() => {
    if (data || email === CREDENTIALS.email) {
      router.push({
        pathname: "/dashboard",
        query: { pid: email },
      });
    }
  }, [data, email]);

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <FormikProvider value={formik}>
        {forgotPassword ? (
          <ForgotPassword handlePassword={handleForgotPassword} />
        ) : (
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
                src={Logo}
                alt="Um C dourado, logo da cripto moeda"
                width={100}
                height={100}
              />

              <Typography variant="h3" sx={{ color: "gray" }}>
                Bem-vindo!
              </Typography>
            </Stack>

            <Stack
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

                    <Typography gutterBottom={false}>Lembrar-me</Typography>
                  </Stack>
                  <Button
                    onClick={() => handleForgotPassword()}
                    sx={{ color: "red", fontSize: 11, fontWeight: "bold" }}
                  >
                    Esqueci minha senha
                  </Button>
                </Stack>
                {loginError && (
                  <Typography sx={{ color: "red" }}>{loginError}</Typography>
                )}
                <Stack spacing={1} sx={{ alignItems: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: 60,
                      fontWeight: "bold",
                      color: "#4776ff",
                      backgroundColor: "#FFD700",
                      "&:hover": {
                        background: "#FFD700",
                      },
                    }}
                  >
                    Entrar
                  </Button>
                  <Button
                    onClick={() => signIn()}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: 60,
                      fontWeight: "bold",
                    }}
                  >
                    Logar com Google
                  </Button>
                </Stack>
              </Form>
            </Stack>
          </Box>
        )}
      </FormikProvider>
      <Stack
        sx={{
          width: "50%",
          position: "relative",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Image
          alt="Moeda dourada com um b no meio"
          src={Background}
          layout="fill"
          objectFit="cover"
        />
      </Stack>
    </Stack>
  );
};

export default Home;
