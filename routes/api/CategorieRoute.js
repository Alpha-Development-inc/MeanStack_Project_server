const express = require('express');
const { check, validationResult } = require('express-validator');
let Categorie = require('../../models/Categorie');

const auth = require('../../middleware/auth');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categorie = await Categorie.find();
    res.send(categorie);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).send('categorie not found');
    }
    res.send(categorie);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/',auth,[
  
  check('header', 'header is required').not().isEmpty(),
  check('description', 'description min 10 char').isLength({
    min: 10,
  }),
],async (req, res) => {
  try {const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const newCategorie = new Categorie({
      user:req.user.id,
      header: req.body.header,
      description: req.body.description,
      image:req.body.image,
    });

    const result = await newCategorie.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/',auth, async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.body.id);
    if (!categorie) {
      return res.status(404).json({ msg: 'categorie not found' });
    }
    const result = await Categorie.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth,async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.body.id);
    if (!categorie) {
      return res.status(404).json({ msg: 'categorie not found' });
    }

    categorie.header = req.body.header;
    categorie.description = req.body.description;
    categorie.image = req.body.image;
    await categorie.save(1);
    res.send(categorie);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
