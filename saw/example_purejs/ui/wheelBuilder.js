function WheelBuilder(prizes) {
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
        data.map(function(item, key) {
            angleInRadians = angel * Math.PI / 180;
            z = Math.sqrt( 2 * halfOfRadius * halfOfRadius - (2 * halfOfRadius * halfOfRadius * Math.cos(angleInRadians)));
            x = angel <= 90 ? halfOfRadius * Math.sin(angleInRadians) : halfOfRadius * Math.sin((180 - angel) * Math.PI / 180);

            y = Math.sqrt(z * z - x * x);

            if( angle <= 180 ) {
                x += halfOfRadius
            } else {
                x -= halfOfRadius;
            }
            sectors.push({
                label: item._spinAWheelPrize._name,
                color: item._spinAWheelSector._sectorColor,
                icon: item._spinAWheelPrize._icon,
                X: x,
                Y: y,
                rotation: rotation
            });
            rotation += angle;
        });
        return sectors
    }

    var sectorConfig = function(sectorsCount) {
        var rotationIconOffset = 88;
        var iconOffsetY = 235;
        var textOffsetY = 245;
        var textOffsetX = 285;
        var rotationOffset = 89;

        switch (sectorsCount) {
            case 2:
                rotationIconOffset = 0;
                iconOffsetY = 200;
                textOffsetY = 210;
                rotationOffset = 0;
                break;
            case 3:
                rotationIconOffset = 27;
                iconOffsetY = 185;
                textOffsetY = 220;
                rotationOffset = 45;
                break;
			case 4:
                rotationIconOffset = 35;
                iconOffsetY = 190;
                rotationOffset = 50;
                break;
			case 3 || 4:
				textOffsetX = 290;
            default:
                break;
        }
        return {
            rotationIconOffset: rotationIconOffset,
            iconOffsetY: iconOffsetY,
            textOffsetY: textOffsetY,
            textOffsetX: textOffsetX,
            textRotationOffset: rotationOffset
        }
    };

    function drawCircle() {
        var sectors = calculateSectors(prizes);
        var config = sectorConfig(sectors.length)
        var sectorsString = '';
        sectors.map( function(sector, i) {
			var textXoffset = sector.label.length <= 10 ? 20 : 5;
            sectorsString += `
                <path
					d="M${halfOfRadius} ${halfOfRadius}
					   L${halfOfRadius } 0
					   A${halfOfRadius} ${halfOfRadius} 1 0 1 ${sector.X} ${sector.Y} Z"
					fill="${sector.color}"
					transform="rotate(${sector.rotation}, ${halfOfRadius}, ${halfOfRadius})">
				</path>
                <text
					fill= "#fff"
					style="font-family: NotoSans, Bold; font-size:15px"
					x="${config.textOffsetX + textXoffset}"
					y="${config.textOffsetY}"
					transform="rotate(${sector.rotation - config.textRotationOffset}, 220, 220)">
                    ${sector.label.toUpperCase()} ${i}
                </text>
                <image
					xlink:href='${sector.icon}'
					x="310"
					y="${config.iconOffsetY}"
					transform="rotate(${sector.rotation - config.rotationIconOffset}, ${halfOfRadius}, ${halfOfRadius})">
				</image>
            `
        })
        return sectorsString;
    }
    var svg = $('#circle-svg');
    svg.html(drawCircle());
}
