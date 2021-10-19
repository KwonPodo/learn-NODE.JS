const process = require("process");
const path = require("path");
const fs = require("fs");

const paths = {};
const extensions = {
  video: [".mov", ".mp4"],
  captured: [".png", ".aae"],
  duplicated: [".jpg"],
};

// Using the passed argv to make working directory path
paths["working_dir_path"] = path.join(
  path.dirname(__filename),
  `/${process.argv[2]}`
);
paths["video_path"] = path.join(paths.working_dir_path, "/video");
paths["captured_path"] = path.join(paths.working_dir_path, "/captured");
paths["duplicated"] = path.join(paths.working_dir_path, "/duplicated");
console.log(paths);

// read test directory and get files in a list
// see the files and make the directories needed (check for pre-created dir before mkdir)

fs.readdir(paths.working_dir_path, (err, files) => {
  if (err) {
    console.error;
  }
  for (let file of files) {
    console.log(file);
    if (extensions.video.includes(path.extname(file))) {
      // console.log("If extension is video");
      // check for pre-created video dir
      if (!fs.existsSync(paths.video_path)) {
        console.log("video dir is not made, making video dir....");
        // makedir(video)
        fs.mkdirSync(paths.video_path);
      }
      // move file into video dir
      let old_path = path.join(paths.working_dir_path, `/${file}`);
      let new_path = path.join(paths.video_path, `/${file}`);
      console.log(`moving ${file} into ${new_path}`);
      fs.renameSync(old_path, new_path);
    } else if (extensions.captured.includes(path.extname(file))) {
      // console.log("If extension is captured");
      // check for pre-created captured dir
      if (!fs.existsSync(paths.captured_path)) {
        console.log("captured dir is not made, making captured dir....");
        // makdedir(captured)
        fs.mkdirSync(paths.captured_path);
      }
      // move file into captured dir
      let old_path = path.join(paths.working_dir_path, `/${file}`);
      let new_path = path.join(paths.captured_path, `/${file}`);
      console.log(`moving ${file} into ${new_path}`);
      fs.renameSync(old_path, new_path);
    } else if (extensions.duplicated.includes(path.extname(file))) {
      // console.log("If extension is jpg");
      // check for a modified jpg
      let split_file = file.split("_");
      if (split_file[1].startsWith("E")) {
        console.log(
          "Found a modified .jpg file, checking for pre-made duplicated dir"
        );
        if (!fs.existsSync(paths.duplicated)) {
          console.log("duplicated dir is not made, making duplicated dir....");
          fs.mkdirSync(paths.duplicated);
        }
        // check if original file is in working directory (it might have been moved to duplicated dir already)
        // move original file into duplicated
        let origin_num = split_file[1].slice(1);
        let origin_file = split_file[0].concat("_", origin_num);
        console.log(origin_num, origin_file);
        let old_path = path.join(paths.working_dir_path, `/${origin_file}`);
        let new_path = path.join(paths.duplicated, `/${origin_file}`);
        if (fs.existsSync(old_path)) {
          console.log(`moving ${origin_file} into ${new_path}`);
          fs.renameSync(old_path, new_path);
        }
      }
    }
  }
});
