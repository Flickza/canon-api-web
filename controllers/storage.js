import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const creators = (req, res, next) => {
  try {
    var files = fs.readdirSync(process.env.CREATOR_PATH);
    res.send(files);
  } catch (err) {
    res.send(err);
  }
};

export const project = (req, res, next) => {
  try {
    const creator = req.params.creator.toUpperCase();
    var files = fs.readdirSync(process.env.CREATOR_PATH + creator);
    res.send(files);
  } catch (err) {
    res.send(err);
  }
};

export const new_project = (req, res, next) => {
  const dir = req.params.project.replace(/\W/, "").toUpperCase();
  const creator = req.params.creator.replace(/\W/, "").toUpperCase();
  const path = process.env.CREATOR_PATH + creator + "/" + dir;
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      res.status(200).send({ message: `New project: ${dir}, created for ${creator} successfully.` });
    } else {
      res.status(400).send({ message: `Project: ${dir}, already exists.` });
    }
  } catch (err) {
    res.status(400).send({ message: `${err}` });
  }
};
export const new_creator = (req, res, next) => {
  const creator = req.params.creator.replace(/\W/, "").toUpperCase();
  const path = process.env.CREATOR_PATH + creator;
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      res.status(200).send({ message: `Creator: ${creator}, created successfully.` });
    } else {
      res.status(400).send({ message: `Creator: ${creator}, already exists.` });
    }
  } catch (err) {
    res.status(400).send({ message: `${err}` });
  }
};
