class Comida{

    constructor(){
        this.rndPos = celdas[ Math.floor(Math.random(celdas.length)) ] [ Math.floor(Math.random(celdas[0].length)) ] ;
        this.col = color(255,0,0);
        console.log( this.rndPos.x , this.rndPos.y );
        this.pos = createVector( this.rndPos.x , this.rndPos.y );
    }

    actualizar(){

    }

    mostrar(){
        fill(this.col);
        rect(this.pos.x , this.pos.y,  anchoCelda, anchoCelda);

    }

    randomSpawn(){
        let x = Math.floor( Math.random()*(celdas.length-1)    )*anchoCelda;
        let y = Math.floor( Math.random()*(celdas[0].length-1) )*anchoCelda;
        this.pos.set(x,y);
    }

    setColor(c){
        this.col = c;
    }

    setPos(x,y){
        this.pos.set(x,y);
    }

    getPos(){

        return this.pos;
    }
}
