const cv = require('opencv4nodejs');

const input= cv.imread('OP.jpg');
 let outputGray = new cv.Mat(input.sizes[0],input.sizes[1],cv.CV_8UC1)
 let outputRGBN = new cv.Mat(input.sizes[0],input.sizes[1],cv.CV_8UC1)
 let outputYCbCr = new cv.Mat(input.sizes[0],input.sizes[1],cv.CV_8UC1)
// console.log(input)
// console.log(output)
for (let i=0;i<input.sizes[0];i++){
  for (let k=0;k<input.sizes[1];k++){
      let pixel = input.atRaw(i,k);
      let sum=(pixel[0]+pixel[1]+pixel[2]);
      let gray = Math.round(sum/3);
      let Normalize = 
      outputGray.set(i,k,gray);
      outputRGBN(i,k,Math.round(pi))
  }
};
cv.imwrite('Gray.jpg', outputGray);