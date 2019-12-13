let Novel = require('../models/novels');
let express = require('express');
let router = express.Router();

router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Novel.find(function(err, novels) {
        if (err)
            res.send(err);

        res.json(novels)
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Novel.find({ "_id" : req.params.id },function(err, novel) {
        if (err)
            res.json({ message: 'Novel NOT Found!', errmsg : err } );
        else
            // res.send(JSON.stringify(novel,null,10));
            res.json(novel)
    });

}

router.addNovel = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var name = req.body.name;
    var author = req.body.author;
    var type = req.body.type;
    var recommender = req.body.recommender;

    if( name == ''){
        res.json({ message: 'The novel name can not be empty'} );
        return;
    }

    Novel.findOne({
        name:name
    },function (err, info) {
        if(info){
            res.json({ message: 'The novel is already exist',errmsg : err} );
            return;
        }
        var novel = new Novel({
            name: name,
            author: author,
            type:type,
            recommender:recommender
        });
        novel.save(function(err) {
            if (err)
                res.json({ message: 'Novel not added', errmsg : err } );
            else
                res.json({ message: 'Novel Successfully added', data: novel });
        });
    });
}

router.giveGrade = (req,res)=>{
    Novel.findById(req.params.id, function(err,novel) {
        if (err)
            res.json({ message: 'Novel NOT Found!', errmsg : err } );
        else {
            novel.grade = req.body.grade;
            novel.save(function (err) {
                if (err)
                    res.json({ message: 'Novel NOT graded!', errmsg : err } );
                else
                    res.json({ message: 'Novel Successfully graded!', data: novel });
            });
        }
    });
}
router.comment = (req,res)=>{
    Novel.findById(req.params.id, function(err,novel) {
        if (err)
            res.json({ message: 'Novel NOT Found!', errmsg : err } );
        else {
            novel.comment += " "+"#"+req.body.comment;
            novel.save(function (err) {
                if (err)
                    res.json({ message: 'Not Add comment', errmsg : err } );
                else
                    res.json({ message: 'Add comment Successfully!', data: novel });
            });
        }
    });
}
router.deleteNovel = (req, res) => {

    Novel.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Novels NOT Found!', errmsg : err } );
        else
            res.json({ message: 'Novels Successfully Deleted!'});
    });
}

module.exports = router;
