/* Need to disable some eslint rules as this files is not babel-ified */
/* eslint-disable no-alert, no-var, prefer-template, prefer-arrow-callback, object-shorthand */
/* global app */
/*
  Original source: https://forums.adobe.com/thread/1471138
  Modified: lbatchelor, 27 June 2016

  This script assumes you have one and only one property selected. It will export a list of
  keyframes that are more inline with how CSS animations treat keyframes. That is to say, an array
  of points and control points that make up the animation curve for a specified property.
  Example output:

  {
    "keyframes": [{
      "p": [0, 0 ],                    // at 0% of the animation, the value should be 0
      "cp": [ 0.33333333, 0,0.4,1 ]    // curve to get to next keyframe
    },{
      "p": [ 0.5, -210 ],              // at 50% of the animation, value should be -210
      "cp": [ 0.4, 0, 0.6, 1 ]
    },{
      "p": [ 0.76666666666667, -195 ], // at 76% of the way,  value is -195
      "cp": [ 0.4, 0, 0.6, 1 ]
    }, {
      "p": [ 1, -200 ]                 // final value of the property is -200, no control points
    }],
    "info": {
      "property": "Y Position",        // The property this animation curve came from
      "original values": [0, -200]     // The original start and end values of the curve
      "duration (ms)": 500,            // The original duration of the animation
      "frames": 30                     // The number of frames in the animation
    }
  }

  Entry point is the IIFE getCubicbeziers() at the bottom of this file.

*/

/* Returns an array containing an array of all the keyframes from the selectedProperty.
   If the property contains two parts (an x and y part for example) the array will contain
   two arrays, one for each part. */
function getAEKeyFrames(selectedProperty) {
  var keyframes = [[]];
  var numKeyframes = selectedProperty.numKeys;
  var valueIsArr = selectedProperty.keyValue(1).constructor === Array;
  var i;
  var j;

  if (valueIsArr) {
    keyframes.push([]); // second array to store our second set of keyframes
  }
  for (i = 1; i < numKeyframes + 1; i++) {
    if (valueIsArr) {
      for (j = 0; j < 2; j++) {
        keyframes[j].push({
          time: selectedProperty.keyTime(i),
          value: selectedProperty.keyValue(i)[j],
          outTemporalEaseInfluence: selectedProperty.keyOutTemporalEase(i)[0].influence / 100,
          outTemporalEaseSpeed: selectedProperty.keyOutTemporalEase(i)[0].speed,
          inTemporalEaseInfluence: selectedProperty.keyInTemporalEase(i)[0].influence / 100,
          inTemporalEaseSpeed: selectedProperty.keyInTemporalEase(i)[0].speed,
        });
      }
    } else {
      keyframes[0].push({
        time: selectedProperty.keyTime(i),
        value: selectedProperty.keyValue(i),
        outTemporalEaseInfluence: selectedProperty.keyOutTemporalEase(i)[0].influence / 100,
        outTemporalEaseSpeed: selectedProperty.keyOutTemporalEase(i)[0].speed,
        inTemporalEaseInfluence: selectedProperty.keyInTemporalEase(i)[0].influence / 100,
        inTemporalEaseSpeed: selectedProperty.keyInTemporalEase(i)[0].speed,
      });
    }
  }

  return keyframes;
}

/* Returns the metadata about a set of keyframes
   NOTE: a single set of keyframes, not an array of a set of keyframes (like
    that returned from getAEKeyFrames) */
function getMetadata(aeKeyFrames) {
  var curItem = app.project.activeItem;
  var numKeyFrames = aeKeyFrames.length;

  var startingValue = aeKeyFrames[0].value;
  var endingValue = aeKeyFrames[numKeyFrames - 1].value;
  var deltaValue = endingValue - startingValue;

  var startingTime = aeKeyFrames[0].time;
  var endingTime = aeKeyFrames[numKeyFrames - 1].time;
  var deltaTime = endingTime - startingTime;

  var totalFrames = deltaTime / curItem.frameDuration;

  var maxValue = aeKeyFrames.map(function getValue(keyframe) {
    return keyframe.value;
  }).reduce(function getMax(prev, cur) {
    return Math.max(prev, cur);
  });

  var minValue = aeKeyFrames.map(function getValue(keyframe) {
    return keyframe.value;
  }).reduce(function getMin(prev, cur) {
    return Math.min(prev, cur);
  });

  return {
    startingValue: startingValue,
    endingValue: endingValue,
    deltaValue: deltaValue,
    startingTime: startingTime,
    endingTime: endingTime,
    deltaTime: deltaTime,
    totalFrames: totalFrames,
    minValue: minValue,
    maxValue: maxValue,
  };
}

/* Takes a single set of afterEffects keyframes (only a single property part) and alerts a set of
   keyframes that are more consumable in a js context. */
