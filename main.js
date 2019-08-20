const cv = require('opencv4nodejs');

const input= cv.imread('OP.jpg');
 let outputGray = new cv.Mat(input.sizes[0],input.sizes[1],cv.CV_8UC1)
 let outputRGBN = new cv.Mat(input.sizes[0],input.sizes[1],cv.CV_8UC3)
 let outputYCbCr = new cv.Mat(input.sizes[0],input.sizes[1],cv.CV_8UC3)
 let YCbCrMatrix= [[0.299,-0.168935,0.499813],[0.587,-0.331665,-0.418531],[0.114,0.50059,-0.081282]]
// console.log(input)
// console.log(output)
for (let i=0;i<input.sizes[0];i++){
  for (let k=0;k<input.sizes[1];k++){
      let pixel = input.atRaw(i,k);
      let sum=pixel[0]+pixel[1]+pixel[2];
      let gray = Math.round(sum/3);
      let normalized =[0,0,0];
      if (sum!==0){
        normalized = [Math.round(pixel[0]/sum*255),
        Math.round(pixel[1]/sum*255),
        Math.round(pixel[2]/sum*255)]
      } 
      let YCbCr=[0,0,0]
      for (let j=0;j<3;j++){
        YCbCr[j]= Math.round(pixel[0]*YCbCrMatrix[j][0]+pixel[1]*YCbCrMatrix[j][1]+pixel[2]*YCbCrMatrix[j][2]);
        if (j>0){
          YCbCr[j]+=128;
        }
        if (YCbCr[j]>255){
          YCbCr[j]=255;
        }
        if (YCbCr[j]<0){
          YCbCr[j]=0;
        }
      }
      outputGray.set(i,k,gray)
      outputRGBN.set(i,k,normalized)
      outputYCbCr.set(i,k,YCbCr)
  }
};
cv.imwrite('gray.jpg', outputGray);
cv.imwrite('normalized.jpg', outputRGBN);
cv.imwrite('YCbCr.jpg',outputYCbCr)