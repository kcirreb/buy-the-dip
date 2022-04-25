import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import moment from "moment";

import { useGetNewsQuery } from "../services/newsApi";

const placeholder =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png";

const Img = styled("img")({
  width: "120px",
  height: "120px",
  borderRadius: "12px",
});

function shorten(str) {
  if (str.length <= 120) return str;
  return str.substr(0, str.lastIndexOf(" ", 120)) + " ...";
}

const News = () => {
  const { data, isFetching } = useGetNewsQuery({
    newsCategory: "Cryptocurrency",
    count: 10,
  });

  if (isFetching) return <></>;

  return (
    <>
      {data.value.map((news, i) => (
        <Grid item xs={12}>
          {i === 0 ? (
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              News
            </Typography>
          ) : (
            <></>
          )}
          <CardActionArea component="a" href={news.url}>
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                      sx={{ width: 20, height: 20 }}
                    />
                  }
                  title={news.provider[0]?.name}
                  sx={{ height: 32, pl: 0 }}
                />
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{ fontSize: 20 }}
                  gutterBottom
                >
                  {news.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {shorten(news.description)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 12 }}
                >
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Img src={news?.image?.thumbnail?.contentUrl || placeholder} />
              </Box>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </>
  );
};

export default News;