function getJSKeyframes(aeKeyFrames, selectedProperty) {
  var keyFrames = [];
  /* x1, x2, y1, y2 are used to track the control points for the bezier curves */
  var x1;
  var x2;
  var y1;
  var y2;

  /* t1, t2, val1, val2 are used to track the place (time and value) on animation curve */
  var t1;
  var t2;
  var val1;
  var val2;

  var avSpeed;
  var output;
  var stringified;
  var i;

  var metadata = getMetadata(aeKeyFrames);
  var startingTime = metadata.startingTime;
  var totalDuration = metadata.deltaTime;
  var startingValue = metadata.startingValue;
  var endingValue = metadata.endingValue;
  var totalDeltaValue = metadata.deltaValue;

  for (i = 0; i < selectedProperty.numKeys - 1; i++) {
    /* t1, t1 are the x values of the keyframes we are interpolating between */
    t1 = aeKeyFrames[i].time;
    t2 = aeKeyFrames[i + 1].time;
    /* val1, val2 are the y values of the keyframes we are interpolating between */
    val1 = aeKeyFrames[i].value;
    val2 = aeKeyFrames[i + 1].value;

    avSpeed = Math.abs(val2 - val1) / (t2 - t1);

    if (val1 < val2) {
      x1 = aeKeyFrames[i].outTemporalEaseInfluence;
      y1 = x1 * aeKeyFrames[i].outTemporalEaseSpeed / avSpeed;
      x2 = 1 - aeKeyFrames[i + 1].inTemporalEaseInfluence;
      y2 = 1 - (1 - x2) * (aeKeyFrames[i + 1].inTemporalEaseSpeed / avSpeed);
    } else if (val2 < val1) {
      x1 = aeKeyFrames[i].outTemporalEaseInfluence;
      y1 = (-x1) * aeKeyFrames[i].outTemporalEaseSpeed / avSpeed;
      x2 = aeKeyFrames[i + 1].inTemporalEaseInfluence;
      y2 = 1 + x2 * (aeKeyFrames[i + 1].inTemporalEaseSpeed / avSpeed);
      x2 = 1 - x2; // invert the x value
    } else {
      x1 = aeKeyFrames[i].outTemporalEaseInfluence;
      y1 = (-x1) * aeKeyFrames[i].keyOutTemporalEaseSpeed /
        ((metadata.maxValue - metadata.minValue) / (t2 - t1));
      x2 = aeKeyFrames[i + 1].inTemporalEaseInfluence;
      y2 = 1 + x2 * (aeKeyFrames[i + 1].inTemporalEaseSpeed /
        ((metadata.maxValue - metadata.minValue) / (t2 - t1)));
      x2 = 1 - x2; // invert the x value
    }
     /* Push our calculated keyframe to the list
       p: [%time through animation, %through the total change in animation]
       cp: [x1, y1, x2, y2] - coords of the control points for the bezier curve */
    keyFrames.push({
      p: [(t1 - startingTime) / totalDuration, (val1 - startingValue) / totalDeltaValue],
      cp: [x1, y1, x2, y2],
    });

    if (i === selectedProperty.numKeys - 2) {
      /* Push the final keyframe (no control points)
         Should always be [1, 1], will serve as a sanity test */
      keyFrames.push({
        p: [(t2 - startingTime) / totalDuration, (val2 - startingValue) / totalDeltaValue],
      });
    }
  }
  output = {
    keyframes: keyFrames,
    info: {
      property: selectedProperty.name,
      'original values': [startingValue, endingValue],
      'duration (ms)': totalDuration * 1000,
      frames: metadata.totalFrames,
    },
  };
  /* Make arrays show on one line by joining them and returning as a string */
  stringified = JSON.stringify(output, function arrayToOneLineString(key, value) {
    if (key === 'p' || key === 'cp' || key === 'original values') {
      return '[' + value.join(', ') + ']';
    }
    return value;
  }, 4);
  stringified = stringified.replace(/"/g, '\'') /* Replace double quotes with quotes */
    .replace(/'(\[.+\])'/g, '$1'); /* Remove the quotes around the arrays */

  alert(selectedProperty.name + '\n' + stringified);
}

/*eslint-disable*/
/* AfterEffects doesn't have the Array.prototype.reduce method.
   Adding it here so we can use it. */
function addArrayReducePolyfill() {
  // Production steps of ECMA-262, Edition 5, 15.4.4.21
  // Reference: http://es5.github.io/#x15.4.4.21
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback /* , initialValue*/) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      var t = Object(this), len = t.length >>> 0, k = 0, value;
      if (arguments.length == 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in t)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k++];
      }
      for (; k < len; k++) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }
}
/*eslint-enable*/

(function getCubicbeziers() {
  var selectedProperties = app.project.activeItem.selectedProperties;
  var selectedProperty;
  var aeFrames;

  var i;

  addArrayReducePolyfill();

  if (selectedProperties.length !== 1) {
    alert('Please select a property to export (no more than one)');
    return;
  }
  selectedProperty = selectedProperties[0];
  if (selectedProperty.numKeys < 2) {
    alert('Selected property does not have any keyframes');
    return;
  }

  /* Get all the keyframes for the selected property. Return two lists if the property has
     two parts */
  aeFrames = getAEKeyFrames(selectedProperty);
  for (i = 0; i < aeFrames.length; i++) {
    // Calculate the bezier curves and alert the keyyframes
    getJSKeyframes(aeFrames[i], selectedProperty);
  }
}());
