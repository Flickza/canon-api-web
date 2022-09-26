import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const get_identifier = (creator, project) => {
  return new Promise((resolve, reject) => {
    fs.readdir(process.env.CREATOR_PATH + creator + "/" + project, (err, result) => {
      if (result.length > 0) {
        var numbers = result.map((item) => item.split("_")[1].split(".")[0]);
        var highest_ID = Math.max(...numbers)
        return resolve(parseInt(highest_ID) + parseInt(1));
      } else {
        return resolve(1);
      }
    })
  });
};
