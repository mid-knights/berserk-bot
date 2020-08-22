import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import BerserkBot from './BerserkBot';

const app = express();
const bot = new BerserkBot();

app.listen(3000, () => {
  console.log("bot running!");
});