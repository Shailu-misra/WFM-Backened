var express = require('express');
const User = require("../models/User");
const UserTP = require('../models/UserTP');

var router = express.Router();
const bcrypt = require("bcrypt");

// Get all users
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

// User login
router.post('/login', async function(req, res, next) {
  try {
    console.log(req.body)
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;
    const user = await User.findOne({phoneNumber});
    console.log(user)

    // Check if user exists or not
    if(!user) {
      res.status(401).json({ message: "User not found" });
    }
    else {
      //Check password correctness
      /*
      const validPassword = await bcrypt.compare(password, user.password);
      if(validPassword) {
        res.status(200).json(user);
      }
      else {
        res.status(400).json({ message: "Password incorrect" });
      }
      */
      if(password == user.password) {
        res.status(200).json(user);
      }
      else {
        res.status(400).json({ message: "Password incorrect" });
      }
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

// User signup
router.post('/signup', async function(req, res, next) {
  try {
    let newUserJSON = req.body;
    const userAlready = await User.findOne({email: newUserJSON.email});
    //Check whether user already exists with same email or not
    if(userAlready) {
      res.status(400).json({ message: "User already exists with same email" });
    }
    else {
      let user = new User(newUserJSON);

      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);

      
      user.save().then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(400).json({ message: "User not created" });
      });
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

// Line man creation
router.post('/addLineMan', async function(req, res, next) {
  try {
    let newUserJSON = req.body;
    const userAlready = await UserTP.findOne({aadharNumber: newUserJSON.aadharNumber});
    //Check whether user already exists with same aadhar number or not
    if(userAlready) {
      res.status(400).json({ message: "User already exists with same aadhar number" });
    }
    else {
      let user = new UserTP(newUserJSON);

      console.log(user);
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);

      
      user.save().then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(400).json({ message: "User not created" });
      });
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});


//Update Lineman details by ID Method
router.patch('/updateLineMan/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = {new: true};

    const result = await UserTP.findByIdAndUpdate(id, updatedData, options);
    res.status(200, result)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

//Delete lineman by ID Method
router.post('/deleteLineMan', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;

    const user = await UserTP.findOne({phoneNumber});
    console.log(user)

    // Check if user exists or not
    if(!user) {
      res.status(401).json({ message: "User not found" });
    }
    else {
      const updatedData = {status: "INACTIVE"};
      const options = {new: true};

      const result = await UserTP.findByIdAndUpdate(user.id, updatedData, options);
      res.status(200).json(result)
    }    
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})


module.exports = router;
