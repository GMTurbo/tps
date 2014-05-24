
var RBF = require('../rbf');

var target = [10,20,30,40];

var rbf1D = new RBF();

var pnts1D = [
  [10],
  [20],
  [30],
  [40]
  ];

rbf1D.compile(pnts1D, target, function(err, data){
  if(err){
    console.error(err);
    return;
  }
  if(data.result == 'success'){
    console.log('worked!');
    rbf1D.getValues(pnts1D, function(err, result){
      if(err) {console.error(err); return;}
      
      console.dir(result);
    });
  }
});

var rbf2D = new RBF();

var pnts2D = [
  [10, 10],
  [20, 10],
  [30, 20],
  [40, 100]
  ];

rbf2D.compile(pnts2D, target, function(err, data){
  if(err){
    console.error(err);
    return;
  }
  if(data.result == 'success'){
    console.log('worked!');
    rbf2D.getValues(pnts2D, function(err, result){
      if(err) {console.error(err); return;}
      
      console.dir(result);
    });
  }
});

var pnts3D = [
  [0, 0, 1],
  [0, 1, 0],
  [1, 0, 0],
  [1, 0, 1]
];

var rbf3D = new RBF();

rbf3D.compile(pnts3D, target, function(err, data){
  if(err){
    console.error(err);
    return;
  }
  if(data.result == 'success'){
    console.log('worked!');
    rbf3D.getValues(pnts3D, function(err, result){
      if(err) {console.error(err); return;}
      
      console.dir(result);
    })
  }
});

