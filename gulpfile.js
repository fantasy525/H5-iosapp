var gulp=require('gulp'),
    uglify=require('gulp-uglify'),//压缩js
    sciptDebug=require('gulp-strip-debug'),//过滤console.log语句
    px3rem=require('gulp-px3rem'),//px转rem，并且添加data-dpr类
    minifyCss=require('gulp-clean-css'),//压缩css
    changed=require('gulp-changed'),//只传输修改过的文件
    imagemin=require('gulp-imagemin'),//压缩图片
    cache=require('gulp-cache'),//图片快取，只有更改过得图片会进行压缩
    csso=require('gulp-csso'),//压缩优化css
    merge=require('merge-stream'),//合并文件流
    buffer=require('vinyl-buffer'),//输出图片文件流
    spritesmith=require('gulp.spritesmith'),//合并精灵图
    cssBase=require('gulp-base64'),//小图片base64转码
    rev=require('gulp-rev'),//添加版本号
    revCollector=require('gulp-rev-collector'),//替换页面中的链接引用
    runSequence=require('run-sequence'),//同步执行任务
    plumber=require('gulp-plumber'),
    changed=require('gulp-changed'),
    notify=require('gulp-notify'),
    debug=require('gulp-debug'),
    replace=require('gulp-replace'),
    clean=require('gulp-clean');//清理文件夹
//自动转换css
gulp.task('px3rem',function(){
    return gulp.src('src/css/pxCss/*.css')
        .pipe(plumber({
            errorHandler:function(){
               notify.onError('Error:<%=error.message %>')
            }
        }))
        .pipe(changed('src/css',{hasChanged:changed.compareLastModifiedTime}))
        .pipe(debug({title:'编译'}))
        .pipe(px3rem({remUnit:75}))
        .pipe(gulp.dest('src/css'))
})
//base64转码
gulp.task('base64',function(){
    return gulp.src('dist/css/*.css')
        .pipe(cssBase({
            maxImageSize:2*1024
        }))
        .pipe(gulp.dest('dist/css'))
})
//合并精灵图
gulp.task('sprite',function(){
    var spriteData=gulp.src('src/images/sprite/*.png')
        .pipe(spritesmith({
            imgName:'images/sprite.png',
            cssName:'css/sprite.css',
            padding:10,
            cssTemplate:function(data){
                var arr=[];
                arr.push(".icon{display:inline-block}\n");
                data.sprites.forEach(function(sprite){
                    arr.push(".icon-"+sprite.name+"{"+
                        "background-image:url('"+sprite.escaped_image+"');"+
                        "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                        "-webkit-background-size:"+sprite.px.total_width+" "+sprite.px.total_height+";"+
                        "width: "+sprite.px.width+";"+
                        "height:"+sprite.px.height+";"+
                        "}\n");
                })
                return arr.join("");
            }
        }));
    //输出 image 流通过buffer()
    var imgStream=spriteData.img
        .pipe(buffer())
        .pipe(gulp.dest('src'));
    //输出css文件流通过cssno()
    var cssStream=spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('src'))
    return merge(imgStream,cssStream);
})
gulp.task('clean:files',function(){//清除文件夹里面的内容和pxcss，rev文件夹
    return gulp.src(['dist/**/*.*','dist/css/pxCss','dist/rev','dist/images/*/'])
        .pipe(clean());
})
gulp.task('copyFolders',function(){//复制src的目录结构到dist
    return gulp.src('src/**/*.*',{base:'src'})
        .pipe(gulp.dest('dist'))
});
/*build任务开始*/
//压缩css
gulp.task('miniCss',function(){
    return gulp.src('dist/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
})
//压缩图片
gulp.task('imagemin',function(){
    return gulp.src('dist/images/*/*.*')
        .pipe(cache(imagemin({
            progressive:true//无损压缩jpg
        })))
        .pipe(gulp.dest('dist/images'))
})
//压缩js
gulp.task('uglyJs',function(){
    return gulp.src(['dist/js/**/*.js'],['!dist/js/lib/*.js'])
        .pipe(sciptDebug())
        .pipe(uglify({
            mangle:false
        }))
        .pipe(gulp.dest('dist/js'))
})
gulp.task('miniAssets',function(){//总体压缩任务合并
    runSequence(['miniCss','imagemin','uglyJs'],'base64')
})
//添加版本号
//css生成文件hash编码并生成rev-manifest.json文件名对照映射
gulp.task('revCss',function(){
    return gulp.src('src/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'))
})
//js生成文件hash编码并生成rev-manifest.json文件名对照映射
gulp.task('revJs',function(){
    return gulp.src(['src/js/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/js'))
});
//revImg
gulp.task('revImg',function(){
    return gulp.src(['src/images/*/*.*'])
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/images'))
});
//html替换css,js文件版本
gulp.task('revHtml',function(){
    return gulp.src(['src/rev/**/*.json','src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
})//执行替换任务
//build后替换页面的相对路径为后台路径
// gulp.task('publicPath',function(){
//     return gulp.src(['src/*.html'],[])
// })
gulp.task('build',function(){
    runSequence('copyFolders','clean:files','revCss','revJs','revImg','revHtml','miniAssets');
})
/*build任务结束*/

gulp.task('watch',function(){
    gulp.watch('src/css/pxCss/*.css',['px3rem']);
});
gulp.task('default',function(){
    runSequence('px3rem','watch');
});
//OK了