import axios from "axios";

const apiChicago = "https://api.artic.edu/api/v1/artworks/";
const apiChicagoFields = "&fields=id,image_id,title,description";
const apiRijksmuseum = "https://www.rijksmuseum.nl/api/en/collection";
const apiRijksmuseumKey = import.meta.env.VITE_API_KEY 
const apiRijksmuseumFields = "&culture=en&imgonly=true&s=relevance";

export const countAll = () => {
  const RijksmuseumPromise = axios
    .get(`${apiRijksmuseum}?key=${apiRijksmuseumKey}`)
    .then((res) => {
      return res.data.count;
    });

  const ChicagoPromise = axios.get(apiChicago).then((res) => {
    return res.data.pagination.total;
  });

  return Promise.all([ChicagoPromise, RijksmuseumPromise]).then((values) => {
    return values[0] + values[1];
  });
};

export const getChicago = (searchquery, page, limit) => {
  if (searchquery === "") {
  } else {
    return axios
      .get(
        `${apiChicago}search?q=${searchquery}&page=${page}&limit=${limit}${apiChicagoFields}`
      )
      .then((res) => {
        return res.data;
      });
  }
};

export const getRijksmuseum = (searchquery, page, limit) => {
  if (searchquery === "") {
  } else {
    return axios
      .get(
        `${apiRijksmuseum}?key=${apiRijksmuseumKey}&q=${searchquery}&p=${page}&ps=${limit}${apiRijksmuseumFields}`
      )
      .then((res) => {
        return res.data;
      });
  }
};
