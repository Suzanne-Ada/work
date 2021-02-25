var sw = 20,//一个方块的宽度
    sh = 20,//一个方块的高度
    tr = 30,//行数
    td = 50;//列数
//初始分数
var score = 0;
//初始速度
var speed = 200;
//游戏区域
var gameArea = document.getElementById('gameArea');
//创建背景方法
function createBg (){
    //创建表格
    gameArea.style.width=td*20+"px";
    gameArea.style.height=tr*20+"px";
    for (var i = 0; i < tr; i++) {
        for (var j = 0; j < td; j++) {
            var  divs =document.createElement('div');
            divs.style.width="18.5px";
            divs.style.height="18.5px";
            divs.style.border="0.5px solid white";
            divs.style.float='left';
            gameArea.appendChild(divs);
        }
    }
}
createBg ();
// 使用构造函数对象方法创建蛇，
function Snake(){
    this.width = sw;
    this.height = sh;
    this.direction = 'right';//蛇的默认走的方向右方
    //存储蛇的初始状态，初始为4个小点为一个蛇
    this.body = [
        {x:3, y:0},   // 蛇头，第一个点
        {x:2, y:0},   // 蛇身，第二个点
        {x:1, y:0},   // 蛇身，第三个点
        {x:0, y:0}    // 蛇尾，第四个点
    ];
    // 显示蛇的方法
    this.display = function() {
        // 利用循环创建蛇的全身
        for (var i=0; i<this.body.length; i++) {
            if (this.body[i].x != null) {   // 当吃到食物时，x == null
                var snakes = document.createElement('div');
                // 将节点保存到状态中
                this.body[i].flag = snakes;
                // 设置宽高和基本样式
                snakes.style.width = this.width + 'px';
                snakes.style.height = this.height + 'px';
                snakes.style.borderRadius =  "50%";
                snakes.style.transition = "all 200ms linear";
                //蛇头和蛇身显示不同的颜色
                if( i == 0){
                    snakes.style.background = "black";
                    
                }else{
                    snakes.style.background = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
                }
                // 设置蛇的位置
                snakes.style.position = 'absolute';
                snakes.style.left = this.body[i].x * this.width + 'px';
                snakes.style.top = this.body[i].y * this.height + 'px';
                // 添加进游戏区域
                gameArea.appendChild(snakes);
            }
        }
    };
    //蛇动起来的方法
    this.run = function() {
        for (var i=this.body.length-1; i>0; i--) {
            this.body[i].y = this.body[i-1].y;        // 后一个元素到前一个元素的位置
            this.body[i].x = this.body[i-1].x;        // 后一个元素到前一个元素的位置
        }
        // 根据行走方向处理蛇头
        switch(this.direction)
        {
            case "left":
                this.body[0].x -= 1;
                break;
            case "right":
                this.body[0].x += 1;
                break;
            case "up":
                this.body[0].y -= 1;
                break;
            case "down":
                this.body[0].y += 1;
                break;
        }
        // 判断是否出界,一蛇头判断,出界的话，
        if (this.body[0].x < 0 || this.body[0].x > td - 1 || this.body[0].y < 0 || this.body[0].y > tr - 1) {//坐标小于0或者超过行数和列数减一，会出界
            clearInterval(timer);   // 清除定时器，
            alert("哎呀，撞墙了"+ "\n" +"game over"+  "\n" + "你当前的分数为" + score);
            score = 0;
            // 删除旧的蛇
            for (var i=0; i<this.body.length; i++) {
                if (this.body[i].flag != null) {   // 如果刚吃完就死掉，会加一个值为null的
                    gameArea.removeChild(this.body[i].flag);
                }
            }
            // 回到初始状态
            this.body = [
                {x:3, y:0},   // 蛇头，第一个点
                {x:2, y:0},   // 蛇身，第二个点
                {x:1, y:0},    // 蛇身，第三个点
                {x:0, y:0}    // 蛇尾，第四个点
            ];
            this.direction = 'right';
            this.display();   // 显示初始状态
            return false;  
        }
        // 判断蛇头吃到食物，蛇和食物坐标重合
        if (this.body[0].x == food.x && this.body[0].y == food.y) {
            // 蛇加一节
            this.body.push({x:null, y:null, flag: null});
            // 清除食物,重新生成食物
            gameArea.removeChild(food.flag);
            food.display();
            //每次吃完一个，分数加一
            score += 1;
        }
        // 判断蛇是否会撞到自己
        for (var i=4; i<this.body.length; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                clearInterval(timer);   // 清除定时器
                alert("撞到自己啦！"+ "\n" +"game over"+ "\n" +"你当前的分数为" + score);
                score = 0;
                // 删除旧的蛇
                for (var i=0; i<this.body.length; i++) {
                    if (this.body[i].flag != null) {   // 如果刚吃完就死掉，会加一个值为null的
                        gameArea.removeChild(this.body[i].flag);
                    }
                }
                // 回到初始状态
                this.body = [
                    {x:3, y:0},   // 蛇头，第一个点
                    {x:2, y:0},   // 蛇身，第二个点
                    {x:1, y:0},   // 蛇身，第三个点
                    {x:0, y:0}    // 蛇尾，第四个点
                ];
                this.direction = 'right';
                this.display();   // 显示初始状态
                return false;  
            }
        }
        // 先删掉初始的蛇，然后再显示新蛇
        for (var i=0; i<this.body.length; i++) {
            if (this.body[i].flag != null) {   // 当吃到食物时，flag是等于null，且不能删除
                gameArea.removeChild(this.body[i].flag);
            }
        }
        this.display();
    }
}
// 构造食物
function Food(){
    this.width = 20;
    this.height = 20;
    this.display = function() {
        var foods = document.createElement('div');
        this.flag = foods;
        foods.style.width = this.width + 'px';
        foods.style.height = this.height + 'px';
        foods.style.background = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
        foods.style.borderRadius = '30%';
        foods.style.position = 'absolute';
        this.x = Math.floor(Math.random()*50);
        this.y = Math.floor(Math.random()*30);
        foods.style.left = this.x * this.width + 'px';
        foods.style.top = this.y * this.height + 'px';
        gameArea.appendChild(foods);
    }
}
var snake = new Snake();
var food = new Food();
// 初始化显示
snake.display();   
food.display();
// 用键盘控制上下左右方向
document.onkeydown = function(ev){
    var e = ev || window.ev || arguments.callee.caller.arguments[0];
    if(e && e.keyCode === 37 && snake.direction != "right"){
        snake.direction = "left";
    }else   if(e && e.keyCode === 38 && snake.direction != "down"){
        snake.direction = "up";
    }else   if(e && e.keyCode === 39 && snake.direction != "left"){
        snake.direction = "right";
    }else   if(e && e.keyCode === 40 && snake.direction != "up"){
        snake.direction = "down";
    }
}
var begin = document.getElementById('begin');
var pause = document.getElementById('pause');
var timer;
// 点击游戏开始按钮时，动起来
begin.onclick = function() {
    clearInterval(timer);
    timer = setInterval("snake.run()",speed);
};
// 点击游戏暂停按钮时，停下来
var stop = true;
if(stop){
    pause.onclick = function() {
        clearInterval(timer);
    };
    stop = false;
}else{
    pause.onclick = function() {
        clearInterval(timer);
        timer = setInterval("snake.run()",speed);
    };
}

//每加长5，速度提升10
if(!(score % 5) && speed > 10){
    clearInterval(timer);
    speed -= 10;
    snake.run();
    console.log(speed);
}
