import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const projectExists = (creator, project) => {
    const path = process.env.CREATOR_PATH + creator + '/' + project;
    console.log(path);
    return fs.existsSync(path);
}