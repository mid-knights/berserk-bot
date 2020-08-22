import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import BerserkBot from './domain/BerserkBot';

const app = express();
new BerserkBot();

app.listen(3000, () => {
  console.log('bot running!');
});
