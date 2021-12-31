//饼图
function Pie(title,data,dataset){
	if(title.substring(0,2)=="全国"){
		data=data.slice(1);
	}
	//处理多余数据
	data=pieHandler(data,dataset);
	
	var width=900;
	var height=530;
	var svg=d3.select('div.Pie')
			.append('svg')
			.attr('width',width)
			.attr('height',height)
			.style('margin-left',15)
			.style('margin-top',10)
			// .style('border','1px solid black');
	var radius=Math.min(width,height-50)/2,
	g=svg.append('g')
		.attr('transform','translate('+width/2+','+height/2+')');
		
	var color=d3.scaleOrdinal([
		'#4daf4a',
		'#377eb8',
		'#ff7f00',
		'#984ea3',
		'#e41a1c',
		'#550000',
		'#00ffff',
		'#5500ff',
		'#ffaaff',
		'#ff530f'
	]);
	var pie=d3.pie()
			.value(function(d){
				return d[dataset];
			})
	var arc=d3.arc()
			.innerRadius(0)
			.outerRadius(radius)
	//定义标签所在的位置
	var label=d3.arc()
				.outerRadius(radius)
				.innerRadius(radius-80);
	
	var arcs=g.selectAll('arc')
			.data(pie(data))
			.enter()
			.append('g')
			.attr('class','arc')
	arcs.append('path')
		.attr('fill',function(d,i){
			return color(i);
		})
		.attr('d',arc);
	arcs.append('text')
		.attr('transform',function(d){
			return 'translate('+label.centroid(d)+')';
		})
		.attr("text-anchor","middle")
		.text(function(d){
			// return d.data.city.substring(0,2);
			return d.data.city;
		});
	
	svg.append('g')
		.attr('transform','translate('+(width/2-50)+','+20+')')
		.append("text")
		.text(title)
		.attr('class','title')
		.style('font-size',20)
}

function pieHandler(datas,dataset){
	// console.log("pieHandler");
	//对饼图的数据进行处理
	let arrp=datas;
	for(let i=0;i<arrp.length;i++){
		for(let j=0;j<arrp.length;j++){
			if(arrp[i][dataset]>arrp[j][dataset]){
				let tmp=arrp[i];
				arrp[i]=arrp[j];
				arrp[j]=tmp;
			}
		}
	}
	// console.log(arrp);
	let newData=[];
	let count=0;
	for(let k=0;k<arrp.length;k++)
	{
		if(k>=13){
			count+=arrp[k][dataset];
		}
		else{
			newData.push(arrp[k]);
		}
	}
	if(count!=0){
		var o={
			city:"其他",
			[dataset]:count,
		};
		newData.push(o);
		// console.log(newData);
		return newData;
	}
	// console.log(arrp);
	return arrp;
}