import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { api } from "../src/services/api";

type ASSETS_RESPONSE = {
  Asset: "string";
  IsActive: boolean;
  AssetLong: "string";
};

export default function Dashboard() {
  const [assets, setAssets] = useState<ASSETS_RESPONSE[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  console.log(assets);

  useEffect(() => {
    async function getAssets() {
      try {
        const response = await api.get("/getassets");
        console.log(response.data.result);
        setAssets(response.data.result ?? []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getAssets();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 10,
      }}
    >
      <Typography variant="h2">Assets </Typography>

      {loading ? (
        <CircularProgress />
      ) : assets?.length > 0 ? (
        <TableContainer sx={{ width: { xs: "90%", md: "50%" } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">NOME</TableCell>
                <TableCell align="center">ABREVIAÇÃO</TableCell>
                <TableCell align="center">STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets?.map((asset, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell align="center">{asset.AssetLong}</TableCell>
                    <TableCell align="center">{asset.Asset}</TableCell>
                    <TableCell align="center">
                      {asset?.IsActive ? "Ativo" : "teste"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ color: "red" }}>
          Não possível carregar lista
        </Typography>
      )}
    </Container>
  );
}
