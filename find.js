//find all .ts file to be compiling
var path = require("path");
var fs = require('fs');

//add a comment in 2017/2/15

function checkFileStat(pathname) {
    try {
        var stat = fs.statSync(pathname);
        if (stat.isFile()) {
            return 1;
        }
        else if (stat.isDirectory()) {
            return 2;
        }
        else
            return undefined;
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
}

var tslist = [];

function addToList(pathname){
    tslist.push(pathname);
}
function saveAll(){
    var content = tslist.join("\r\n");
    fs.writeFileSync("input.txt", content);
}

function travalDir(dirname, cb){
    var i;
    var filelist = fs.readdirSync(dirname);
    for (i = 0; i < filelist.length; i++) {
        var fullname = path.join(dirname, filelist[i]);
        var filetype = checkFileStat(fullname);
        if (filetype == 1) {
            if (path.extname(fullname) === ".ts") {
                cb(fullname);
            }
        }
        else if (filetype == 2) {
            travalDir(fullname, cb);
        }
    }
}

function travalAllTs(pathname)
{
    var cwd = pathname || process.cwd();
    var curlist = fs.readdirSync(cwd);
    travalDir(cwd, addToList);
    saveAll();
}

travalAllTs();
