import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///ratings");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

export class Movie extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    posterPath: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "movie",
    sequelize: db,
  }
);

export class Rating extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Rating.init(

  {
    ratingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    score: {
      type:DataTypes.INTEGER,
    },
  },{
    sequelize:db,
    timestamps: true,
    updatedAt: false
  }
)

User.hasMany(Rating, {foreignKey: 'userId'})
Rating.belongsTo(User, {foreignKey: 'userId'})
Movie.hasMany(Rating, {foreignKey: 'movieId'})
Rating.belongsTo(Movie, {foreignKey: 'movieId'})

// const {User, db} = await import('./src/model.js');
// db.sync({force: true})
// > const testUser = await User.create({email: "test.email.com", password: 'test'});
