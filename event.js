let school_value="middle_school";
let region_value="city_all";
let city_value="全国";

//映射
const MapArray=[
	{
		name:"middle_school",
		key:'普通中学',
	},
	{
		name:'primary_school',
		key:'普通小学'
	},
	{
		name:'city_all',
		key:"全市"
	},
	{
		name:"city_center",
		key:"市辖区"
	}
];
function findWord(w){
	for(let i=0;MapArray.length;i++)
	{
		if(MapArray[i].name === w){
			return MapArray[i].key;
		}
	}
}
function space(ss){
	let str="";
	let l=0;
	for(;l<ss.length;l++){
		if(ss[l]==' ') continue;
		else break;
	}
	for(;l<ss.length;l++)
		str+=ss[l];
	return str;
}

// console.log(province);
function HandlerSub(a,b){
	if(a==='middle_school' && b==='city_all'){
		return 'mid_all_city';
	}
	else if(a==='middle_school' && b==='city_center'){
		return 'mid_cen_city';
	}
	else if(a==='primary_school' && b==='city_all'){
		return 'pri_all_city';
	}
	else if(a==="primary_school" && b==='city_center'){
		return 'pri_cen_city';
	}
}

function Show(sch,reg,cit){
	// console.log("event.js:"+sch,reg,cit);
	let s=findWord(sch);
	let r=findWord(reg);
	//清除之前的画布
	d3.selectAll('svg').remove();
	
	// console.log(cit);
	//对数据进行处理
	let Arr=[];
	if(city_value==='全国') Arr=province;
	else{
		// console.log(res);
		var obj={
			city:"",
			mid_all_city:0,
			mid_cen_city:0,
			pri_all_city:0,
			pri_cen_city:0,
		};
		let flag=false;
		for(let j=0;j<res.length;j++)
		{
			if(res[j].城市 === cit){
				var str=res[j].城市;
				var re=/北京市|上海市|重庆市|天津市/g;
				if(re.test(str)){
					// obj.city=space(res[j].城市);
					// obj.mid_all_city+=Number(res[j].普中全市);
					// obj.mid_cen_city+=Number(res[j].普中市辖区);
					// obj.pri_all_city+=Number(res[j].普小全市);
					// obj.pri_cen_city+=Number(res[j].普中市辖区);
					// Arr.push(obj);
					// obj={
					// 	city:"",
					// 	mid_all_city:0,
					// 	mid_cen_city:0,
					// 	pri_all_city:0,
					// 	pri_cen_city:0,
					// };
					
					//将直辖市的数据清空
					// console.log(str);
					break;
				}
				flag=true;
				continue;
			}
			if(flag){
				var re1=/省|自治区|北京市|上海市|重庆市|天津市/g;
				if(re1.test(res[j].城市)){
					flag=false;
					break;
				}
				obj.city=space(res[j].城市);
				obj.mid_all_city=Number(res[j].普中全市);
				obj.mid_cen_city=Number(res[j].普中市辖区);
				obj.pri_all_city=Number(res[j].普小全市);
				obj.pri_cen_city=Number(res[j].普中市辖区);
				Arr.push(obj);
				obj={
					city:"",
					mid_all_city:0,
					mid_cen_city:0,
					pri_all_city:0,
					pri_cen_city:0,
				};
			}
		}
	}
	console.log(Arr);
	
	let Arr1=JSON.parse(JSON.stringify(Arr));
	// console.log(Arr1);
	var handlersub=HandlerSub(sch,reg);
	BrokenLine(cit+s+r+'数量',Arr,handlersub);
	Pie(cit+s+r+'数量',Arr1,handlersub);	
	// console.log(Arr);
	Histogram(cit+s+r+'数量',Arr,handlersub);
}

function getSchool1(){
	let radio_school=document.getElementsByName('school_type');
	for(let i=0;i<radio_school.length;i++)
	{
		if(radio_school[i].checked){
			school_value=radio_school[i].value;
			// console.log(school_value);
		}
	}
	// console.log("getSchool(): "+school_value,region_value,city_value);
	Show(school_value,region_value,city_value);
}

function getSchool2(){
	let radio_region=document.getElementsByName('region_type');
	for(let i=0;i<radio_region.length;i++)
	{
		if(radio_region[i].checked){
			region_value=radio_region[i].value;
			// console.log(region_value);
		}
	}
	// console.log("getRegion(): "+school_value,region_value,city_value);
	Show(school_value,region_value,city_value);
}