var cv = require('opencv');

// camera properties
var camWidth = 320;
var camHeight = 240;
var camFps = 10;
var camInterval = 1000 / camFps;

// face detection properties
var rectColor = [0, 255, 0];
var rectThickness = 2;

// initialize camera
var camera = new cv.VideoCapture(0);
camera.setWidth(camWidth);
camera.setHeight(camHeight);

module.exports = function (socket) {
  setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;

      im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt_tree.xml', {}, function(err, faces) {
        if (err) throw err;

        // if (!faces.length) return console.log("No Faces");

        for (var i = 0; i < faces.length; i++) {
          // console.log("Face found");
          face = faces[i];
          im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
        }

        socket.emit('frame', { buffer: im.toBuffer() });
      });
    });
  }, camInterval);
};
