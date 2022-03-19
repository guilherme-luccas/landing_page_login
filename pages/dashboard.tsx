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
import AssetItem from "../src/components/AssetItem";
import { api } from "../src/services/api";

type ASSETS_RESPONSE = {
  Asset: "string";
  IsActive: boolean;
  AssetLong: "string";
};

export default function Dashboard() {
  const [assets, setAssets] = useState<ASSETS_RESPONSE[]>();
  const theme = useTheme();
  console.log(assets);

  useEffect(() => {
    async function getAssets() {
      try {
        const response = await api.get("/getassets");
        console.log(response.data.result);
        setAssets(response.data.result);
      } catch (e) {
        console.log(e);
      } finally {
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
            {assets?.map((asset) => {
              console.log("asset", asset);

              return (
                <TableRow>
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
      {/* {assets?.map((item) => (
        <AssetItem data={item} />
      ))} */}
    </Container>
  );
}
