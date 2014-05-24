# tps

Need to map points and arbitrary numbers? Want to make smooth curves through 2D points? Need to map a 3D surface to some parametric values?  Now you can!

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

  var TPS = require('thinplate');
  var tps = new TPS();
  
  var fitpoints = [ [0,1], [1,1], [2,5], [3,4] ];
  
  // we'll set the target to the be y value of each point
  // this will generate a curve that goes through our fitpoints
  var targets = fitpoints.map(function(curr){
      return curr[curr.length-1];
  });
  
  //compile requires fitpoints, target and a callback
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

> Interpolants:

> { points:
>   [ [ 1.1660324363037944, 0.7379827136173844 ],
>     [ 4.943687948398292, 1.89887385815382 ],
>     [ 3.4833541815169156, 3.287093739490956 ],
>     [ 0.6145973072852939, 1.3650325709022582 ],
>     [ 2.6240330061409622, 0.9449482103809714 ],
>     [ 1.5502887312322855, 3.6831764015369117 ],
>     [ 2.994071076391265, 2.252088625682518 ],
>     [ 1.197446616133675, 1.4506012364290655 ],
>     [ 0.9424605139065534, 1.6112763492856175 ],
>     [ 3.629288960946724, 4.808603440178558 ],
>     [ 0.5831408000085503, 0.6692629121243954 ],
>     [ 3.6797007732093334, 0.3617966652382165 ],
>     [ 2.060236781835556, 2.859311072388664 ],
>     [ 2.693928488297388, 0.8148085896391422 ],
>     [ 4.020067946985364, 0.18136795493774116 ],
>     [ 3.896827962016687, 0.9419577568769455 ],
>     [ 1.4890517154708505, 3.50763249094598 ],
>     [ 3.0175024759955704, 3.106624474748969 ],
>     [ 3.3926284743938595, 1.485266862437129 ],
>     [ 0.5304248095490038, 4.542987123131752 ] ],
>   ys:
>   [ 0.7379827136173848,
>     1.898873858153816,
>     3.287093739490954,
>     1.3650325709022586,
>     0.9449482103809709,
>     3.6831764015369113,
>     2.2520886256825166,
>     1.4506012364290657,
>     1.6112763492856177,
>     4.808603440178555,
>     0.6692629121243958,
>     0.3617966652382147,
>     2.8593110723886634,
>     0.8148085896391414,
>     0.18136795493773888,
>     0.9419577568769434,
>     3.50763249094598,
>     3.1066244747489677,
>     1.4852668624371275,
>     4.542987123131752 ] }

> Extrapolants:

> { points:
>   [ [ 9.578026714734733, 7.809491546358913 ],
>     [ 5.247805455001071, 5.745984495151788 ],
>     [ 9.327598995296285, 7.645306591875851 ],
>     [ 8.170095511013642, 7.498939319048077 ],
>     [ 9.131083018146455, 5.140102019067854 ],
>     [ 9.709282203111798, 6.906506152590737 ],
>     [ 9.921131376177073, 8.519855519989505 ],
>     [ 5.9878336964175105, 5.29511998873204 ],
>     [ 8.895162821281701, 7.863244080217555 ],
>     [ 7.442409429932013, 5.305958444951102 ],
>     [ 5.402141505619511, 8.139582391595468 ],
>     [ 8.877136517548934, 8.129552794853225 ],
>     [ 7.913758122595027, 5.604976019822061 ],
>     [ 7.692949516931549, 8.108028293354437 ],
>     [ 5.48744507948868, 8.015150462742895 ],
>     [ 8.229393989313394, 8.044363461667672 ],
>     [ 7.244396313326433, 7.616977741708979 ],
>     [ 7.11358247208409, 9.023020066088066 ],
>     [ 7.702594622969627, 9.023100400809199 ],
>     [ 9.260944521520287, 8.00756893120706 ] ],
>   ys:
>   [ 7.809491546358888,
>     5.74598449515178,
>     7.645306591875828,
>     7.498939319048058,
>     5.140102019067836,
>     6.906506152590713,
>     8.519855519989477,
>     5.295119988732031,
>     7.863244080217533,
>     5.30595844495109,
>     8.139582391595455,
>     8.129552794853202,
>     5.604976019822047,
>     8.108028293354417,
>     8.015150462742882,
>     8.044363461667652,
>     7.616977741708963,
>     9.023020066088046,
>     9.023100400809177,
>     8.007568931207038 ] }
```

# scripts

## test

runs the example tests.

# methods

``` js
var TPS = require('thinplate');
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
npm install thinplate
```
to get the library.

# license

MIT