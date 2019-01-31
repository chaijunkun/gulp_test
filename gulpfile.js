var glob = require('glob');
var gulp = require('gulp');
var pump = require("pump");
var htmlReplace = require("gulp-html-replace");

console.log("start from here");
function getFileNameList() {
    let fileNameList = glob.sync("*.js", {cwd: "."});
    if (fileNameList && fileNameList.length > 0) {
        return fileNameList.map((fileName) => {
            return fileName.replace(/[\/\\]/g, "|")
        });
    } else {
        return [];
    }
}
console.log(JSON.stringify(getFileNameList()));
gulp.task("default", function(done) {
    pump([
        gulp.src(["./src/index.html"]),
        htmlReplace({
            seg_1: {
                src: getFileNameList(),
                tpl: '<script src="./%s" type="text/javascript" charset="utf-8"></script>'
            },
            seg_2: {
                src: getFileNameList(),
                tpl: '<script src="./%s" type="text/javascript" charset="utf-8"></script>'
            }
        }, {
            keepUnassigned: true,
            keepBlockTags: true,
            useCRLF: true
        }),
        gulp.dest("./dist")
    ], done);
    console.log("run default");
});
