import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};
  console.log(path);
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/img");
    options.keepExtensions = true;
    options.filename = (name, ext, path, form) => {
      return `${name}${ext}`;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/img"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/img"));
  }
  await readFile(req, true);
  res.json({ done: "ok" });
};

export default handler;
