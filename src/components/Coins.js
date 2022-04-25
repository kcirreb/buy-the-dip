import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Coins = () => {
  const { data, isFetching } = useGetCryptosQuery(20);
  const cryptos = data?.data?.coins;

  if (isFetching) return <></>;

  return (
    <Grid item xs={12}>
      <Grid item>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Top Cryptos
        </Typography>
      </Grid>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 32 }}>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h</TableCell>
              <TableCell align="right">Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos.map((crypto) => (
              <TableRow hover>
                <TableCell sx={{ width: 32 }}>{crypto.rank}</TableCell>
                <TableCell>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={crypto.iconUrl}
                        sx={{ width: 20, height: 20 }}
                      />
                    }
                    title={crypto.name}
                    sx={{ height: 32, pl: 0 }}
                  />
                </TableCell>
                <TableCell align="right">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  }).format(crypto.price)}
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="inherit"
                    sx={{ color: crypto.change < 0 ? "red" : "green" }}
                  >
                    {Intl.NumberFormat("en-US", {
                      signDisplay: "exceptZero",
                      minimumFractionDigits: 2,
                    }).format(crypto.change)}
                    %
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  $
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 2,
                  }).format(crypto.marketCap)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

export default Coins;
