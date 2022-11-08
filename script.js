const getData = async (url, params) => {
    try {
      return await axios.get(url, params);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getMovies1 = async () => {
    const movieData = await getData("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "c5fef910d2ea5972567a21b1d26d52ff",
        query: "batman"
      }
    });
  
    for (let movie of movieData.data.results) {
      const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "c5fef910d2ea5972567a21b1d26d52ff",
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
    }
  };
  
  const getMovies2 = async () => {
    const movieData = await getData("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "c5fef910d2ea5972567a21b1d26d52ff",
        query: "batman",
      }
    });
  
    movieData.data.results.forEach(async (movie) => {
      const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "c5fef910d2ea5972567a21b1d26d52ff",
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
  getMovies2();