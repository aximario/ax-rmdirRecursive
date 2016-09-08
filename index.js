const fs = require('fs');
const path = require('path');

const rmdirRecursiveSync = function (file) {
	let queue = [],
		stack = [];
	queue.push(file);

	while (queue.length) {
		let cn = queue.shift();
		let files = fs.readdirSync(cn);
		let stat, adrs;
		files.forEach(i => {
			adrs = path.resolve(cn, i);
			stat = fs.lstatSync(adrs);
			if (stat.isFile() || stat.isSymbolicLink()) {
				fs.unlinkSync(adrs);
			} else {
				stack.push(adrs);
				queue.push(adrs);
			}
		});
	}
	for (let i = stack.length - 1; i > -1; i--) {
		fs.rmdirSync(stack[i])
	}
	fs.rmdirSync(file);
};


module.exports = rmdirRecursiveSync;