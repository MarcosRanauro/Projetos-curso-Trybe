const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

const getAllTalkers = async () => {
  try {
    const data = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const talkerWrite = async ({ name, age, talk }) => {
  const data = await getAllTalkers();
  const newTalker = {
    id: data.length + 1,
    name,
    age,
    talk,
  };
  data.push(newTalker);
  const contentJson = JSON.stringify(data);
  await fs.writeFile(join(__dirname, path), contentJson);
  return newTalker;
};

const getTalkerId = async (id) => {
  const data = await getAllTalkers();
  return data.find((talker) => talker.id === Number(id));
};

const talkerUpdate = async (talkers) => {
  await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
};

module.exports = { getAllTalkers, talkerWrite, talkerUpdate, getTalkerId };