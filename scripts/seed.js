// user can make many ratings
// a movie can have many ratings

// users -< ratings >- movies
// pk---------fk
//            fk---------pk

import { DATE } from "sequelize";
import { Movie, Rating, User, db } from "../src/model.js";
import movieData from "./data/movies.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding Database...");

const moviesInDB = await Promise.all( // prevents code progressing past this point until the promises are fulfilled.
  movieData.map( (movie) => {
    const newMovie = Movie.create({
      title: movie.title,
      overview: movie.overview,
      releaseDate: new Date(Date.parse(movie.releaseDate)),
      posterPath: movie.posterPath,
    });
    return newMovie;
  })
);

console.log(moviesInDB);

// await Promise.all(moviesInDB); // alternative to promising 

await db.close();
console.log("Finished seeding database!");
