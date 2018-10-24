function Banner() {

	//轮播盒子
	this.banner = this.getElement('#jd_banner');

	//轮播图片的ul
	this.bannerUl = this.getElement('#bannerUl');

	//当前轮播图片索引
	this.index = 1;

	//轮播索引元素
	this.indexs = this.getElements('#bannerIndex>li');

	//获取轮播图片张数
	this.counts = this.indexs.length;

	//保存轮播ul每移动一张图片的距离
	this.width = this.banner.offsetWidth;

	//图片轮播每一步执行的时间
	this.interval = 30;

	//保存自动轮播定时器序号
	this.timer = null;

	//自动轮播时长
	this.duration = 2000;

	//初始化
	this.init();
}


//获取一个元素
Banner.prototype.getElement = function (selector) {
	
	return document.querySelector(selector);
}

//获取多个元素
Banner.prototype.getElements = function (element, selector) {
	//element: DOM元素
	//selector: css选择器
	selector = selector ? selector : element;

	return element.nodeType == 1 ? element.querySelectorAll(selector) : document.querySelectorAll(selector);
}

//封装事件方法
Banner.prototype.addEvent = function (elements, type, fn, isCapture) {
	//elements: 元素列表
	//type: 事件类型
	//fn: 事件执行的回调函数
	//isCapture: 是否捕获触发事件

	isCapture = isCapture ? true : false;
	//绑定事件兼容写法
	if (window.addEventListener) {
		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener(type, fn, isCapture);
		}
	} else {
		for (var j = 0; j < elemets.length; j++) {
			elements[j].attachEvent('on' + type, fn);
		}
	}
}

//图片移动
Banner.prototype.moving = function () {

	var self = this;

	var timer = setInterval(function () {
		
		//获取轮播ul移动之前的left
		var beforeLeft = parseInt(getComputedStyle(self.bannerUl).left);

		//轮播之后轮播ul的left
		var currentLeft = -self.index * self.width;

		//每一步移动的距离
		var speed = (currentLeft - beforeLeft) / 6;

		//取整 0.12 ==> 1, -0.12 ==> -1
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		//设置每一步移动之后的left
		self.bannerUl.style.left = (beforeLeft + speed) + 'px';

		//移动完成, 清楚定时器
		if (speed == 0) {
			clearInterval(timer);
			timer = null;
		}

	}, self.interval);

}

//上一张
Banner.prototype.prev = function () {
	this.index--;

	if (this.index < 0) {
		this.bannerUl.style.left = -this.counts * this.width + 'px';
		this.index = this.counts - 1;
	}

	this.moving();

	var i = this.index == 0 ? this.counts : this.index;
	this.activeIndex(i - 1);
}
	
//下一张
Banner.prototype.next = function () {
	this.index++;

	if (this.index > this.counts) {
		this.bannerUl.style.left = 0 + 'px';
		this.index = 1;
	}
			
	this.moving();
	this.activeIndex(this.index - 1);
}

//激活索引
Banner.prototype.activeIndex = function (n) {
	//激活索引
	for (var i = 0; i < this.indexs.length; i++) {
		if (this.indexs[i].className == 'active') {
			this.indexs[i].className = '';
			break;
		}
	}

	this.indexs[n].className = 'active';
	
}

//自动轮播
Banner.prototype.autoplay = function () {
	var self = this;
	self.timer = setInterval(function () {

		self.next();

	}, self.duration);
}


//初始化
Banner.prototype.init = function () {

	var self = this;

	//索引点击事件
	self.addEvent(self.indexs, 'click', function () {
		var index = this.getAttribute('name');
		self.index = index;
		self.moving();

		self.activeIndex(index - 1);

	})

	self.addEvent([self.banner], 'mouseover', function () {
		clearInterval(self.timer);
		self.timer = null;
	})

	self.addEvent([self.banner], 'mouseout', function () {
		self.autoplay();
	})

	self.autoplay();
}

