//散点图
function BrokenLine(title,data,dataset){
	if(title.substring(0,2)=="全国"){
		data=data.slice(1);
	}
	
	var width=900;
	var height=670;
	var margin=80;
	var svg=d3.select('div.BrokenLine')
			.append('svg')
			.attr('width',width)
			.attr('height',height)
			.style('margin-left',15)
			.style('margin-top',5)
			// .style('border','1px solid red');
	let g=svg.append('g')
				.attr("width",width-margin)
				.attr('height',height-margin)
				.attr('transform','translate('+40+','+40+')');
	
	var xScale=d3.scaleBand()
				.range([0,width-50])
	var yScale=d3.scaleLinear()
				.range([height-margin,0]);	
	xScale.domain(data.map(function(d){
			// console.log(xScale(d.city.substring(0,2)));
			let res="";
			if(title.substring(0,2)=="全国"){
				if(d.city.length<=3){
					res= d.city.substring(0,2);
				}else if(d.city.substring(0,3)=="黑龙江" || d.city.substring(0,3)=="内蒙古"){
					res=d.city.substring(0,3);
				}else{
					res= d.city.substring(0,2);
				}
			}else{
				res= d.city;
			}
			// console.log(res);
			return res;
		}),
	);
	
	yScale.domain([
		0,
		d3.max(data,function(d){
			// return d.mid_all_city;
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
				.ticks(20)
		)
		.append('text')
		.attr('y',-10)
		.attr('text-anchor','end')
		.attr('stroke','black')
		.attr('font-size','18px')
		.text('数量')

	let dist=0;
	if(data.length>1){
		let ss=data[1].city;
		let res="";
		// dist=xScale(data[1].city.substring(0,2))/2;
		if(title.substring(0,2)=="全国"){
			if(ss.length<=3){
				res=ss.substring(0,2);
			}else if(ss.substring(0,3)=="黑龙江" || ss.substring(0,3)=="内蒙古" ){
				res=ss.substring(0,3);
			}else{
				res= ss.substring(0,2);
			}
		}else{
			res=ss;
		}
		dist=xScale(res)/2;
	}
	else dist=400;
	let circle=g.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.attr('fill','#336699')
				.attr('cx',(d)=>{
					let res="";
					if(title.substring(0,2)=="全国"){
						if(d.city.length<=3){
							res=d.city.substring(0,2);
						}else if(d.city.substring(0,3)=="黑龙江" || d.city.substring(0,3)=="内蒙古" ){
							res=d.city.substring(0,3);
						}else{
							res= d.city.substring(0,2);
						}
					}else{
						res=d.city;
					}
					// console.log(xScale(res));
					return xScale(res)+dist;
				})
				.attr('cy',(d)=>{
					// return yScale(d.mid_all_city);
					return yScale(d[dataset]);
				})
				.attr('r',3);
	
	// console.log(dist);
	svg.append("text")
		.attr("transform","translate(100,0)")
		.attr('x',width/4)
		.attr('y',30)
		.attr('font-size','22px')
		.attr('margin-bottom',"30px")
		.text(title);
}