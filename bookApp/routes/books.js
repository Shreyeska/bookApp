var express = require('express');
var router = express.Router();
var books = require('../resources/books');

router.get('/add', function(req, res, next) {
  res.render('addBooks', { title: 'Add Books' });
});

router.post('/save', function(req, res, next){
    books.push({...req.body, _id:`00${books.length + 1}`})
    res.redirect('/')
})
router.get('/edit/:_id', function(req, res, next){
    const book = books.find((book)=>book._id === req.params._id)
    res.render('editBooks', {title: "Edit Books", book})
  })
  router.get('/delete/:_id', function(req, res, next) {
    const delIndex = books.findIndex((book) => book._id === req.params._id);
    if (delIndex !== -1) {
        books.splice(delIndex, 1);
        console.log(`Book with _id ${req.params._id} deleted`);
    } else { console.log(`Book with _id ${req.params._id} not found`); }

    res.redirect('/');
  });

  router.post('/saveEdited/:_id', function (req, res, next){
    const currIndex = books.findIndex((book) => book._id === req.params._id)
    books.splice(currIndex, 1, {...req.body, _id:req.params._id})
    res.redirect('/')
  })
  /*
  router.post('/saveDelete/:_id', function (req, res, next){
    const currIndex = books.findIndex((book) => book._id === req.params._id)
    
    res.redirect('/')
  })

  */
module.exports = router;
