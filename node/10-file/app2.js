const fs = require("fs").promises;

// Read a file

// fsPromises.readFile(path[, options])
// Asynchronously reads the entire contents of a file.
// Return Promise is fulfilled with the contents of teh file.
// If no encoding is specified, the data is returned as a Buffer object.
fs.readFile("./text.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Writing a file

// fsPromises.writeFile(fiel, data[, options])
// Asynchronously writes data to a file, replacing the file if it already exists.
// Return Promise is fulfilled with no arguments upon success.
fs.writeFile("./text.txt", "Hello, my name is Jay") //
  .catch(console.error);

// fsPromises.appendFile(path, data[, options])
// Asynchronously append data to a file, creating the file if it does not yet exist.
// Return Promise will be fulfilled with no arguments upon success.
fs.appendFile("./text.txt", "Wow!") //
  .catch(console.error);

// Copy

// fsPromises.copyFile(src, dest[, mode])
// Asynchronously copies src to dest. By default, dest is overwritten if it already exists.
// Return Promise will be fulfilled with no arguments upon success.
fs.copyFile("./file.txt", "./file2.txt") //
  .catch(console.error);

// 비동기적으로 실행되기 때문에 순서를 지정해 주려면
fs.appendFile("./file.txt", "Oh my god!") //
  .then(() => {
    //copy
    fs.copyFile("./file.txt", "./file2.txt").catch(console.error);
  })
  .catch(console.error);

// Create a directory
// fsPromises.mkdir(path[, options])
// Asynchronously creates a directory then fulfills the Promise with either no arguments,
// or the first directory path created if recursive is true.
fs.mkdir("sub-folder") //
  .catch(console.error);

// fsPromises.readdir(path[, options])
// Reads the contents of a directory
// fulfills the Promise with an array of the names of the files
// in the directory excluding '.' and '..'.
fs.readdir("./") //
  .then(console.log)
  .catch(console.error);

// Promise라면 catch를 이용해서 에러를 잡아내는 것이 중요하다!
