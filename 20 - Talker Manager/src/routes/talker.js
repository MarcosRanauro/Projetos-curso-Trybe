const express = require('express');
const { getAllTalkers, talkerWrite, talkerUpdate, getTalkerId } = require('../utils/fs');
const auth = require('../middlewares/auth');
const nameValidate = require('../middlewares/nameValidate');
const ageValidate = require('../middlewares/ageValidate');
const talkValidate = require('../middlewares/talkValidate');
const rateValidate = require('../middlewares/rateValidate');
const watchedAtValidate = require('../middlewares/watchedAtValidate');

const talker = express.Router();

talker.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).json(talkers);
});

talker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getAllTalkers();

  const talkerId = talkers.find((talk) => talk.id === Number(id));
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talker.post('/',
  auth,
  nameValidate, ageValidate, talkValidate, rateValidate, watchedAtValidate, async (req, res) => {
  const talkers = req.body;
  const newTalker = await talkerWrite(talkers);
  res.status(201).json(newTalker);
});

talker.put('/:id', auth,
  nameValidate, ageValidate, talkValidate, rateValidate, watchedAtValidate, async (req, res) => {
  const { id } = req.params;
  const talkersId = await getTalkerId(id);
  if (!talkersId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const { name, age, talk } = req.body;
  const talkers = await getAllTalkers();
  const talkerIndex = talkers.findIndex((talkerId) => talkerId.id === Number(id));
  talkers[talkerIndex] = { id: Number(id), name, age, talk };
  await talkerUpdate(talkers);
  res.status(200).json(talkers[talkerIndex]);
});

talker.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const talkers = await getAllTalkers();
  const talkersFilter = talkers.filter((talkerId) => talkerId.id !== Number(id));
  await talkerUpdate(talkersFilter);
  res.status(204).end();
});

module.exports = talker;