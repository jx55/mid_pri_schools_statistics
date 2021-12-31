const getschool=function(){
	school=d3.csv('./data/mydata.csv').then(function(data){
		console.log('读取数据成功！');
		// console.log(data);
		return data;
	});
	return school;
}
let province=[];
let province_show=[];
let res=[];
async function getData(){
	res=await getschool();
	// console.log(res);
	let obj1={
		city:'全国',
		mid_all_city:0,
		mid_cen_city:0,
		pri_all_city:0,
		pri_cen_city:0,
	};
	province.push(obj1);
	
	let j=0;
	for(let i=0;i<res.length;i++)
	{
		let str=res[i].城市;
		let re=/省|自治区|北京市|上海市|重庆市|天津市/g;
				
		if(re.test(str)){
			j++;
			var obj={
				city:str,
				mid_all_city:0,
				mid_cen_city:0,
				pri_all_city:0,
				pri_cen_city:0,
			};
			province.push(obj);
		}
		province[j].mid_all_city+=Number(res[i].普中全市);
		province[j].mid_cen_city+=Number(res[i].普中市辖区);
		province[j].pri_all_city+=Number(res[i].普小全市);
		province[j].pri_cen_city+=Number(res[i].普中市辖区);
	}
	// console.log(province);
	
	// let num=0;
	for(let k=0;k<province.length;k++){
		//去掉直辖市
		let re1=/全国|省|自治区/g;
		let str=province[k].city;
		if(re1.test(str)){
			province_show.push(province[k]);
		}
	}
	// console.log(province_show);
	
	var vm=new Vue({
		el:'#app',
		data:{
			province:province_show,
		},
		
	});
	
	BrokenLine('全国普通中学数量',province,Object.keys(obj)[1]);
	Pie('全国普通中学数量',province,Object.keys(obj)[1]);
	Histogram('全国普通中学数量',province,Object.keys(obj)[1]);
	
	window.onload=function(){
		//初始化
		var start=document.getElementsByTagName('button');
		start[0].style.backgroundColor='#99CCCC';
		
		function setStyle(){
			let btns=document.getElementsByTagName('button');
			for(let i=0;i<btns.length;i++){	
				btns[i].style.backgroundColor='ghostwhite';
			}
		}
		
		let btns=document.getElementsByTagName('button');
		for(let i=0;i<btns.length;i++)
		{
			btns[i].onclick=function(e){
				// console.log(e.target.innerHTML);
				setStyle();
				city_value=e.target.innerHTML;
				e.target.style.backgroundColor='#99CCCC';
				// console.log("getCity(): "+school_value,region_value,city_value);
				Show(school_value,region_value,city_value);
			}
		}
	}

}
getData();