import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function ForgotPassword({ handlePassword }) {
  return (
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
        <Typography variant="h5" sx={{ color: "gray", textAlign: "center" }}>
          Digite seu email para receber nova senha!
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
        <TextField
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
            <Button
              onClick={() => handlePassword()}
              sx={{ color: "red", fontSize: 11, fontWeight: "bold" }}
            >
              Voltar
            </Button>
          </Stack>
          <Button sx={{ color: "red", fontSize: 11, fontWeight: "bold" }}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
