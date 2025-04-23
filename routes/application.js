const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const UserData=require('../models/UserData')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleWare=require('../Authmid/AuthMiddleWare')

/*router.post('/register',async (req,res)=>{
  const userinfo=new UserData(req.body)
  const saved=await userinfo.save()
  res.status(200).json(saved)
})*/
router.post('/register', async (req, res) => {
  const { name,mail, password } = req.body;
  const existingUser = await UserData.findOne({ mail });
  if (existingUser) 
    {
      console.log("user already present");
      
      return res.status(400).json({ message: 'User already exists' });
}

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserData({ name,mail, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered' });
});
/*router.post("/login",async (req,res)=>{
  
  const user = await UserData.findOne({ mail:req.body.mail });
  if(user)
  {
    console.log("the user found was",user)
  }
  res.status(200).json(user)
  
})*/
router.get('/verify',middleWare,(req,res)=>{
  res.status(200).json({ message: 'Access granted!'});

})
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;
  const user = await UserData.findOne({ mail });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const userkey=user._id
  const alljobs=await Application.find({userkey:userkey})
  console.log(alljobs)
  res.status(200).json({ tokenid:token,userval:userkey,jobs:alljobs});
});
router.post('/', async (req, res) => {
    
  const newApp = new Application(req.body);
  const saved = await newApp.save();
  res.status(201).json(saved);
});

// Get All
router.get('/', async (req, res) => {
  const apps = await Application.find({userkey:req.query.id});
  
  res.json(apps);
});


router.put('/:id', async (req, res) => {
    console.log("update")
  const updated = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
    console.log("delete")
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted'});
});

module.exports = router;
