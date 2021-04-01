const express = require('express');
const { check, validationResult } = require('express-validator');
let AboutUs = require('../../models/AboutUs');

const auth = require('../../middleware/auth');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.send(aboutUs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) {
      return res.status(404).send('aboutUs not found');
    }
    res.send(aboutUs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/',auth,[
  
  check('history', 'history is required').not().isEmpty(),
  check('address', 'address min 3 char').isLength({
    min: 3,
  }),
],async (req, res) => {
  try {const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const newAboutUs = new AboutUs({
      history:req.body.history,
      address: req.body.address,
      description: req.body.description,
      email:req.body.email,
    });

    const result = await newAboutUs.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/',auth, async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.body.id);
    if (!aboutUs) {
      return res.status(404).json({ msg: 'aboutUs not found' });
    }
    const result = await AboutUs.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth,async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.body.id);
    if (!aboutUs) {
      return res.status(404).json({ msg: 'aboutUs not found' });
    }

    aboutUs.history = req.body.history;
    aboutUs.address = req.body.address;
    aboutUs.email = req.body.email;
    aboutUs.description = req.body.description;
    await aboutUs.save(1);
    res.send(aboutUs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
