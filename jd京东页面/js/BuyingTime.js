var time=$('#time');

//抢购定时器序号
	var timer = null;
	//设置抢购倒计时
	function setCountDwonTime() {
		timer = setInterval(function () {
			$('#time').each(function () {
				var isHot = Boolean($(this).data('ishot'));
				
				if (isHot) {
					var endTime = new Date($(this).data('time')).getTime();
					var currentTime = new Date().getTime();
					var time = endTime - currentTime;
					var days = Math.floor(time / 1000 / 60 / 60 / 24 % 24);
					days = days > 10 ? days : '0' + days;
					var hours = Math.floor(time / 1000 / 60 / 60 % 24);
					hours = hours > 10 ? hours : '0' + hours;
					var minutes = Math.floor(time / 1000 / 60 % 60);
					minutes = minutes > 10 ? minutes : '0' + minutes;
					var seconds = Math.floor(time / 1000 % 60);
					seconds = seconds > 10 ? seconds : '0' + seconds;
					$(this).text(hours + ' : ' + minutes + ' : ' + seconds);
				}
			})
		}, 1000);
	}

	// var topHeight=$('.jd_header_box').height();
	// $(".middle").on("scroll",function(){
	// var scrollTop = $(".middle").scrollTop();
	// if(scrollTop>topHeight){
	// 	$('.top').css({background:"#e4393c"})
	// }else{
	// 	$('.top').css({background:"none"})
	// }
	// })
