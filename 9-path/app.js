const path = require("path");

// POSIX (Unix: Mac, Linux): 'Users/temp/myfile.html'
// Windows: 'C:\\temp\\myfile.html'

console.log(__dirname);
console.log(__filename);

console.log(path.sep); // path 내부에 있는 경로 구분자
console.log(path.delimiter); // path 내부에 있는 환경변수 구분자

// basename(path[,ext]): returns the last portion of a path, similar to the UNIX basename command
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

// dirnameI(path): returns the directory name of a path, similar to the UNIX dirname command
console.log(path.dirname(__filename));

// extension(path): returns the extension of teh path, last occurrence of the . ~ end of string.
console.log(path.extname(__filename));

// parse(path): returns an object whose properties represent significant elements of the path.
const parsed = path.parse(__filename);
console.log(parsed);
parsed.root;
parsed.name;

// foramt(pathObject): returns a path string from an object. Acts opposite of path.parse().
const str = path.format(parsed);
console.log(str);

// isAbsolute(path): returns boolean. Determines if path is an absolute path.
console.log("isAbsolute?", path.isAbsolute(__dirname)); // /Users/
console.log("isAbsolute?", path.isAbsolute("../"));

// normalize(path): returns normalized string. This method normalizes the given path, resolving '..' and '.' segments.
console.log(path.normalize("./folder/////sub"));

// join([...paths]): ...paths: A sequence of path segments, Returns string
// This method joins all given path segments together by using the platform-specific seperator as a delimeter,
// then normalizes the resulting path.
console.log(__dirname + path.sep + "image");
console.log(path.join(__dirname, "image"));
