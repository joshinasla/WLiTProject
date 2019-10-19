var express = require('express');
var Movies=require("../models/movies")
var router = express.Router();
var data={
  name: "the fault in our stars",
  cast: "Shailene Woodley, Ansel Elgort",
  genre: "Drama/Comedy",
  description: "Hazel Grace Lancaster (Shailene Woodley), a 16-year-old cancer patient, meets and falls in love with Gus Waters (Ansel Elgort), a similarly afflicted teen from her cancer support group. Hazel feels that Gus really understands her. They both share the same acerbic wit and a love of books, especially Grace's touchstone, 'An Imperial Affliction' by Peter Van Houten. When Gus scores an invitation to meet the reclusive author, he and Hazel embark on the adventure of their brief lives.",
  id: "0"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wlit', fellow: { name:'Nasla'} });
});

router.get('/movies', function(req, res, next) {
//  res.render('movie',data);
Movies.find().exec(function(err,movies){//schema  bata mongo ko function find then execute gareko and yo movies view ma pathaune
  console.log('movies.....',movies)//movies is mongodb bata find bhayera ako 
  res.render('viewMovies', {movies})
})
});

router.get('/addmovies', function (req, res, next) {
  
  res.render('addmovies');
 
});

router.post('/addmovies', function (req, res, next){
  console.log(req.body)
  var movie= new Movies({
    name : req.body.name,
    cast : req.body.cast,
    genre: req.body.genre,
    description: req.body.description
  })
  var promise= movie.save()
  promise.then((movie) => {
    console.log("movie saved",movie)
    return res.redirect('/movies');
  })
  
});

router.get('/viewone', function (req, res, next) {
  res.render('viewone',{movie});
})

router.get("/movies/:_id",function(req ,res, next){
  Movies.findOne({_id: req.params._id}, function(err, movie){
    console.log('movie selected.....',movie)
   res.render('viewone',{movie})
  })
})

router.get('/viewone/:_id', function(req,res,next){
  Movies.deleteOne({_id: req.params._id}, function(err, movie){
    console.log('movie deleted.....',movie)
    res.redirect('/movies');
  })
})
router.get("/update/:_id", function (req, res, next) {
  Movies.findOne({ _id: req.params._id }, function (err, movie) {
    console.log('movie selected.....', movie)
    res.render('updatemovie', {movie})
  })
})
router.post("/update", function (req, res, next) {
  Movies.findOneAndUpdate({ _id: req.body._id },{ $set: req.body},function (err, movie) {
    console.log('movie selected.....', movie)
    res.redirect('/movies');
  })
})



module.exports = router;
