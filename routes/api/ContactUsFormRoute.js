const express = require('express');
const { check, validationResult } = require('express-validator');
let ContactUs = require('../../models/ContactUsForm');

const auth = require('../../middleware/auth');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contactUs = await ContactUs.find();
    res.send(contactUs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contactUs = await ContactUs.findById(req.params.id);
    if (!contactUs) {
      return res.status(404).send('contactUs not found');
    }
    res.send(contactUs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/',[
  
  check('email', 'email is required').not().isEmpty(),
  check('message', 'message min 10 char').isLength({
    min: 10,
  }),
],async (req, res) => {
  try {const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const newContactUs = new ContactUs({
      message: req.body.message,
      email: req.body.email
    });

    const result = await newContactUs.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/',auth, async (req, res) => {
  try {
    const contactUs = await ContactUs.findById(req.body.id);
    if (!contactUs) {
      return res.status(404).json({ msg: 'contactUs not found' });
    }
    const result = await ContactUs.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth,async (req, res) => {
  try {
    const contactUs = await ContactUs.findById(req.body.id);
    if (!contactUs) {
      return res.status(404).json({ msg: 'contactUs not found' });
    }

    contactUs.email = req.body.email;
    contactUs.message = req.body.message;
    
    await contactUs.save(1);
    res.send(contactUs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
