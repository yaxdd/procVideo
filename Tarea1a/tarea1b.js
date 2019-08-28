//importo las librerias de openCV
const cv = require('opencv4nodejs');

//Cargo mi imagen de prueba
const input = cv.imread('OP.jpg');

//llamo a las funciones de conversion creadas
let outputGray = rgb2Gray(input);
let outputRGBN = rgb2RgbN(input);
let outputYCbCr = rgb2YCbCr(input);


// //Guardo las imagenes en archivos nuevos
 cv.imwrite('gray.jpg', outputGray);
 cv.imwrite('normalized.jpg', outputRGBN);
cv.imwrite('YCbCr.jpg', outputYCbCr)

//guardo las imagenes que me genera openCV
 outputGray = input.cvtColor(cv.COLOR_RGB2GRAY)
// outputRGBN = input.normalize(1, 0, cv.NORM_MINMAX, -1)//no se como usarla
 outputYCbCr = input.cvtColor(cv.COLOR_RGB2YCrCb)
 cv.imwrite('YCbCr2.jpg', outputYCbCr);
 cv.imwrite('gray2.jpg', outputGray);
// cv.imwrite('normalized2.jpg', outputRGBN);

function rgb2Gray(image) {
  let output = new cv.Mat(image.sizes[0], image.sizes[1], cv.CV_8UC1)
  for (let i = 0; i < image.sizes[0]; i++) {
    for (let k = 0; k < image.sizes[1]; k++) {
      let [b,g,r] = image.atRaw(i, k);
      let sum = r+g+b;
      let gray = Math.round(sum / 3);
      output.set(i, k, gray)
    }
  }
  return output;
}
function rgb2RgbN(image) {
  let output = new cv.Mat(image.sizes[0], image.sizes[1], cv.CV_8UC3)
  for (let i = 0; i < image.sizes[0]; i++) {
    for (let k = 0; k < image.sizes[1]; k++) {
      let [b,g,r] = image.atRaw(i, k);
      let sum = r+g+b;
      let normalized = [0, 0, 0];
      if (sum !== 0) {
        normalized = [Math.round(b / sum * 255),
        Math.round(g / sum * 255),
        Math.round(r / sum * 255)
      ]
    }
    output.set(i, k, normalized)
  }
  }
  return output
}
function rgb2YCbCr(image){
  let YCbCrMatrix = [
    [0.299, 0.587, 0.114],
    [-0.169, -0.331, 0.500],
    [0.500, -0.419, -0.081]
  ];
let output = new cv.Mat(image.sizes[0], image.sizes[1], cv.CV_8UC3)
  for (let i = 0; i < image.sizes[0]; i++) {
    for (let k = 0; k < image.sizes[1]; k++) {
      // retorna en formato B G R
      let [b,g,r] = image.atRaw(i, k);
      let YCbCr = [0, 0, 0]
      for (let j = 0; j < 3; j++) {
        YCbCr[j] = Math.round(r * YCbCrMatrix[j][0] + g* YCbCrMatrix[j][1] + b* YCbCrMatrix[j][2]);
        if (j >0) {
           YCbCr[j] += 128;
        }
      }
      output.set(i, k, YCbCr)
    }
  };
return output
}


let YCbCrMatrix = [
  [0.299, 0.587, 0.114],
  [-0.169, -0.331, 0.500],
  [0.500, -0.419, -0.081]
];

console.log(YCbCrMatrix[0][2])