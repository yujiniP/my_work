'use strict' ;

import gulp from 'gulp' ;
import babel from 'gulp-babel';
import gutil from 'gulp-util' ;
import uglify from 'gulp-uglify' ;
import cleanCSS from 'gulp-clean-css' ;
import sass from 'gulp-sass' ;
import htmlmin from 'gulp-htmlmin' ;
import imagemin from 'gulp-imagemin' ;
import del from 'del' ;
import Cache from 'gulp-file-cache';
import nodemon from 'gulp-nodemon' ;
import webpack from 'gulp-webpack';
// import webpackConfig from './webpack.config.js';
import browserSync from 'browser-sync';
import spritesmith from 'gulp.spritesmith-multi';
import mergeStream from 'merge-stream';
import fs from 'fs' ;
import mustache from 'mustache' ;
import runSequence from 'run-sequence' ;
import fileinclude from 'gulp-file-include' ;

let cache = new Cache();
global.appRoot = __dirname  ;

// # 디렉토리 정의
const DIR = {
	SRC : 'html',
	DEST : 'html_build'
} ;

const SRC = {
	HTML : DIR.SRC + '/*.html',
	HTMLINCLUDE : DIR.SRC + '/include/*.html',
	CSS : DIR.SRC + '/css/**/*.css',
	SCSS : DIR.SRC + '/scss/*.scss',
	JS : DIR.SRC + '/js/**/*.js',
	IMAGES : DIR.SRC + '/images/*' ,
	SPRITE : DIR.SRC + '/images/sprite' ,
	SERVER : 'server/**/*.js' ,
} ;

const DEST = {
	HTML : DIR.DEST + '/',
	CSS : DIR.DEST + '/css',
	SCSS : DIR.DEST + '/css',
	JS : DIR.DEST + '/js',
	IMAGES : DIR.DEST + '/images' ,
	SPRITE : DIR.DEST + '/images/sprite' ,
	SERVER : 'app' ,
} ;

// # clean
gulp.task('clean', () => {
	console.log( '## clean START ##' ) ;
	return del.sync( [DIR.DEST] ) ;
}) ;

// # start
gulp.task('start', ['babel'], () => {
	console.log( '## start START ##' ) ;
	return nodemon({
		script: DEST.SERVER + '/main.js',
		watch: DEST.SERVER
	});
});

// # html copy
gulp.task('html', () => {
	console.log( '## html START ##' ) ;
	return gulp.src( SRC.HTML )
	.pipe( gulp.dest( DEST.HTML ) ) ;
}) ;

// html copy & file include
gulp.task('htmlbuild', () => {
	console.log( '## htmlbuild START ##' ) ;
	return gulp.src( SRC.HTML )
	.pipe( fileinclude({
		prefix : '@@' ,
		basepath : '@file'
	}) )
	.pipe( gulp.dest( DEST.HTML ) )
}) ;

// # scss
gulp.task('scss', () => {
	console.log( '## scss START ##' ) ;
	return gulp.src( SRC.SCSS )
	.pipe( cache.filter() )
	.pipe( sass({outputStyle: 'compact'}).on('error', sass.logError) )
	.pipe( cache.cache() )
	.pipe( gulp.dest( DEST.CSS ) ) ;
}) ;

// # gulpfile -ES6 변환
gulp.task('babel', () => {
	console.log( '## babel START ##' ) ;
	return gulp.src( SRC.SERVER )
	.pipe( cache.filter() )
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe( cache.cache() )
	.pipe(gulp.dest( DEST.SERVER ));
});

// # images

gulp.task('images', () => {
	console.log( '## images START ##' ) ;
	return gulp.src( [SRC.IMAGES , '!' + SRC + '/images/sprite' ] )
	.pipe( gulp.dest( DEST.IMAGES )) ;
}) ;

gulp.task('auto-sprite', function() {
	let opts = {
		spritesmith: function (options, sprite, icons){
			options.imgPath =  `../images/sprite/${options.imgName}`;
			options.retinaImgPath =  `../images/sprite/${options.retinaImgName}`;
			options.cssName = `_${sprite}-sprite.scss`;
			options.cssTemplate = null;
			options.cssSpritesheetName = sprite;
			options.padding = 10;
			options.cssVarMap =  function(sp) {
				sp.name = `${sprite}-${sp.name}`;
			};

			return options;
		}
	};
	let spriteData = gulp.src( DIR.SRC+'/images/sprite/**/*.png' ).pipe(spritesmith(opts)).on('error', function (err) {
		console.log(err)
    });

	let imgStream = spriteData.img.pipe(gulp.dest( DIR.DEST+'/images/sprite' ));
	let cssStream = spriteData.css.pipe(gulp.dest( DIR.SRC+'/scss/sprite' ));

	return mergeStream(imgStream, cssStream);
});

gulp.task('copyImages', () => {
	runSequence('images', 'auto-sprite');
}) ;

