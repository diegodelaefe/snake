let ancho = 601;
let anchoCelda = 20;
let celdas = [];
let alto = 601;

let comida;
let serpiente;
var patch

let juegoInicido =false;
let pdIniciado = false;

function setup() {
    //canvas en el interior del div
    var myCanvas = createCanvas(ancho, ancho);
    myCanvas.parent("ventana");
    background(90);
    grid(); frameRate(5);

    reset();

    //boton de reset
    button = createButton('Jugar!');
    button.position(ancho    ,alto +60);
    button.mousePressed(probarAparecer);
}

//- - - - - - - - - - - - - - - - - - - -*/
//  DRAW 
//- - - - - - - - - - - - - - - - - - - -*/
function draw() {
    background(0);      
    grid();
    jugar();
}

//- - - - - - - - - - - - - - - - - - - -*/
//  BOTON APARECER 
//- - - - - - - - - - - - - - - - - - - -*/
function probarAparecer(){

    reset();
    comida.randomSpawn();
    juegoInicido =true;

    //Si pd no está iniciado, lo inicia y carga el patch
    if(pdIniciado== false){
        $.get('patches/FX.pd', function(mainStr) {
            Pd.start();
            patch = Pd.loadPatch(mainStr)
            Pd.send('FX-INICIO', ['bang!']);
            pdIniciado = true;
        })
    }
}

/* - - - - - - - - - - - - - - - - - - - */
//  FUNCIONES PARA LLEVAR A CABO EL JUEGO 
//- - - - - - - - - - - - - - - - - - - -*/
function jugar(){

    if(juegoInicido){
        comida.mostrar();

        serpiente.controlar();
        serpiente.comer(comida.getPos().x, comida.getPos().y);
        serpiente.colision(); 
        serpiente.mostrar();

        var cadena = "X: "+serpiente.pos.x+" Y:"+serpiente.pos.y+" <br>Largo: "+serpiente.largo;
        $("#datos").html(cadena);
    }
}

/* - - - - - - - - - - - - - - - - - - - */
//  RESET  
//- - - - - - - - - - - - - - - - - - - -*/
function reset(){
    comida = null;
    serpiente = null;

    comida = new Comida();
    serpiente = new Serpiente();

    let c = color(0,255,0);
    serpiente.setColor(c);
}
 

function grid(paso = 20){

    noFill();

    for(var x = 0; x < width/paso ; x++){
        celdas[x] = [];
        for(var y = 0; y < height/paso ; y++){
            celdas[x][y] = createVector(x*paso, y*paso);
            noFill();
            stroke(127,127);
            rect( celdas[x][y].x, celdas[x][y].y, paso,  paso);
        }
    }
}