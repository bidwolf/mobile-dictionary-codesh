import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dictionaryapi.dev/api/v2/entries/en"
  }),
  endpoints: (builder) => ({
    getFonetics: builder.query<WordResponse[], string>({
      query: (word) => `/${word}`,
    })
  }),
  tagTypes: ["Word"],
})

export const { useGetFoneticsQuery } = wordApi

