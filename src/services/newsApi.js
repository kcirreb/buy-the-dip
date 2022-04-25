import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: NewsHeaders });

export const newsApi = createApi({
  reducerPath: "NewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
