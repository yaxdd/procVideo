/**
 * Programa: tarea1b.js
 * Descripcion : Combina 2 imagenes utilizando al tecnica alpha mating
 * Autor: Yael Diaz
 */

// LLamo las librerias de openCV para nodeJS
let cv = require('opencv4nodejs')
//llamo a la funcion de forma asincrona y la resuelvo 
console.time("combine")
asyncCombine('greenscreen.bmp', 'fondo.bmp', 'greenscreenMask.bmp').then(response => {
    cv.imwrite('combinado.bmp',response)
    console.timeEnd("combine")
    console.log( "procesamiento terminado")
}).catch(error => {
     console.timeEnd("combine")
     console.log(error)
})


//funcion asincrona para combinar dos imagenes utilizando una mascara
async function asyncCombine(nameA, nameB, nameMask) {
    //declaro las variables para las imagenes que utilizaré
    let imageA = [],
        imageB = [],
        mask = [];
    try {
        //genero un array para acumular las promesas
        let arrayPromises = []
        arrayPromises.push(cv.imreadAsync(nameA));
        arrayPromises.push(cv.imreadAsync(nameB))
        arrayPromises.push(cv.imreadAsync(nameMask))
        //de forma concurrente cargo todas las imagenes
        let [tempA, tempB, tempMask] = await Promise.all(arrayPromises)
        console.timeLog("combine", "imagenes cargadas")
        //y las asigno a sus respectivas variables
        imageA = tempA;
        imageB = tempB;
        mask = tempMask;
    } catch (err) {
        //retorno el error correspondiente
        throw new Error("Hubo un error al cargar las imagenes")
    }
    //consigo los tamaño sde las imagenes
    let [aX, aY] = imageA.sizes;
    let [bX, bY] = imageB.sizes;
    let sizeX = 0,
        sizeY = 0;
    //variable contenedora para la imagen de salida
    let output = [];
    //valido los tamaños de las imagenes
    if ((aX === bX) && (aY === bY)) {
        sizeX = aX;
        sizeY = aY;
        //binarizo la imagen mascara con una funcion asincrona //experimental
        alpha = image2Binary(mask);
        //genero la imagen de salida vacia
        output = new cv.Mat(sizeX, sizeY, cv.CV_8UC3)
        console.timeLog("combine", "validaciones terminadas")
    } else {
        //retorno el error correspondiente
        throw new Error("Los tamaños de las imagenes no corresponden")
    }
    //recorro cada pixel de la imagen
    try {
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                //obtengo cada pixel de cada imagen
                let [aB, aG, aR] = imageA.atRaw(i, j);
                let [bB, bG, bR] = imageB.atRaw(i, j);
                let [alphaB, alphaG, alphaR] = alpha.atRaw(i, j);
                //genero los pixeles de salida aplicando la operacion Aa+(1-a)B
                let pixelB = aB * alphaB + (1 - alphaB) * bB,
                    pixelG = aG * alphaG + (1 - alphaG) * bG,
                    pixelR = aR * alphaR + (1 - alphaR) * bR;
                //guardo el pixel en la imagen de salida
                
                output.set(i, j, [pixelB, pixelG, pixelR])
            }
        }
    } catch (error) {
        throw new Error("Hubo un error al procesar las imagenes")
    }
    //Llegados a este punto todo salio bien y retorno la imagen final
    return output
}

function image2Binary(image) {
    let [sizeX, sizeY] = image.sizes;
    let output = new cv.Mat(sizeX, sizeY, cv.CV_8UC3);
    let [nB, nG, nR] = [0, 0, 0]
    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            let [b, g, r] = image.atRaw(i, j);
            nR = r=== 255 ? 1 : 0;
            nG = g=== 255 ? 1 : 0;
            nB = b=== 255 ? 1 : 0;
            output.set(i, j, [nB, nG, nR])
        }
    }
    return output
}
async function image2BinaryAsync(image) {

    let [sizeX, sizeY] = image.sizes;
    let arrayPromises = []
    let output = new cv.Mat(sizeX, sizeY, cv.CV_8UC3);
    for (let i = 0; i < sizeX; i++) {
        arrayPromises.push(
            async function () {
                for (let j = 0; j < sizeY; j++) {
                    let [b, g, r] = image.atRaw(i, j);
                    nr = r > 0 ? 1 : 0;
                    ng = g > 0 ? 1 : 0;
                    nb = b > 0 ? 1 : 0;
                    output.set(i, j, [nb, ng, nr])
                }
                return;
            }(i)


        )
    }
    await Promise.all(arrayPromises).then(response => {})
    return output
}
