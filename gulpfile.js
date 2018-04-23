'use strict'

// requerimos las dependencia
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


gulp.task('imagemin', () => {
	return gulp.src(['dev/img/**/*', 'dev/img/*'])        
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		svgoPlugins: [{removeUnknownsAndDefaults: false}, 
			{cleanupIDs: false}, {removeViewBox: true}]
	}))
	.pipe(gulp.dest('src/img/'))
	.pipe(browserSync.stream());
});

gulp.task('sass', () => {
	return gulp.src([
		'node_modules/bootstrap/scss/bootstrap.scss',
		'dev/scss/*.scss',
		'dev/scss/**/*.scss'
		])
	.pipe(sass({
		outputStyle:'compressed'
	}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});

gulp.task('js', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js'
		])
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream());
});
 
gulp.task('jss', () => {
	let bundler = browserify('dev/js/main.js').transform(babelify)
	return bundler.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream());
})

gulp.task('font-awesome', () =>{
	return gulp.src([
		'node_modules/font-awesome/css/font-awesome.min.css'
		])
	.pipe(gulp.dest('src/css'));
});

gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('src/fonts'));
});


gulp.task('serve', ['sass', 'imagemin', 'jss'], () => {
	browserSync.init({
		server: './src/'
	});

	gulp.watch([
		'node_modules/bootstrap/scss/bootstrap.scss',
		'dev/scss/*.scss',
		'dev/scss/**/*.scss'
		], ['sass']);

	gulp.watch([
		'dev/js/main.js',
		'dev/js/**'
		], ['jss']);

	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve', 'font-awesome', 'fonts'])