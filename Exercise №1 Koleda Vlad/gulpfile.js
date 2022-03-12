const { src, dest, watch, parallel } = require('gulp')

const scss = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid: true,
            })
        )
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/**/*.scss'], styles) // Указываем, что будем следить в том числе за вложениями + при изменении запускаем функцию
    watch(['app/*.html']).on('change', browserSync.reload)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
    })
}
// function scripts() {
//     return src([
//         'app/script/script.js' // Последним идёт наш файлов скриптов.
//     ])
//         .pipe(concat('script.min.js')) // Объединяем файлы
//         .pipe(uglify()) // Сжимаем
//         .pipe(dest('app/script')) // Закидываем в папку js
//         .pipe(browserSync.stream()) // Обновляем страницу
// }

function build() {
    return src(
        [
            'app/*.html',
            'app/css/style.min.css',
            'app/fonts/**/*',
            'app/img/**/*',
            'app/*.png',
            'app/*.img',
            'app/*.svg',
            'app/*.xml',
            'app/*.webmanifest',
            'app/*.ico',
        ],
        { base: 'app' }
    ) // чтобы перекидывало с папками
        .pipe(dest('dist')) // Выгружаем в папку dist
}

function fonts() {
    src(['app/fonts/*.ttf']).pipe(ttf2woff()).pipe(dest('app/fonts/'))

    return src(['app/fonts/*.ttf']).pipe(ttf2woff2()).pipe(dest('app/fonts/'))
}

exports.styles = styles
exports.fonts = fonts
exports.watching = watching
exports.browsersync = browsersync
// exports.scripts = scripts;
exports.build = build

exports.default = parallel(styles, browsersync, fonts, watching)
