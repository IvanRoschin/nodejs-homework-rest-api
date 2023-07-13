const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { contactsRouter } = require("./src/routes/api/contactsRouter");
const { authRouter } = require("./src/routes/api/authRouter");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// const json = require("./file.json");

// const array = json.map((item) => JSON.stringify(item));
// const parsedArray = array.map((item) => JSON.parse(item));
// console.log(parsedArray.map((item) => console.log(delete item.uuid)));
// console.log(parsedArray);

// const arrayOne = parsedArray.map((item) => {
//   delete item.created_at;
//   return item;
// });
// const arrayTwo = arrayOne.map((item) => {
//   delete item.updated_at;
//   return item;
// });
// const arrayThree = arrayTwo.map((item) => {
//   delete item.meta;
//   return item;
// });

// const arrayFour = arrayThree.map((item) => {
//   delete item.koatuu;
//   return item;
// });

// const arrayFive = arrayFour.map((item) => {
//   delete item.id;
//   return item;
// });

// const arraySix = arrayFive.map((item) => {
//   delete item.lng;
//   return item;
// });

// const arraySeven = arraySix.map((item) => {
//   delete item.lat;
//   return item;
// });

// const arrayEight = arraySeven.map((item) => {
//   delete item.katottg;
//   return item;
// });

// const arrayNine = arrayEight.map((item) => {
//   delete item.parent_id;
//   return item;
// });

// const arrayTen = arrayNine.map((item) => {
//   delete item.post_code;
//   return item;
// });

// const res = JSON.stringify(arrayTen);
// console.log("res", res);

// const fs = require("fs");
// const data = res;

// fs.writeFile("city.json", data, (err) => {
//   if (err) throw err;
//   console.log("Файл успешно создан!");
// });

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
