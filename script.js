const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};  

const getMovies1 = async () => {
  let datatag = document.getElementById("datatag");
  let selectedMovie = document.getElementById("movieSelect");
  const movieData = await getData("https://api.themoviedb.org/3/movie/", {
    params: {
      api_key: "8d992bf093d92b23f2529662f9291664",
      query: movieSelect.value,
    }
  });

    let movie = movieData.data.results[0];
    const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
      params: {
        api_key: "8d992bf093d92b23f2529662f9291664",
        append_to_response: "videos",
      }
    });

    movieData.data.results.forEach(async (movie) => {
      const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "ad891932e4907c23fc8a99002a4b5d3f",
          append_to_response: "videos",
        }
      });
  
      const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
      const p = document.createElement('p');
      const img = document.createElement('img');
      const iframe = document.createElement('iframe');
  
      p.innerHTML = `${movie.title} -- ${movie.release_date} -- ${movie.popularity}`;
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      iframe.src = `https://www.youtube.com/embed/${trailer}`
  
      document.body.append(p);
      document.body.append(img);
      document.body.append(iframe);
    });
  };

  getMovies1();