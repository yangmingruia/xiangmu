var gulp =require ("gulp");
var sass =require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var connect =require("gulp-connect");
var concat =require("gulp-concat");
var uglify =require("gulp-uglify");
var rename =require("gulp-rename");
var babel =require("gulp-babel")


gulp.task("html",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

gulp.task("sass",function(){
	gulp.src("scss/index.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({
		"outputStyle":"compact"
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
})

gulp.task("img",function(){
	
	gulp.src("img/**")
	.pipe(gulp.dest("dist/img"));
	
})


gulp.task("babel",function(){
	gulp.src("js/es6.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(rename("es5.js"))
	.pipe(gulp.dest("dist/js"));
})

gulp.task("watch",function(){
	gulp.watch(["*.html","scss/*.scss","img/**","js/*.js"],["html","sass","img","babel"]);
})

gulp.task("server",function(){
	connect.server({ 
		root:'dist',
		livereload:true 
	}); 
});
gulp.task("default",["server","watch"])
