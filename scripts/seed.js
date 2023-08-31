// user can make many ratings
// a movie can have many ratings

// users -< ratings >- movies
// pk---------fk
//            fk---------pk
import lodash from 'lodash'
import { DATE } from "sequelize";
import { Movie, Rating, User, db } from "../src/model.js";
import movieData from "./data/movies.json" assert { type: "json" };

// windows users run SET client_encoding to 'UTF8' in psql

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

let usersToCreate = []
for (let i=0; i <= 10; i++) {
    usersToCreate.push(User.create({ email: `${i}@email.com`,password: i,
   }))
}

const usersInDB = await Promise.all(usersToCreate);
console.log(usersInDB);

const ratingsInDB = await Promise.all(
  usersInDB.flatMap((user) => {
    // Get ten random movies
    const randomMovies = lodash.sampleSize(moviesInDB, 10);

    // Create a rating for each movie
    const movieRatings = randomMovies.map((movie) => {
      return Rating.create({
        score: lodash.random(1, 5),
        userId: user.userId,
        movieId: movie.movieId,
      });
    });

    return movieRatings;
  }),
);

console.log(ratingsInDB);

// await Promise.all(moviesInDB); // alternative to promising 

await db.close();
console.log("Finished seeding database!");
