import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useGetCryptosQuery } from "../services/cryptoApi";

function preventDefault(event) {
  event.preventDefault();
}

const Stats = () => {
  const { data, isFetching } = useGetCryptosQuery(1);
  const cards = [
    {
      title: "Cryptos",
      data: Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(data?.data?.stats.total),
    },
    {
      title: "Exchanges",
      data: Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(data?.data?.stats.totalExchanges),
    },
    {
      title: "Market Cap",
      data:
        "$" +
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(data?.data?.stats.totalMarketCap),
    },
    {
      title: "24h Volume",
      data:
        "$" +
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(data?.data?.stats.total24hVolume),
    },
  ];

  if (isFetching) return <></>;

  return (
    <>
      {cards.map((card) => (
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 120,
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {card.title}
            </Typography>
            <Typography component="p" variant="h4">
              {card.data}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

export default Stats;
