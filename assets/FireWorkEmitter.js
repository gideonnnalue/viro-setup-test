'use strict';

import React from 'react';
import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');
var ColorPropType = require('react-native').ColorPropType;
import { ViroParticleEmitter } from 'react-viro-goopy';

var FireworkEmitter = createReactClass(
{
  propTypes: {
    run: PropTypes.bool,
    explosionDelay:PropTypes.number,
    endColor:PropTypes.arrayOf(ColorPropType),
    explosionSize:PropTypes.number.isRequired,
    startColor:PropTypes.arrayOf(ColorPropType),
    explosionLocation:PropTypes.arrayOf(PropTypes.number),
  },

  render: function() 
  {
    // Set the colors of fireworks.
    var viroFireworkColors =["#ff2d2d","#42ff42","#00edff","#ffff00","#ffb5f8","#00ff1d","#00edff","#ffb14c", "#ff7cf4"];
    var colorRand1 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    var colorRand2 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];
    var colorRand3 = viroFireworkColors[Math.floor((Math.random() * 5) + 0)];

    // Let the colors to change dynamically
    var startColorRange1 = this.props.startColor == undefined ? colorRand1 : this.props.startColor;
    var startColorRange2 = this.props.startColor == undefined ? colorRand2 : this.props.startColor;
    var endColor = this.props.endColor == undefined ? colorRand3 : this.props.endColor;

    return (
      <ViroParticleEmitter
          loop={false}
          visible={true}
          duration={1500}
          run={this.props.run}
          fixedToEmitter={true}
          delay={this.props.explosionDelay}
          position={this.props.explosionLocation}

          image={{
              width:0.1,
              height:0.1,
              bloomThreshold:0.0,
              source:require("./res/particle_firework.png"),
          }}
          
          // Set the number of particles
          // Lifetime of particles, shape
          spawnBehavior={{
            maxParticles:1000,
            emissionRatePerSecond:[0,0],
            particleLifetime:[1200,1200],
            spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:false},
            emissionBurst:[
                {time:0, min:300, max:350, cycles:1}
            ],
          }}

          // It is how particles spread out in
          // the screen
          particleAppearance={{
            opacity:{
              initialRange:[1.0, 1.0],
              factor:"Time",
              interpolation:[
                {endValue:0.0, interval:[400,1000]}
              ]
            },

            color:{
              initialRange:[startColorRange1, startColorRange2],
              interpolation:[
                {endValue:endColor, interval:[300,1200]}
              ]
            }
          }}

          particlePhysics={{
            explosiveImpulse:{impulse:0.07 * this.props.explosionSize, position:[0,0,0], decelerationPeriod:1.0},
          }}
        />
    );
  }
});

export default FireworkEmitter;

