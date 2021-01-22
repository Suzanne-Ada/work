window.onload = function () {
// 导航栏鼠标移入  
var lis = document.getElementsByClassName('lis');
var navs = document.getElementsByClassName('navs');
lis.onmouseover = function () {
    lis.style.color = 'rgb(42, 102, 163)';
    navs.style.border-bottom = '1px solid rgb(42, 102, 163)';
}
lis.onmouseout = function () {
    lis.style.color = 'white';
}
// 字节跳动产品鼠标移入移出事件
var ptitle = document.getElementsByClassName('product-tile');
var appimgs = document.getElementsByClassName('appimg');

ptitle.onmouseover = function () {
    appimgs.style.width = '110px';
    appimgs.style.height = '110px';
    ptitle.style.color = 'rgb(42, 102, 163)';
}
// 探索你感兴趣的职业鼠标移入移出事件
var jobImg = document.getElementsByClassName('job-img');
var jobTile = document.getElementsByClassName('job-tile');
jobTile.onmouseover = function () {
    jobImg.style.width = '230px';
    jobImg.style.height = '230px';
    jobTile.style.color = 'rgb(42, 102, 163)';
}
// 员工故事
var storyCard = document.getElementsByClassName('storycard');
storyCard.onmouseover = function () {
    storyCard.style.border = '1px solid #region';
}
}



