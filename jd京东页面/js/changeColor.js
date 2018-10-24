var top1=$('.jd_header_box');
console.log(top1);

var scrollFunc = function(e) {
    var direct = 0;
    e = e || window.event;
    if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件             
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            // alert("滑轮向上滚动");
            top1.css({backgroundColor:'red'});
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
           console.log('e.wheelDelta==>',e.wheelDelta);
           top1.css({backgroundColor:'red'});
        }
        else{
             top1.css({backgroundColor:'transparent'});
        }
    } else if (e.detail) { //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向上滚动时
        }
        if (e.detail < 0) { //当滑轮向下滚动时
        }
    }
    // ScrollText(direct);
}
//给页面绑定滑轮滚动事件
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;

