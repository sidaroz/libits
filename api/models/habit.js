const db = require("../db_config/config");
const dayjs = require("dayjs");
class Habit {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.habit_id = data.habit_id;
    this.repetition = data.repetition;
    this.cur_repetition = data.cur_repetition;
    this.streak = data.streak;
    this.frequency = data.frequency;
    this.date_now = dayjs();
  }

  //   static get all() {
  //     return new Promise(async (res, rej) => {
  //       try {
  //         let result = await db.run(SQL`SELECT * FROM habits;`);
  //         let habits = result.rows.map((r) => new Habit(r));
  //         res(habits);
  //       } catch (err) {
  //         rej(`Could not retrieve habits`);
  //       }
  //     });
  //   }

  static createHabit(data) {
    return new Promise(async (res, rej) => {
      try {
        let { email, habit_id, repetition, cur_repetition, streak, frequency } =
          data;
        const totalRepetition = +repetition;
        const currentRepetition = +cur_repetition;
        const actualStreak = +streak;
        const dateNow = dayjs();
        let result = await db.query(
          `INSERT INTO habits (email, habit_id, repetition, cur_repetition, streak, frequency, date_now) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
          [
            email,
            habit_id,
            totalRepetition,
            currentRepetition,
            actualStreak,
            frequency,
            dateNow,
          ]
        );
        let habit = new Habit(result.rows[0]);
        res(habit);
      } catch (err) {
        rej("Error creating habit!");
      }
    });
  }

  static filterHabitsByEmail(data) {
    return new Promise(async (res, rej) => {
      try {
        const { email } = data;
        let result = await db.query(
          `SELECT * FROM habits WHERE email = $1 ORDER BY id DESC;`,
          [email]
        );
        let habits = result.rows;
        res(habits);
      } catch (err) {
        rej("Could not receive this users habits");
      }
    });
  }

  static findHabitById(id) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM habits WHERE id = $1;`, [
          id,
        ]);
        if (result.rowCount === 0) throw new Error("Habit not found");
        let habit = result.rows[0];
        res(habit);
      } catch (err) {
        rej("Could not find habit with that id");
      }
    });
  }

  static increaseRepCounter(id) {
    return new Promise(async (res, rej) => {
      try {
        const findHabit = await Habit.findHabitById(id);
        const dateCreated = findHabit.date_now;
        const actualDateCreated = dateCreated.replaceAll('"', "");
        let dateNow = dayjs();
        if (
          findHabit.frequency === "Daily" &&
          findHabit.repetition - findHabit.cur_repetition === 1 &&
          (dateNow.diff(actualDateCreated, "day") <= 1 ||
            dateNow.diff(actualDateCreated, "day") === 0)
        ) {
          const increaseStreak = await db.query(
            `UPDATE habits set streak = streak+1 WHERE id=$1;`,
            [id]
          );
          const increaseCount = await db.query(
            `UPDATE habits SET cur_repetition = cur_repetition+1 WHERE id =$1;`,
            [id]
          );
          res("Daily streak gone up");
        } else if (
          findHabit.frequency === "Weekly" &&
          findHabit.repetition - findHabit.cur_repetition === 1 &&
          (dateNow.diff(actualDateCreated, "week") <= 1 ||
            dateNow.diff(actualDateCreated, "week") === 0)
        ) {
          const increaseStreak = await db.query(
            `UPDATE habits set streak = streak+1 WHERE id=$1;`,
            [id]
          );
          const increaseCount = await db.query(
            `UPDATE habits SET cur_repetition = cur_repetition+1 WHERE id =$1;`,
            [id]
          );
          res("Weekly streak gone up");
        } else if (
          findHabit.frequency === "Monthly" &&
          findHabit.repetition - findHabit.cur_repetition === 1 &&
          (dateNow.diff(actualDateCreated, "month") <= 1 ||
            dateNow.diff(actualDateCreated, "month") === 0)
        ) {
          const increaseStreak = await db.query(
            `UPDATE habits set streak = streak+1 WHERE id=$1;`,
            [id]
          );
          const increaseCount = await db.query(
            `UPDATE habits SET cur_repetition = cur_repetition+1 WHERE id =$1;`,
            [id]
          );
          res("Monthly streak gone up");
        } else if (
          findHabit.frequency === "Yearly" &&
          findHabit.repetition - findHabit.cur_repetition === 1 &&
          (dateNow.diff(actualDateCreated, "year") <= 1 ||
            dateNow.diff(actualDateCreated, "year") === 0)
        ) {
          const increaseStreak = await db.query(
            `UPDATE habits set streak = streak+1 WHERE id=$1;`,
            [id]
          );
          const increaseCount = await db.query(
            `UPDATE habits SET cur_repetition = cur_repetition+1 WHERE id =$1;`,
            [id]
          );
          res("Yearly streak gone up");
        } else if (findHabit.repetition === findHabit.cur_repetition) {
          const resetRep = await db.query(
            `UPDATE habits set cur_repetition = 0 WHERE id=$1;`,
            [id]
          );
          res("counter gone to zero");
        } else {
          const increaseCount = await db.query(
            `UPDATE habits SET cur_repetition = cur_repetition+1 WHERE id =$1;`,
            [id]
          );
          res("Counter succesfully increased");
        }
      } catch (err) {
        rej("Failed to update the counter in the database");
      }
    });
  }

  static deleteHabit(id) {
    return new Promise(async (res, rej) => {
      try {
        const result = await db.query(`DELETE FROM habits WHERE id = $1;`, [
          id,
        ]);
        res("Habit was deleted");
      } catch (error) {
        rej("Habit could not be deleted");
      }
    });
  }
}

module.exports = Habit;

// const dayOfYear = require("dayjs/plugin/dayOfYear");
// dayjs().format();
// // const day = dayjs.extend(duration);
// // const randomNum = dayjs().add(dayjs.duration({ days: 1 }));
// console.log(typeof parseInt(dayjs().add(1, "day").format("DD")));
// console.log(dayjs().format("DD"));
// console.log(typeof +dayjs().format("DD"));
// console.log(typeof new Date().getDate());
// console.log(dayjs().format("YYYY/MM/DD"));
// const yday = dayjs();
// const today = dayjs();
// const difference = today.diff(yday, "day");
// console.log(difference);
