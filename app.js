import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import ctrl from './controller.js'
const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));
const loginRequired = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

app.get('/api/movies', ctrl.show)
app.get(`/api/movies/:id`, ctrl.getOne)
app.get('/api/ratings', loginRequired, ctrl.ratings)
app.post(`/api/auth`, ctrl.login)
app.post(`/api/logout`, ctrl.logout)
app.post(`/api/ratings`, loginRequired, ctrl.addRating)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
