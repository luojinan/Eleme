/*
 *需求：
 *	作用：根据引用该模块传入的格式(yyyy mm ...)进行格式化 数字日期(date.get...)
 *	可能情况：
 *		年份：yy / yyyy 
 *		月日: m / mm
 *
 *使用方法：
 *		根据正则表达式的匹配和替换，把数字转化为字符串进行截取操作等
*/




export function formatDates(date,fmt){
	//使用到正则表达式的寻找、替换
	if(/(y+)/.test(fmt)){	//寻找在fmt中的y+（正则语法即:yyyy）
		//替换掉数据
		//RegExp.$1是正则匹配到的值即yyyy
		//正常可直接替换成数字，但是有时需要年为后2位，就需要转为字符串，并截取后2位
		fmt = fmt.replace( RegExp.$1 , (date.getFullYear()+'').substr(4-RegExp.$1.length) )
	}

	//月日等，列成一个对象来遍历循环，因为是一样的
	let o = {
		'M+' : date.getMonth() + 1 , 	//以字符串对应日期的数字
		'd+' : date.getDate() ,
		'h+' : date.getHours() ,
		'm+' : date.getMinutes() ,
		's+' : date.getSeconds() ,
	}
	for (let item in o){
		//寻找在fmt中的对象键值的字符串，要用方法才行
		if(new RegExp(`(${item})`).test(fmt)){
			//把月日等数字变成字符串
			let num = o[item] + '';
			//替换原字符串
			//判断输入要求月日格式是否需要加0,根据fmt判断
			fmt = fmt.replace(RegExp.$1 , (RegExp.$1.length===1)?num : padLeftZero(num))
		}
	}

	return fmt
};

	function padLeftZero(num){
		//根据要求格式的长度截取第几个
		return ('00'+num).substr(num.length)
	}