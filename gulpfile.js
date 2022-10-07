// Импорт пакетов
"use strict";

const gulp = require('gulp')
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const newer = require('gulp-newer')
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');
const browsersync = require('browser-sync').create()
const del = require('del');


// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
  html: {
    src: ['src/*.html'],
    dest: 'dist/'
  },
  scss: {
    src: ['src/scss/**/*.sass', 'src/scss/**/*.scss', 'src/scss/**/*.css'],
    dest: 'dist/css/'
  },
  js: {
    src: ['src/js/**/*.js'],
    dest: 'dist/js/'
  },
  img: {
    src: 'src/img/**',
    dest: 'dist/img/'
  },
  fontsWoff: {
    src: 'src/fonts/**',
    dest: 'dist/fonts/'
  },
  fontsWoff2: {
    src: 'src/fonts/**',
    dest: 'dist/fonts/'
  },
  svg: {
    src: 'src/img/svg/*.svg',
    dest: 'dist/img/'
  }
}

// Очистить каталог dist, удалить все кроме изображений
function clean() {
  return del(['dist/*'])
}
// Обработка svg

function svg() {
  return gulp.src(paths.svg.src)  
  .pipe(svgSprite({
      mode:{
        stack: {
          sprite:"sprite.svg",
          example:false,
        } 
      }
  }))
  .pipe(gulp.dest(paths.svg.dest));
}
// Очистить каталог dist svg
function cleanSvg() {
  return del(['dist/img/svg/'])
}
// Обработка fontsWoff
function fontsWoff() {
  return gulp.src(paths.fontsWoff.src)
    .pipe(ttf2woff())
    .pipe(gulp.dest(paths.fontsWoff.dest));
}
// Обработка fontsWoff
function fontsWoff2() {
  return gulp.src(paths.fontsWoff2.src)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(paths.fontsWoff2.dest));
}
// Обработка html 
function html() {
  return gulp.src(paths.html.src)

    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}

// Обработка препроцессоров стилей
function scss() {
  return gulp.src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browsersync.stream())
}

// Обработка Java Script и module + webpack
function js() {
  return gulp.src(paths.js.src)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(sourcemaps.init())

    .pipe(babel({
      presets: ['@babel/env']
    }))

    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browsersync.stream())
}

// Сжатие изображений
function img() {
  return gulp.src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.img.dest))
}


// Отслеживание изменений в файлах и запуск лайв сервера
function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    }
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.scss.src, scss)
  gulp.watch(paths.js.src, js)
  gulp.watch(paths.img.src, img)
  gulp.watch(paths.svg.src, svg)
  gulp.watch(paths.fontsWoff.src, fontsWoff)
  gulp.watch(paths.fontsWoff2.src, fontsWoff2)
}

// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.cleanSvg = cleanSvg
exports.cleanSvg = cleanSvg

exports.html = html
exports.scss = scss
exports.js = js
exports.img = img
exports.svg = svg
exports.fontsWoff = fontsWoff
exports.fontsWoff2 = fontsWoff2
exports.watch = watch

// Таск, который выполняется по команде gulp
exports.default = gulp.series(clean, html, gulp.parallel(scss, js, img, fontsWoff, fontsWoff2, svg), watch)