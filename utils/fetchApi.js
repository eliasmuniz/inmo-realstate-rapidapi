import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "8fd02347a4msh0f245fb33590284p1ac215jsn06568d2948a4",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data
};
