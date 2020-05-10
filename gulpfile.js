const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");


function styles(cb) {
    return gulp.src('./src/scss/*.scss')
     .pipe(concat('styles.scss'))
     .pipe(sass().on('error', sass.logError))
     .pipe(cleanCSS())
     .pipe(autoprefixer('last 2 versions'))
     .pipe(gulp.dest('./src'))
     
};


function dist() {
    return gulp.src('./src/index.html', './src/styles.css', )
    .pipe(gulp.dest('./dist'));
};

function server() {
    console.log("\r\n Starting BrowserSync \r\n" );

    browserSync.init({
        server: {
            baseDir: './src',
            index: 'index.html'
        },
    });
};

function reload(done) {
    browserSync.reload();
    done();
};

function watchFiles(done) {
    
    gulp.watch('./src/*.html', reload);

    gulp.watch('./src/scss/*.scss', gulp.series(styles,reload));

    gulp.watch('./src/js/*.js', reload)
    
};



//Make a server and watch HTML, JS, & SCSS files
exports.watch = gulp.parallel(server, watchFiles);

//Move html, css and js files to dist folder
exports.dist = dist;

//Concatenate Sass files, autoprefix and clean, then process into CSS
exports.styles = styles;


// function defaultTask(cb) {
//     console.log("Test");
    

//     cb();
// };

// exports.default = defaultTask