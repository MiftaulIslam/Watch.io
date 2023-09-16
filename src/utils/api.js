const baseURL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const header = {
  Authorization: 'Bearer ' + TMDB_TOKEN,
};

export const fetchDataFromAPI = async (URL, params) => {
  try {
    // Constructing the full URL by appending the base URL with the provided URL
    const fullURL = baseURL + URL;

    // Constructing the query parameters string from the 'params' object
    const queryParams = new URLSearchParams(params);

    // Constructing the complete URL with query parameters
    const completeURL = queryParams.toString()
      ? `${fullURL}?${queryParams.toString()}`
      : fullURL;

    // Fetching data using the Fetch API
    const response = await fetch(completeURL, {
      headers: header,
    });

    // Checking if the response is successful
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    // Parsing the response JSON
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
