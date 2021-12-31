//柱状图
function Histogram(title,data,dataset){
	if(title.substring(0,2)=="全国"){
		data=data.slice(1);
	}
	
	var width=900;
	var height=670;
	var margin=90;
	var svg=d3.select('div.Histogram')
			.append('svg')
			.attr('width',width)
			.attr('height',height)
			.style('margin-left',15)
			// .style('border','1px solid green');
	var xScale=d3.scaleBand()
				.range([0,width-50])
				.padding(0.3);
	var yScale=d3.scaleLinear()
				.range([height-margin,0]);
	var g=svg.append('g')
			.attr('transform','translate('+40+','+50+')');
	
	xScale.domain(data.map(function(d){	
			let res="";
			if(title.substring(0,2)=="全国"){
				if(d.city.length<=3){
					res=d.city.substring(0,2);
				}else if(d.city.substring(0,3)=="黑龙江" || d.city.substring(0,3)=="内蒙古" ){
					res=d.city.substring(0,3);
				}else{
					res= d.city.substring(0,2);
				}
			}
			else{
				// console.log(d.city);
				res=d.city;
			}	
			return res;
		}),
	);
	yScale.domain([
		0,
		d3.max(data,function(d){
			return d[dataset];
		}),
	]);
	
	g.append('g')
		.attr('transform','translate(0,'+(height-margin)+')')
		.call(d3.axisBottom(xScale))
		.append('text')
		.attr('y',35)
		.attr('x',width-50)
		.attr('text-anchor','end')
		.attr('stroke','black')
		.attr('font-size','18px')
		.text('省份')
		
	g.append('g')
		.call(d3.axisLeft(yScale)
			.tickFormat(function(d){
				return d;
			})
			.ticks(25)
		)
		.append('text')
		.attr('y',-10)
		.attr('text-anchor','end')
		.attr('stroke','black')
		.attr('font-size','18px')
		.text('数量')
	
	//条形绘制
	const rect=g.selectAll('.brokenline')
		.data(data)
		.enter()
		.append('rect')
		.attr('class','brokenline')
		.attr('x',function(d){
			let res="";
			if(title.substring(0,2)=="全国"){
				if(d.city.length<=3){
					res=d.city.substring(0,2);
				}else if(d.city.substring(0,3)=="黑龙江" || d.city.substring(0,3)=="内蒙古" ){
					res=d.city.substring(0,3);
				}else{
					res= d.city.substring(0,2);
				}
			}
			else{
				res=d.city;
			}
			
			return xScale(res);
		})
		.attr('y',function(d){
			return yScale(d[dataset]);
		})
		.attr('width',xScale.bandwidth())
		.attr('height',function(d){
			return height-margin-yScale(d[dataset]);
		})
		.attr('fill','#99CCCC');
	
	svg.append("text")
		.attr("transform","translate(100,0)")
		.attr('x',width/4)
		.attr('y',30)
		.attr('font-size','22px')
		.text(title);
		
	//添加交互事件
	rect.on("mouseover",function(d,i){
			 // console.log(rect);
			 d3.select(this)
				  //普通函数this指向调用时的作用域
				 .attr("fill","#666699")
				 .text((d)=>{
					 return 20;
				 })
	})
	.on("mouseout",function(d,i){
			 d3.select(this)
				 .attr("fill","#99CCCC");
	})
}