const fs = require("fs");
const path = require("path");
const lib = {};

lib.basedir = path.join(__dirname, "/../.data/");
// write data
lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.basedir + dir}/${file}.json`, "wx", (err1, filedescriptor) => {
    if (!err1 && filedescriptor) {
      const stringData = JSON.stringify(data);
      fs.write(filedescriptor, stringData, (err2) => {
        if (!err2) {
          fs.close(filedescriptor, (err3) => {
            if (!err3) {
              callback(false);
            } else {
              callback("error while closing");
            }
          });
        } else {
          callback("error writing time");
        }
      });
    } else {
      callback(err1);
    }
  });
};
//read data
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf8", (err, data) => {
    callback(err, data);
  });
};
// update data 
lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback("error closing the file");
                }
              });
            } else {
            }
          });
        } else {
          callback("error trancating");
        }
      });
    } else {
      console.log("errorfile may niot exist");
    }
  });
};
delete file
lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("error deleting file");
    }
  });
};
module.exports = lib;
