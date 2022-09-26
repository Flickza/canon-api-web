import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const get_identifier = (creator, project) => {
  return new Promise((resolve, reject) => {
    fs.readdir(process.env.CREATOR_PATH + creator + "/" + project, (err, result) => {
      console.log(result);
      if (result.length > 0) {
        var last_identifier = result.at(-1).split("_")[1].split(".")[0];
        let next_identifier = parseInt(last_identifier) + parseInt(1);
        return resolve(next_identifier);
      } else {
        return resolve(1);
      }
    })
  });
};
