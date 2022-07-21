const Habit = require("../models/habit");

async function createHabit(req, res) {
  try {
    const habit = await Habit.createHabit(req.body);
    res.status(201).send({ habit });
  } catch (err) {
    res.status(500).json({ msg: "Habit could not be created!" });
  }
}

async function filterHabitsByEmail(req, res) {
  try {
    const habit = await Habit.filterHabitsByEmail(req.params);
    res.status(200).send(habit);
  } catch (err) {
    res.status(500).json({ msg: "Could not find habit for this user" });
  }
}

async function findHabitById(req, res) {
  try {
    const habit = await Habit.findHabitById(req.params);
    res.status(200).send(habit);
  } catch (err) {
    res.status(500).json({ msg: "Could not find habit by this id" });
  }
}

async function increaseRepCounter(req, res) {
  try {
    // const habit = await Habit.findHabitById(req.params)
    // console.log(habit)
    const result = await Habit.increaseRepCounter(req.params.id);
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ msg: "loser" });
  }
}

async function deleteHabit(req, res) {
  try {
    const habit = await Habit.deleteHabit(req.body.id);
    res.status(204).send("Deleted this habit");
  } catch (err) {
    res.status(500).send("loser");
  }
}

module.exports = {
  createHabit,
  filterHabitsByEmail,
  findHabitById,
  deleteHabit,
  increaseRepCounter,
};
