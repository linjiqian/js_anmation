/**
 * Created by ThingLin on 2016/11/15.
 */


/**
 * 设置动画
 * @param element 元素
 * @param fields json格式要修改的属性值
 * @param callBackFun 动画完成回调的函数
 * @param speed 速度
 * @param frameSpeed 帧速度
 */
function startAnimation(element,fields,callBackFun,speed,frameSpeed){
        if (!speed)
            speed = 10;
        if (!frameSpeed)
            frameSpeed = 20;
        if (typeof(callBackFun) === "number")
            speed = callBackFun;
        //TODO 161129  getComputedStyle获得display = "inlineblock" 的DOM对象宽高将是auto，需要注意
        clearInterval(element.thingTimer);
        element.thingTimer = setInterval(function () {
            var flag = true;
            for (var field in fields) {
                if ("opacity" === field) {//处理透明度
                    var origin = getStyle(element, field) * 100;
                    var target = fields[field] * 100;
                    var skip = (target - origin) / speed;
                    skip = skip > 0 ? Math.ceil(skip) : Math.floor(skip);
                } else if ("zIndex" === field) {
                    element.style[field] = fields[field];
                } else {
                    var target = parseInt(fields[field]); //目标

                    var fiel = getStyle(element, field);
                    //auto特殊处理
                    if("auto" === origin){
                        if("width" === field)
                            fiel = element.offsetWidth;

                        if( "height" === field)
                            fiel = element.offsetHeight;
                    }

                    var origin = parseInt(fiel);//['ɔrɪdʒɪn] 起点
                    var skip = (target - origin) / speed;  //步长
                    skip = skip > 0 ? Math.ceil(skip) : Math.floor(skip); //方向控制
                    element.style[field] = origin + skip + "px";
                }
                origin = origin + skip;
                element.style[field] = origin / 100;//opacity没有单位
                if (target != origin)
                    flag = false;
            }
            if (flag) {
                clearInterval(element.thingTimer);
                if ((typeof callBackFun) === "function")
                    callBackFun();
            }
        }, frameSpeed);
};

/**
 * 获得计算后的属性值
 * @param element 元素
 * @param field 属性
 * @returns {*} 值
 */
function getStyle(element,field){
    if(window.getComputedStyle(element,null))
        return window.getComputedStyle(element,null)[field];
    else
        return element.currentStyle[field];
};