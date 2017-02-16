class Image {

    toGrayscale(imgObj) {
        var canvas = document.createElement('canvas');

        var canvasContext = canvas.getContext('2d');

        var imgW = imgObj.width;
        var imgH = imgObj.height;
        
        canvas.width = imgW;
        canvas.height = imgH;

        canvasContext.drawImage(imgObj, 0, 0);

        var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

        const four = 4;
        const three = 3;
        for (var y = 0; y < imgPixels.height; y++) {
            for (var x = 0; x < imgPixels.width; x++) {
                var i = (y * four) * imgPixels.width + x * four;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / three;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }

        canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

        return canvas.toDataURL();
    }

}

export default Image;
