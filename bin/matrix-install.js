#!/usr/bin/env node

require('./matrix-init');

require('./matrix-validate');
var program = require('commander');

program
  .parse(process.argv);

var pkgs = program.args;

var cmd = pkgs[0];
//target
var t = pkgs[1];

//Defaults to app
if (pkgs.length === 1) {
  t = cmd;
  cmd = 'app';
}

  if ( cmd.match(/a|ap|app|-a|--app/) ){
    console.log('____ | installing', t, ' ==> '.yellow, Matrix.config.device.identifier )
    Matrix.api.app.install(t, Matrix.config.device.identifier, function(err, resp) {
      if (err) return console.error(err);
      console.log('Installed app'.yellow, t);
      debug(resp);

      //manage api records
      Matrix.api.app.assign( t, function (err, resp) {
        if (err) return console.error(err);
        debug('App Assigned to', Matrix.config.device.identifier );
        process.exit();
      });
    });
  } else if ( cmd.match(/s|se|sen|sens|senso|sensor|sensors|-s|--sensors/)) {
    Matrix.api.sensor.install(t, Matrix.config.device.identifier, function(err, resp){
      if (err) return console.error(err);
      debug(resp);
      console.log(t,' sensor installed.')
      process.exit();
    })
  }
  // if (!_.isUndefined(o) && o.sensors === true) {
  //   //sensor install
  //   console.warn('sensor not implemented yet');
  // } else {
  //   // application install
  //   // TODO: ensure if file is not found, we're hitting api directory
  //   // console.log('Installing app', name)
  // }
