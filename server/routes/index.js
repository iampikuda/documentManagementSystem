import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => res
    .status(200)
    .send({ message: 'Welcome To Pk Document Management System....Enjoy!' }));

module.exports = () => router;
