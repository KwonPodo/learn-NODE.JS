// Buffer
// Fixed-size chunk of memory
// array of integers, byte of data
// The Buffer class is a global type for dealing with binary data directly.
// Buffer can be constructed in many ways.

const fs = require("fs");

// Buffer.from(buffer)
// buffer: An existing Buffer or Uint8Array from which to copy data
// Copies the passed buffer data onto a new Buffer instance.
const buf = Buffer.from("HI");
console.log(buf);
console.log(buf.length);
console.log(buf[0]);
console.log(buf[1]);
console.log(buf.toString("utf-8"));

// Create buffer

// Buffer.alloc(size[, fill [, encoding]])
// Allocates new Buffer of size bytes.
// If fill is undefined, the Buffer will be zero-filled.
// If size is larger than buffer.constants.MAX_LENGTH or smaller than 0, ERR_INVALID_OPTVALUE is thrown
// If fill is specified, teh allocated Buffer will be initialized by calling buf.fill(fill)
// If both fill and encoding are specified, the allocated Buffer will be initialized by calling buf.fill(fill, encoding)
// Calling Buffer.alloc() can be measurably slower than teh alternative Buffer.allocUnsafe()
// But it ensures that teh newly created Buffer instance contents will never contain sensitive data from previous allocations.

const buf2 = Buffer.alloc(2);
const buf3 = Buffer.allocUnsafe(2); // fast but unsafe. NOT INITIALIZED!
buf2[0] = 72; // ASCII
buf2[1] = 73;
console.log(buf2.toString());
console.log(buf3);

// Copy Buffer
// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
// Copies data from a region of buf to a region in target, even if the target memory region overlaps with buf

buf2.copy(buf3);
console.log(buf3.toString());
console.log(buf3);

// Concat
// Buffer.concat(list[, totalLength])
// Returns a new Buffer which is the result of concatenating all the Buffer instances in the list together
// If totalLength is provided, it is coerced to an unsigned integer.
// If the combined length of the Buffers in list exceeds totalLength, the result is truncated to totalLength.

const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString());
