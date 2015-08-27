//Panther puppet script
//Testing code

var This = new Avatar("panther");

var pause = false;

This.Joints = 10;

This.angConstraint = [
    
    [-180,180], [-180,180], [-180,180], [-180,180], [-180,180],
    
    [-180,180], [-180,180], [-180,180], [-180,180], [-180,180]
    
];

This.setConstraints = function( arr ) {
    
    if ( Array.isArray(arr)===false ) {
        
        return -1; // Not array
    
    }
    
    if ( arr.length === 0 ) {
        
        return -2; // Empty Array
    
    }
    
    var sz = min(arr.lenth, This.Joints); // this.Joints
    
    for (var i=0; i<sz; i++) {

        var tuple = arr[i];

        if ( Array.isArray(tuple) && tuple.length===2 ) {

            if ( tuple[0] >= tuple[1] ) {

                return -3; // Inverted range

            }

            This.angConstraint[i] = tuple;

        } else {

            return -4; // Not array range with 2 values

        }

    }

    return 0;

};

This.NewRotate = function(i, delta) {

    var ang = This.getAngle(i);

    var ang2 = ang + delta;

    var mn = This.angConstraint[i][0];

    var mx = This.angConstraint[i][1];

    if ( ang2>=mn && ang2<=mx ) {

        This.rotate(i, delta);

    }

};

This.drawPivots = function(x,y) {

    //matrix(0.63255287,0,0,0.63255287,-11.570506,-36.480967)
    
    var sx = 0.63255287;
    
    var sy = 0.63255287;
    
    var dx = -11.570506;
    
    var dy = -36.480967;

    This.draw(x,y);

    fill(255, 196, 0);

    for (var i=0; i<This.Joints; i++) {

        switch (i) {

            case 2: case 4: // codos

            case 7: case 9:

                pushMatrix();

                var xg = sx * This.p[i-1].x + dx + x - 200;

                var yg = sy * This.p[i-1].y + dy + y - 200;

                translate(xg,yg);

                rotate(This.getAngle(i-1));

                translate(-xg,-yg);

        }

        ellipse(sx*This.p[i].x+dx+x-200, sy*This.p[i].y+dy+y-200, 10, 10);

        switch (i) {

            case 2: case 4: // codos

            case 7: case 9:

                popMatrix();

        }

    }

};

//noCursor();

frameRate(15);

smooth();

var st = This.setConstraints( [  // panther

    [-20,20], [-5,140], [0,80], [-140,5], [0,80],

    [-85,5], [-10,15], [-10,15], [-10,10], [-20,15],

] );

var draw = function()

{

    fill(127, 165, 176, 99);

    rect(0,0,400,400);

    for (var i=0; i<This.Joints; i++) {

        This.NewRotate(i,random(-9,9));

    }

    This.drawPivots(mouseX,mouseY);

};

var mouseClicked = function() {

    if (pause) {

        loop();

    } else {

        noLoop();

    }

    pause = !pause;

};
