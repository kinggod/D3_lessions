/* *
* timeline diagram 
**/

d3.components.timelineDiagram = {
	type: 'timeline diagram',
	schema: {
		type: 'object',
		entries: [
          {
          	key: 'date',
          	type: 'date',
          	mappings : [

             'time',
             'year'
          	]
          },

          {
          	key: 'text',
          	type: 'string',
          	mapping: [
             'content',
             'info',
             'name'

          	]
          },

          {
          	key: 'img',
          	type: 'string',
          	mappings: [
              'icon',
              'image',
              'picture',
              'photo'
          	]
          }
   
		]
	},
	sort: 'ascending(date)',
	axis: {
		show:true,
		label:true,
		nice:false,
		format:"%Y",
		stroke: 'currebtColor',
		strokeWidth:1,
		fill: 'currentColor',
		fontSize: '0.5em',
		domain:  {
			stroke:'currentColor',
			strokeWidth:1
		},
		ticks: {
			number:8,
			sizeInner:0,
			sizeOuter:0,
			padding:4,
            format: ''

		}
	},

	items: {
		stroke: 'currebtColor',
		strokeWidth: 1,
		fill: 'currentColor',
		fontSize: '0.65em'
	},

	connectors: {
		dx:0,
		dy:'3.5%',
		stroke: 'currebtColor',
		strokeWidth: 1,
		fill:'#fff'
	},
	knots: {
		radius: '0.5%',
		stroke: '#1f77b4',
		strokeWidth:1,
		fill:'#fff'
	},
	images: {
		maxWidth: '6%',
		maxHeight: '6%'
	},

	tooltip: {
		html: function (d) {
			return d3.timeFormat('%Y-%m-%d')(d.date);

		}
	};


	//Timeline diagram

	d3.timelineDiagram = function (data,options) {
		//Parse plotting data and options

		data = d3.parseData ('timelineDiagram', data);
		options = d3.parseOptions('timelineDiagram', options);

		//Register callbacks
		var dispatch = d3.dispatch('init','uodate', 'finalize');

		//use the options 

		var chart = options.chart;
		var renderer = options.renderer;
		var context = options.context;
		var width = options.width;
		var height = options.height;
		var innerWidth = options.innerWidth;
		var innerHeight = options.innerHeight;
		var margin = options.margin;
		var stroke = options.stroke;
		var strokeWidth = options.strokeWidth;
		var colorScheme = options.colorScheme;
		var fontSize = options.fontSize
        var lineHeight = options.lineHeight;

        //Domain

        var domain = options.domain;
        if(Array.isArray(domain) && domain.length) {
        	domain = domain.map(function (d) {
        		return new Date(d);
        	});

        	data = data.filter(function (d) {
        		return d.date >= domain[0]&&d.date<domain[1];
        	});  //这过滤什么意思

        }else{
        	domain = d3.extent(data, function(d) {
        		return d.date
        	});  

        //scale
        var axis = options.axis;
        var scale = d3.scaleLinear()
                      .domain(domain)
                      .rangeRound([0,innerWidth]); //设置比例尺的输出范围，并四舍五入

        if(axis.nice) {
        	scale.nice();  //扩展比例尺的定义域为一个优化的定义域。
        	console.log(scale.nice());
        }

        if(d3.type(options.sort) === 'function') {
        	data.sort(options.sort);
        }

        if(renderer === 'svg') {
        	//create svg

        	var svg = d3.createPlot(chart,options);
        	var g = svg.select('.container')
        	           .attr('transform', d3.translate(margin.left,margin.top));
        }

        //Axis 

        var origin = options.origin || [0,innerHeight/2];

        console.log(origin);
        var startX = orgin[0];  // 这是啥
        var startY = orgin[1];

	}
}