const express = require('express')
require('dotenv').config();
const Admin = require('../models/Admin')
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

router.get("/",(req,res) => {
    res.send("get all admins")
})

router.post("/signup", async(req,res) => {
    const {username,email,password} = req.body;

    try{
        const existingAdmin = await Admin.findOne({ where: { username } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail = await Admin.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newAdmin = await Admin.create({
            username,
            email,
            password
        });

        const token = jwt.sign({id: newAdmin.aid, username: newAdmin.username},JWT_SECRET)

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post("/signin", async (req,res) => {
    const {username,password} = req.body;

    try{
        const admin = await Admin.findOne({where: {username}})
        if(!admin){
            return res.status(400).json({message: "Admin not found"})
        }
        if(admin.password !== password){
            return res.status(401).json({msg: "Invalid credentials"})
        }

        const token = jwt.sign({id: admin.aid,username:admin.username},JWT_SECRET)

        res.status(200).json({ token });

    }catch(error){
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/', (req, res) => {
    res.send('Create a new admin');
});

module.exports = router