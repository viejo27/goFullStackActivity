const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const Recipe = require('./models/recipe');

const mongoose = require('mongoose');

mongoose.connect('mongodb://el_viejo27:mLlUby6ZOIsmqCq8@cluster27-shard-00-00-wbshw.mongodb.net:27017,cluster27-shard-00-01-wbshw.mongodb.net:27017,cluster27-shard-00-02-wbshw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster27-shard-0&authSource=admin&retryWrites=true')
  .then(() => {
    console.log('Succesfully conected to MongdoDB Atlas!!!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!!!');
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    title: req.body.title
  });
  recipe.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  }).then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    title: req.body.title
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(
    () => {
      res.status(201).json({
        message: 'Recipe updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.use('/api/recipes', (req, res, next) => {
  Recipe.find().then(
    (recipes) => {
      res.status(200).json(recipes);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.use((req, res, next) => {
  console.log('abrieron la página papá!!!');
  res.end('Hello World');
  next();
});

module.exports = app;
