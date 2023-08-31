import { Movie, User, db } from "./src/model.js";

const serverFunctions = {
  show: async (req, res) => {
    res.send(await Movie.findAll());
  },
  getOne: async (req, res) => {
    res.json(await Movie.findByPk(req.params.id));
  },
  login: async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.password != req.body.password) {
      res.json({ success: false });
      return;
    }
    req.session.userId = user.userId;
    res.json(req.session);
  },
  logout: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ error: `no user is logged in` });
      return;
    }
    const user = await User.findByPk(req.session.userId);
    req.session.destroy();
    res.status(200).json({ status: `User ${user.email} logged out` });
  },
  ratings: async (req, res) => {
    const { userId } = req.session;
    const ratings = await User.findByPk(userId).then((user) =>
      user.getRatings({ include: Movie })
      // user.getRatings({ include: { model: Movie, attributes: ["title"] } })//, 
    );// eager loaded with include
    res.json(ratings);
  },
  addRating: async (req, res) => {
    const { userId } = req.session;
    const { movieId, score } = req.body;
    const rating = await User.findByPk(userId).then((user)=>user.createRating({ movieId: movieId, score: score }));
    res.json(rating);
  },
};

export default serverFunctions;