function webpackFun ( evt ) {
	// console.log( '---- evt : ' , evt ) ;
	let path = evt.path ;
	let jsName = path.substr( path.lastIndexOf( '\\' ) + 1 , path.length ) ;
	let entryName = {} ;
	let entryPath = {} ;

	// console.log( 'jsName : ' , jsName ) ;
	// console.log( 'path : ' , path ) ;

	if ( path.indexOf( 'ui' ) == -1 ) { /* 상위 */

		// console.log( 'entryName : ' , entryName ) ;
		// console.log( 'entryPath : ' , entryPath ) ;

		// console.log( '---------------- in -----------------' ) ;
		// console.log( 'dirname -  : ' , global.appRoot + '/html/js/' ) ;
		// console.log( 'jsName : ' , jsName ) ;

		webpack({
			entry : {
				entryName : global.appRoot + '/html/js/' + jsName
			} ,
			output : {
				filename : jsName
			} ,
			module : {
				loaders : [
					{
						test : /\.js$/ ,
						loader : 'babel-loader' ,
						exclude : '/node_modules/' ,
						query : {
							cacheDirectory : true ,
							"presets" : ['es2015', 'es2017', 'stage-3', 'react'],
							"plugins" : [
								'transform-decorators-legacy',
								'transform-class-properties' ,
								'transform-async-to-generator' ,
								'transform-object-assign' ,
								'transform-regenerator' ,
								["transform-runtime", {
									"helpers": false, // defaults to true
									"polyfill": false, // defaults to true
									"regenerator": true, // defaults to true
									"moduleName": "babel-runtime" // defaults to "babel-runtime"
								}]
							],
						}
					}
				]
			}
		}).pipe( gulp.dest( DEST.JS ) ) ;
	} else { /* 하위 */
		// gulp.watch( SRC.JS , [ 'webpack' ] ) ;
		fs.readdir( 'html/js/' , ( err , fls ) => {
			let arr = [] ;
			fls.forEach(( file ) => {
				if ( file.indexOf( '.js' ) > -1 ) {
					// arr.push( file ) ;
					// let evt = { path : __dirname + '\\html\\js\\' + file } ;

					let filePath = __dirname + '\\html\\js\\' + file ;
					let findStr = jsName.replace( '.js' , '' ) ;
					// console.log( 'filePath : ' , filePath ) ;
					// console.log( 'file : ' , file ) ;
					// console.log( 'findStr : ' , findStr ) ;

					fs.readFile( filePath , 'utf8' , ( err , data ) => {
						if ( err != null ) return console.log( 'err : ' , err ) ;
						if ( data.indexOf( './ui/' + findStr ) != -1 ) {
							let evt = { path : __dirname + '\\html\\js\\' + file } ;
							// console.log( 'evt : ' , evt ) ;
							webpackFun( evt ) ;
						}
					}) ;
				}
			}) ;
		}) ;
	}
}

gulp.task('webpack', () => {
	console.log( '## webpack START ##' ) ;
	fs.readdir( `${ DIR.SRC }/js/` , ( err , files ) => {
      // console.log( 'err : ' , err ) ;
      // console.log( 'files : ' , files ) ;

      files.forEach( file => {
        // console.log( '- file : ' , file ) ;
        if ( file.indexOf( '.js') == -1 ) return ;
        // console.log( 'aaaaaaaaaaaaaaa' ) ;
        let evt = { path : `${ __dirname }\\${ DIR.SRC }\\js\\${ file }` } ;

        webpackFun( evt ) ; // 변수 evt 를 webpackFunc함수에 전달합니다.
      }) ;

    }) ;
}) ;

// # JS copy
gulp.task('js', () => {
	console.log( '## js COPY START ##' ) ;
	return gulp.src( SRC.JS )
	.pipe( gulp.dest( DEST.JS ) ) ;
}) ;

// # CSS copy
gulp.task('css', () => {
	console.log( '## css COPY START ##' ) ;
	return gulp.src( SRC.CSS )
	.pipe( gulp.dest( DEST.CSS ) ) ;
}) ;

/* FONTS Copy */
gulp.task('fonts', function(){
	return gulp.src( DIR.SRC  + '/fonts/*.*' )
	.pipe( gulp.dest( DIR.DEST + '/fonts'))
});


// # browser-sync(자동 새로고침)
gulp.task('browser-sync', () => {
	console.log( '## browser-sync START ##' ) ;
	browserSync.init(null, {
		proxy : "http://localhost:3000",
		files : ["./html_build"],
		port : 7000,
	}) ;
});

// # watch
gulp.task('watch', () => {

	console.log( '## watch START ##' ) ;

	let watcher = {
		// webpack : gulp.watch(SRC.JS, ['webpack']),
		js : gulp.watch(SRC.JS, ['js']),
		css : gulp.watch(SRC.CSS, ['css']),
		scss : gulp.watch(DIR.SRC + '/**/*.scss', ['scss']),
		html : gulp.watch(SRC.HTML, ['htmlbuild']),
		htmlinclude : gulp.watch(SRC.HTMLINCLUDE, ['htmlbuild']),
		images : gulp.watch(SRC.IMAGES, ['images']),
		copyImages : gulp.watch(SRC.SPRITE, ['copyImages']),
		babel : gulp.watch(SRC.SERVER, ['babel']),
	};


	let notify = (event) => {
		gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
	};

	for(let key in watcher) {
		watcher[key].on('change', notify);
	}
});

// gulp.task('watch', () => {
// 	gulp.watch( SRC.JS, ['webpack'] ) ;
// 	gulp.watch( SRC.CSS, ['css'] ) ;
// 	gulp.watch( DIR.SRC + '/**/*.scss', ['scss'] ) ;
// 	gulp.watch( SRC.HTML, ['htmlbuild'] ) ;
// 	gulp.watch( SRC.HTMLINCLUDE, ['htmlbuild'] ) ;
// 	gulp.watch( SRC.IMAGES, ['images'] ) ;
// 	gulp.watch( SRC.SPRITE, ['copyImages'] ) ;
// 	gulp.watch( SRC.SERVER, ['babel'] ) ;
// });

// # default
gulp.task('default', [ 'clean', 'copyImages', 'scss', 'js', 'css', 'fonts', 'htmlbuild', 'watch', 'start', 'browser-sync' ],() => {
	return gutil.log( '-------> Gulp is running' ) ;
})