const { sync: spawnSync } = require('cross-spawn');
const { existsSync } = require('fs');
const path = require('path');

const SFMLJS_COMMIT_HASH = "5948b4e1f04898b94631ff2d23a8a1f600b45429";
const dirname = __dirname + path.sep;

let opts = {};
let cmds = [];

// Detects GitHub Action
if (process.env.GITHUB_ACTIONS) {
	console.log("[i] GItHub Action detected, aborting procedure.");
	process.exit(0);
}

// Identifiers
const sfmlcloned = existsSync(path.join(dirname, 'sfml-js/', 'README.md'));

// Git Submodule Init
opts = {
	cwd: dirname,
	stdio: ['pipe', process.stdout, process.stderr]
};
cmds.push({
	msg: "[i] Initializing Git",
	cmd: ['git', 'init'],
	opt: Object.assign({}, opts)
});

if (!sfmlcloned) {
	cmds.push({
		msg: "[*] Cloning sfml.js as submodule",
		cmd: ['git', 'submodule', 'add', '-f', 'https://github.com/XadillaX/node-sfml.git', 'sfml-js'],
		opt: Object.assign({}, opts)
	});

	opts.cwd = path.join(dirname, 'sfml-js/');
	cmds.push({
		msg: "[i] Checking out sfml.js at commit " + SFMLJS_COMMIT_HASH,
		cmd: ['git', 'checkout', SFMLJS_COMMIT_HASH],
		opt: Object.assign({}, opts)
	});
}

// Compiling SFML.js
opts.cwd = path.join(dirname, 'sfml-js/');
cmds.push({
	msg: "[*] Installing sfml.js dependencies",
	cmd: ['npm', 'install'],
	opt: Object.assign({}, opts)
});

// Compiling package
if (!isnpm) {
	opts.cwd = dirname;
	cmds.push({
		msg: "[*] Compiling sul",
		cmd: ['npm', 'run', 'build'],
		opt: Object.assign({}, opts)
	});

	cmds.push({
		msg: "[*] Compiling sul types",
		cmd: ['npm', 'run', 'build.declaration'],
		opt: Object.assign({}, opts)
	});
}

// Start commands
for (const cmd of cmds) {
	console.log(cmd.msg);
	let { status, error } = spawnSync(cmd.cmd.shift(), cmd.cmd, cmd.opt);

	if (status != 0) throw error;
}
