// // ----------------------------- REQUIRE -----------------------------
// const mongoose = require('mongoose');
// const User = require('../models/users');

// // ----------------------------- REGISTER -----------------------------
// const register = (req, res) => {
//     const { name, email, password, createdAt } = req.body;

//     // Validate required fields
//     if (!name || !email || !password) {
//         return res
//             .status(400)
//             .json({ message: 'name, email, password are required' });
//     }

//     // Create new user document
//     const newUser = new User({
//         name,
//         phone,
//         address,
//         email,
//         password
//     });

//     // Save user using Promises
//     newUser
//         .save()
//         .then((savedUser) => {
//             res.status(201).json({
//                 status: 'success',
//                 action: 'register',
//                 data: {
//                     _id: savedUser._id,
//                     name: savedUser.name,
//                     phone: savedUser.phone,
//                     address: savedUser.address,
//                     email: savedUser.email
//                 }
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Failed to register user',
//                 error: error.message
//             });
//         });
// };

// // ----------------------------- LOGIN -----------------------------
// const login = (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res
//             .status(400)
//             .json({ message: 'email and password are required' });
//     }

//     // Check user by email and password
//     User.findOne({ email, password })
//         .then((user) => {
//             if (!user) {
//                 return res.status(401).json({
//                     status: 'error',
//                     message: 'Invalid email or password'
//                 });
//             }

//             res.status(200).json({
//                 status: 'success',
//                 action: 'login',
//                 data: {
//                     _id: user._id,
//                     name: user.name,
//                     email: user.email
//                 }
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 status: 'error',
//                 message: 'Login failed',
//                 error: error.message
//             });
//         });
// };

// // ----------------------------- EXPORTS -----------------------------
// module.exports = { register, login };


// ----------------------------- register -----------------------------
const register = (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password){
        return res
            .status(400)
            .json({ message: 'name, email, password are required' });
    }

    res
        .status(201)
        .json({
            status: 'success',
            action: 'register',
            data: { name, email, phone, address }
        });
};

// ----------------------------- login -----------------------------
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        return res
            .status(400)
            .json({ message: 'email and password are required'});
    }

    res
        .status(200)
        .json({
            status: 'success',
            action: 'login',
            data: { email }
        });
};

// ----------------------------- EXPORTS -----------------------------
module.exports = { register, login };
