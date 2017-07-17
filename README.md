# H5-iosapp
这是公司H5端的页面，主要嵌入在iso App当中来展示公司的题库相关介绍，用到了art-template模板引擎，淘宝flexible布局，以及gulp的打包，压缩，base64,版本号等技术

## 使用方法
1. 首先安装gulp所需要的依赖
```
npm install
```
2. 安装完后这里需要修改几个插件，因为我用到了增加版本号的功能，但是原来的插件不能满足版本号样式的需求形如?v=这样子，我做了修改增加了?v=hash的样式
具体修改说明
```javascript
  1.打开node_modules\gulp-rev\index.js
  第144行 manifest[originalFile] = revisionedFile;
  更新为：
    var date=new Date();增加时间戳
    var timeStamp=date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString();
    manifest[originalFile] = originalFile + '?v='+timeStamp+"-" + file.revHash;
  2.打开nodemodules\gulp-rev\nodemodules\rev-path\index.js
    10行 return filename + '-' + hash + ext;
    更新为: return filename + ext;
  3.打开node_modules\gulp-rev-collector\index.js
    31行if ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !==  path.basename(key) ) {
    更新为: if ( !_.isString(json[key]) || path.basename(json[key]).split('?')[0] !== path.basename(key) ) {
 ```
 这样修改后的link和script就会变成
```javascript
  
  <link rel="stylesheet" href="css/reset.css?v=2017617-5405acb20d">
  <script src="js/lib/template-web.js?v=2017617-cfe2266047"></script>
```
3.开发页面时需要运行默认的gulp任务 即可
```
gulp
```
4.开发完成输入命令
```
gulp build
```
打包完成后会出现dist文件夹，里面是经过gulp处理过的项目文件


