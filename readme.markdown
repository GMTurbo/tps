# tps

Need to map points and arbitary numbers? Want to make smooth curves through 2D points? Need to map a 3D surface to some parametric values?  Now you can!

# example

map some 1D points to some values

```
var target = [10,20,30,40];

var tps1D = new TPS();

var pnts1D = [
  [10],
  [20],
  [30],
  [40]
  ];

tps1D.compile(pnts1D, target, function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('worked!');
  rbf1D.getValues(pnts1D, function(err, result){
    if(err) {console.error(err); return;}
    
    console.dir(result);
  });
});


// results
//     10.000000000000007,
//     19.99999999999992,
//     29.999999999999442,
//     39.99999999999844 ]

```

map some 2D points to some values

```
var tps2D = new TPS();

var pnts2D = [
  [10, 10],
  [20, 10],
  [30, 20],
  [40, 100]
  ];

tps2D.compile(pnts2D, target, function(err){
  
  if(err){
    console.error(err);
    return;
  }
  
  console.log('worked!');
  tps2D.getValues(pnts2D, function(err, result){
    if(err) {console.error(err); return;}
    
    console.dir(result);
  });
  
});
// results
//     10.000000000000007,
//     19.99999999999992,
//     29.999999999999442,
//     39.99999999999844 ]
```

map some 3D points to some values

```

var pnts3D = [
  [0, 0, 1],
  [0, 1, 0],
  [1, 0, 0],
  [1, 0, 1]
];

var tps3D = new TPS();

tps3D.compile(pnts3D, target, function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('worked!');
  tps3D.getValues(pnts3D, function(err, result){
    if(err) {console.error(err); return;}
    
    console.dir(result);
  })
});

```

# details

Thin plate splines (TPS) are an interpolation and smoothing technique, the generalisation of splines so that they may be used with two or more dimensions.

Uses:

* Image processing (deformation)
* Surface Creation (generate complete surface from uneven grid of points)
* Data interpolation (create full colormaps with only a few target points)
* A ton more.

The best part:
once the RBF is compiled, it is a complete mapping!  That means it will interpolate AND extrapolate values for you.

# usage

```
usage:

  var TPS = require('tps');
  var tps = new TPS();
  
  var fitpoints = [ [0,1], [1,1], [2,5], [3,4] ];
  
  // we'll set the target to the be y value of each point
  // this will generate a curve that goes through our fitpoints
  var targets = fitpoints.map(function(curr){
      return curr[curr.length-1];
  });
  
  //compile requires fitpoint, target and a callback
  // callback returns error if there is one
  tps.compile(fitpoints, targets, function(err){
    if(err){
      console.error(err);
      return;
    }
    
    //now that it compiled we can use it.
    
    //fill out some random points to interpolate
    // (interpolation happens within the fitpoint boundaries)
    var pnts = [];
    for(var i = 0 ; i < 20; i++){
      pnts.push([Math.random() * 5, Math.random() * 5]);
    }
    
    //have the tps solve for the values!
    tps.getValues(pnts, function(err, result){
  
        if(err) {
          console.error(err);
          return;
        }
    
        console.dir(result);
      });
      
    //fill out some random points to extrapolate
    // (extrapolation happens outside the fitpoint boundaries)
    var pnts = [];
    for(var i = 0 ; i < 20; i++){
      pnts.push([5 + Math.random() * 5,  5 + Math.random() * 5]);
    }
    
    //have the tps solve for the values!
    tps.getValues(pnts, function(err, result){
  
        if(err) {
          console.error(err);
          return;
        }
    
        console.dir(result);
      });
  });

```

# scripts

## test

runs the example tests.

# methods

``` js
var TPS = require('tps');
```

## var tps = new TPS();

Create a new thin-plate spline instance;

## tps.compile(fitpoints, targets, cb);

FITPOINTS MUST BE UNIQUE!

fitpoint and target counts must be the same.

The more fitpoints you have, the longer it takes to compile.

`cb(err)` signature.

## tps.getValues(points, cb)

* points must have same dimension as original fitpoints.
* `cb(err, results)` signature
* `results.ys` is the calculated interpolants
* `results.points` are the inputted points

## tps.getValue(point)

* returns a calculated interpolant (number) from a single fitpoint.

# install

With [npm](https://npmjs.org) do:

```
npm install tps
```
to get the library.

# license

MIT