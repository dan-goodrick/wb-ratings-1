import { Movie, User } from "./src/model.js";

const serverFunctions = {
  show: async (req, res) => {
    const movies = await Movie.findAll();
    console.log(await Movie.findAll());
    res.json(movies);
  },
  getOne: async (req, res) => {
    console.log(req.params);
    const movie = await Movie.findByPk(req.params.id);
    res.json(movie);
  },
  login: async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user && user.password === password) {
      req.session.userId = user.userId;
      console.log(`${user.userId} is logged in`);
      res.json({ success: true });
    } else {
      console.log(`Unable to authenticate ${user.userId}`);
      res.json({ success: false });
    }
  },
  logout: (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      req.session.destroy();
      res.json({ success: true });
    }
  },
  // TODO: doesn't complete
  ratings: async (req, res) => {
    const { userId } = req.session;
    const user = await User.findByPk(userId);
    const ratings = await user.getRatings({
      include: {
        model: Movie,
        attributes: ["title"],
      },
    });
    res.json(ratings);
  },
  // Returns an error
  addRating: async (req, res) => {
    const { userId } = req.session;
    const { movieId, score } = req.body;

    const user = await User.findByPk(userId);
    const rating = await user.createRating({
      movieId: movieId,
      score: score,
    });
    res.json(rating);
  },
};

export default serverFunctions;
