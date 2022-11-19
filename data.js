const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "911d6df8c8mshac89478e0372b05p1f1015jsn82880a20a4e2",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
const getMusicData = async () => {
  const music = await fetch(
    "https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&offset=0&limit=5",
    options
  );
  return music.json();
};
