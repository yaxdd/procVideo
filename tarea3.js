const cv = require('opencv4nodejs');

//Cargo mi imagen de prueba
// console.log(output)
async function main( ){
    const input = cv.imread('OP.jpg');
    let derivada={matrix:[[-1,0,1],[-1,0,1],[-1,0,1]],sizes:[3,3]};
    let inputGray = input.cvtColor(cv.COLOR_RGB2GRAY);
    // let output = await correlacion (derivada,inputGray);
    console.log(new cv.Rect(1,2,3,4))
    // let output = inputGray.getRegion(new cv.Rect(9,3,3,3)).getDataAsArray()
    cv.imwrite('derivada.jpg',output)
    
}
main();
async function correlacion(kernel,image){
    console.log(image.sizes)
    await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });

    let output = new cv.Mat(image.sizes[0], image.sizes[1], cv.CV_8UC1)
    for (let i=3;i<image.sizes[0]-3;i++){
        for (let j=3;j<image.sizes[1]-3;j++){
            console.log(i,j)
            console.log()
            //   let subRegion = image.getRegion(new cv.Rect(i,j,1,1)).getDataAsArray();
            //  let sum = subRegion[0,0];
            //  console.log(sum)
             output.set(i,j,0)
        }
    }
    return output
}
function getMatrix(){

}