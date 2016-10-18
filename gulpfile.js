//initialize all of our variables
var concat, gulp, gutil, sass, sourceMaps, imagemin, autoprefixer, gulpSequence, bourbon, neat;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']

gulp            = require('gulp');
gutil           = require('gulp-util');
concat          = require('gulp-concat');
sass            = require('gulp-sass');
sourceMaps      = require('gulp-sourcemaps');
imagemin        = require('gulp-imagemin');
autoprefixer    = require('gulp-autoprefixer');
gulpSequence    = require('gulp-sequence').use(gulp);
bourbon         = require('bourbon').includePaths;
neat            = require('bourbon-neat').includePaths;

//compressing images & handle SVG files
gulp.task('images', function(tmp) {
    console.log(tmp);
    gulp.src(['./images/*.jpg', './images/*.png'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }));
});

//compressing images & handle SVG files
gulp.task('images-deploy', function() {
    gulp.src(['./images/*', '!../images/README'])
        .pipe(gulp.dest('./images/prod'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['./scripts/lib/_includes/**/*.js', './scripts/lib/*.js'])
        //this is the filename of the compressed version of our JS
        .pipe(concat('app.js'))
        //catch errors
        .on('error', gutil.log)
        //where we will store our finalized, compressed script
        .pipe(gulp.dest('./scripts'));
});

//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('./styles/scss/init.scss')
        //include SCSS and list every "include" folder
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['./styles/scss/'].concat(bourbon).concat(neat)
        }))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade:  true
        }))
        //catch errors
        .on('error', gutil.log)
        //the final filename of our combined css file
        .pipe(concat('styles.css'))
        //where to save our final, compressed css file
        .pipe(gulp.dest('./styles'));
});

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('./styles/scss/init.scss')
        //include SCSS includes folder
        .pipe(sass({
            includePaths: ['./styles/scss']
        }))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade:  true
        }))
        //the final filename of our combined css file
        .pipe(concat('styles.css'))
        //where to save our final, compressed css file
        .pipe(gulp.dest('./styles'));
});

gulp.task('default', ['scripts', 'styles'], function() {
    gulp.watch('./scripts/lib/*', ['scripts']);
    gulp.watch('./styles/scss/**/*', ['styles']);
    gulp.watch('./images/**', ['images']);
});