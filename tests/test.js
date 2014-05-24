
var TPS = require('../tps');

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
  tps1D.getValues(pnts1D, function(err, result){
    if(err) {console.error(err); return;}
    
    console.dir(result);
  });
});

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

