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

*/
(function getCubicbeziers() {
  var curItem = app.project.activeItem;
  var selectedProperties = app.project.activeItem.selectedProperties;
  var selectedProperty;
  var duration = curItem.duration;
  var frameRate = curItem.frameRate;
  var numFrames = duration / curItem.frameDuration;
  var keyframes = [];
  var avSpeed;

  /* x1, x2, y1, y2 are used to track the control points for the bezier curves */
  var x1;
  var x2;
  var y1;
  var y2;

  /* t1, t2, val1, val2 are used to track the place on animation curve */
  var t1;
  var t2;
  var val1;
  var val2;

  /* startingValue, endingValue and totalDeltaValue track the total change in the property */
  var startingValue;
  var endingValue;
  var totalDeltaValue;

  /* tracks which keyframe we are looking at */
  var i;
  /* output and stringified are for outputing the final animation curves */
  var output;
  var stringified;

  if (selectedProperties.length !== 1) {
    alert('Please select a property to export (no more than one)');
    return;
  }
  selectedProperty = selectedProperties[0];
  if (selectedProperty.numKeys < 2) {
    alert('Selected property does not have any keyframes');
    return;
  }
  /* Get the starting and ending value of the property so we can normalize the values 0 -> 1*/
  startingValue = selectedProperty.keyValue(1);
  endingValue = selectedProperty.keyValue(selectedProperty.numKeys);
  totalDeltaValue = endingValue - startingValue;

  for (i = 1; i < selectedProperty.numKeys; i++) { // keyframes are 1-indexed
    /* t1, t1 are the x values of the keyframes we are interpolating between */
    t1 = selectedProperty.keyTime(i);
    t2 = selectedProperty.keyTime(i + 1);
    /* val1, val2 are the y values of the keyframes we are interpolating between */
    val1 = selectedProperty.keyValue(i);
    val2 = selectedProperty.keyValue(i + 1);

    avSpeed = Math.abs(val2 - val1) / (t2 - t1);

    if (val1 < val2) {
      x1 = selectedProperty.keyOutTemporalEase(i)[0].influence / 100;
      y1 = x1 * selectedProperty.keyOutTemporalEase(i)[0].speed / avSpeed;

      x2 = 1 - selectedProperty.keyInTemporalEase(i + 1)[0].influence / 100;
      y2 = 1 - (1 - x2) * (selectedProperty.keyInTemporalEase(i + 1)[0].speed / avSpeed);
    } else if (val2 < val1) {
      x1 = selectedProperty.keyOutTemporalEase(i)[0].influence / 100;
      y1 = (-x1) * selectedProperty.keyOutTemporalEase(i)[0].speed / avSpeed;
      x2 = selectedProperty.keyInTemporalEase(i + 1)[0].influence / 100;
      y2 = 1 + x2 * (selectedProperty.keyInTemporalEase(i + 1)[0].speed / avSpeed);
      x2 = 1 - x2; // invert the x value
    } else {
      x1 = selectedProperty.keyOutTemporalEase(i)[0].influence / 100;
      y1 = (-x1) * selectedProperty.keyOutTemporalEase(i)[0].speed /
        ((selectedProperty.maxValue - selectedProperty.minValue) / (t2 - t1));
      x2 = selectedProperty.keyInTemporalEase(i + 1)[0].influence / 100;
      y2 = 1 + x2 * (selectedProperty.keyInTemporalEase(i + 1)[0].speed /
        ((selectedProperty.maxValue - selectedProperty.minValue) / (t2 - t1)));
      x2 = 1 - x2; // invert the x value
    }
    /* Push our calculated keyframe to the list
       p: [%time through animation, %through the total change in animation]
       cp: [x1, y1, x2, y2] - coords of the control points for the bezier curve */
    keyframes.push({
      p: [t1 * (frameRate / numFrames), (val1 - startingValue) / totalDeltaValue],
      cp: [x1, y1, x2, y2],
    });

    if (i === selectedProperty.numKeys - 1) {
      /* Push the final keyframe (no control points)
         Should always be [1, 1], will serve as a sanity test */
      keyframes.push({
        p: [t2 * (frameRate / numFrames), (val2 - startingValue) / totalDeltaValue],
      });
    }
  }
  output = {
    keyframes: keyframes,
    info: {
      property: selectedProperty.name,
      'original values': [startingValue, endingValue],
      'duration (ms)': duration * 1000,
      frames: numFrames,
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
}());

