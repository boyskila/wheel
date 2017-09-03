function WheelBuilder(prizes) {
    // var WHEEL_RADIUS = 205;
	//
    // var svg = d3.select('svg').data([prizes]);
    // var group = svg.select('g').append("g");
    // //create pie layout with sectors count based on data array length
    // var pie = d3.pie().value(function(){
    //     return 1;
    // });
	//
    // // declare an arc generator function
    // var arcGenerator = d3.arc().innerRadius(40).outerRadius(WHEEL_RADIUS);
    // // select paths, use arc generator to draw
    // var arcs = group.selectAll(".prize-sector")
    //     .data(pie).enter().append("g")
    //     .attr('class', 'prize-sector');
    // arcs.append("path").attr("d", generateSector).attr("fill", fillColor);
    // arcs.append("text").attr("transform", calculateTextPosition)
    //     .attr("text-anchor", "end").text(getDataText);
	//
    // function getDataText(d3Data, i) {
    //     return d3Data.data._spinAWheelPrize._name + ' ' + i;
    // }
	//
    // function calculateTextPosition(d3Data){
    //     var textAngle = (d3Data.startAngle + d3Data.endAngle) / 2;
    //     return `rotate(${textAngle * 180 / Math.PI - 90}) translate(${WHEEL_RADIUS - 50})`;
	//
    // }
    // function fillColor(d3Data){
    //     return d3Data.data._spinAWheelSector._sectorColor;
    // }
	//
    // function generateSector(d3Data) {
    //     return arcGenerator(d3Data);
    // }

	var RADIUS = 440;
    var halfOfRadius = RADIUS / 2
    function calculateSectors( data ) {
        var sectors = [];
        var angleInRadians = 0;
        var z = 0 // Size z
        var x = 0 // Side x
        var y = 0 // Side y
        var rotation = 0
        var angle = 360 * (10 / (data.length * 10));
        angel = ( angle > 180 ) ? 360 - angle : angle;
        data.map( function(item, key ) {
            angleInRadians = angel * Math.PI / 180;
            z = Math.sqrt( 2 * halfOfRadius * halfOfRadius - (2 * halfOfRadius * halfOfRadius * Math.cos(angleInRadians)));
            x = angel <= 90 ? halfOfRadius * Math.sin(angleInRadians) : halfOfRadius * Math.sin((180 - angel) * Math.PI / 180);

            y = Math.sqrt(z * z - x * x);

            if( angle <= 180 ) {
                x += halfOfRadius
            } else {
                x -= halfOfRadius;
            }
            console.log('X: '+x + ' ' + 'y:{ ' + y + '} Y: ' )
			console.log(item._spinAWheelSector._sectorColor);
            sectors.push({
                label: item._spinAWheelPrize._name,
                color: item._spinAWheelSector._sectorColor,
				icon: item._spinAWheelPrize._icon,
                X: x,
                Y: y,
                rotation: rotation
            });
			console.log(sectors);

            rotation += angle;
        });
        return sectors
    }

	function drawCircle() {
        sectors = calculateSectors(prizes);
        var i = 0;
        var deg = 0;
        var sectorsString = ''
		var iconOffset = sectors.length <= 3 ? 20 : 0;
        sectors.map( function(sector) {
            sectorsString += `
                <path d="M${halfOfRadius} ${halfOfRadius} L${halfOfRadius } 0 A${halfOfRadius} ${halfOfRadius} 1 0 1 ${sector.X} ${sector.Y} Z" fill="${sector.color}" transform="rotate(${sector.rotation}, ${halfOfRadius}, ${halfOfRadius})"></path>
                <defs>
                    <path id="w${++i}" d="M${halfOfRadius} ${halfOfRadius} L${halfOfRadius} 0" stroke"red" transform="rotate(${sector.rotation + 40}, ${halfOfRadius}, ${halfOfRadius})"></path>
                </defs>
                <text style="font-size:20px">
                    <textPath xlink:href="#w${i}" startOffset="60%" text-anchor="middle">${sector.label}</textPath>
                </text>
                <image xlink:href='${sector.icon}' x="280" y="75" preserveAspectRatio="none" transform="rotate(${sector.rotation + iconOffset}, ${halfOfRadius}, ${halfOfRadius})"></image>
            `
        })
        return sectorsString;
    }
    var svg = document.getElementById('circle-svg');

    svg.innerHTML = drawCircle();
}
