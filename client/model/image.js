class MyImage extends Image{
    constructor() {
		super();
	}

    toGrayscale(imgObj) {
        let canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d');
        
        var image = new Image();
        image.src = imgObj;
        document.body.appendChild(image);
        canvasContext.drawImage(image, 0, 0);

        var imgW = parseFloat(image.width);
        var imgH = parseFloat(image.height);

        var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

        for(var y = 0; y < imgPixels.height; y++){
            for(var x = 0; x < imgPixels.width; x++){
                  var i = (y * 4) * imgPixels.width + x * 4;
                  var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                  imgPixels.data[i] = avg;
                  imgPixels.data[i + 1] = avg;
                  imgPixels.data[i + 2] = avg;
            }
        }

        canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

        return canvas.toDataURL();
    }

}

export default MyImage;
