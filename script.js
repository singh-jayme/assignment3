const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovies1 = async () => {
  let movieBG= document.getElementById("movieBG");
  movieBG.innerHTML="";
  let filmSelect = document.getElementById("filmSelect")
  const movieData = await getData ("https://api.themoviedb.org/3/search/movie", {
  params: {
    api_key: "8d992bf093d92b23f2529662f9291664",
      query: filmSelect.value,
    }
  });

  if (movieData.data.results.length<1) {
    return;
  }
 
  let movie= movieData.data.results[0];
    const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
      params: {
        api_key: "8d992bf093d92b23f2529662f9291664",
        append_to_response: "videos",
      }
    });

    const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const iframe = document.createElement('iframe');

    h1.innerHTML = `${movie.title} -- ${movie.release_date}`;
    p.innerHTML = `${movie.overview} <br><br> Contains R18+ Content: ${movie.adult} <br> Popularity: ${movie.popularity} <br> Original Language: ${movie.original_language} <br> Average Rating: ${movie.vote_average} -- Based on: ${movie.vote_count} votes`;
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    iframe.src = `https://www.youtube.com/embed/${trailer}`;

    //DOM
    movieBG.append(h1)
    movieBG.append(p);
    movieBG.append(img);
    movieBG.append(iframe);
  }

;

getMovies1();