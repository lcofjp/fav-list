//find specified file in directory
const path = require("path");
const fs = require('fs');
const R = require('ramda');



const statSync = pathname => fs.statSync(pathname);
const dirTrue = stat => stat.isDirectory();
const isDir = R.compose(dirTrue, statSync);
const readDir = dirname => fs.readdirSync(dirname).map(name => path.join(dirname, name));

const findFileInDir = (filename, dir) => {
    const reg = new RegExp(filename);
    const currentLevel = readDir(dir);
    let result = currentLevel.filter(R.compose(reg.test.bind(reg), (full => path.basename(full))));
    let sub = currentLevel.filter(isDir).map(dirname => findFileInDir(reg, dirname));
    return R.flatten(result.concat(sub));
};

const r = findFileInDir('.js$', './');
console.log(r);
console.log("total: ", r.length);
