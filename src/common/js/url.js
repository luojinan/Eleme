/*
 *解析url参数 urlParse()
 *得到的是?id=12354&a=b
 *
 *利用正则匹配拆解成对象{id:12345, a:b}
*/

export function urlParse(){
	//获取hash
	let url = window.location.search;
	let obj = {};	//创建空对象，赋值进去
	let reg = /[?&][^?&]+=[^?&]+/g ;	//正则规则
	let arr = url.match(reg) ;	//根据正则规则拆分成数组['?id=12345' , '&a=b']
	//遍历循环这个数组，拆分成键值对
	if(arr){
		arr.forEach((item)=>{
			//把?id=12345，根据=拆分成数组
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
		});
	} ;
	return obj;
}