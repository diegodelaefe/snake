class Serpiente extends Comida{

    constructor(){
        super();

        //largo inicial
        this.largo = 0;

        //arreglo con vectores de cada cuadro de la cola
        this.colaPos = [];

        //posición inical
        this.setPos(celdas[15][15].x,celdas[15][15].y);
    }

    setPos(x,y){
        super.setPos( x,y);
    }

    mostrar(){
        super.mostrar();

        //copiamos la cola
        let cola = [];
        cola = this.colaPos.slice();
        cola = cola.reverse();
        
        //dibujamos cada cuadro
        for(var i = 0; i < this.largo; i++){
            fill(this.col);
            rect(cola[i].x, cola[i].y,  anchoCelda, anchoCelda);
        }
    }

    setColor(c){
        super.setColor(c);
    }

    comer(cx,cy){
        //obtenemos la pos. de la comida
        let posicionComida = createVector(cx,cy).dist(this.pos);

        //si la distancia entre la comida y la cabeza > ancho
        //se alarga la cola y respawunea la comida
        if(posicionComida < anchoCelda){
            comida.randomSpawn();
            this.largo += 1;
            console.log("Largo "+this.largo);
            Pd.send('FX-EAT', ['bang!']);
        }else{
            Pd.send('FX-WALK', ['bang!']);


        }
    }

    colision(){ 
        
        var choque = false;
        let cola = [];
        cola = this.colaPos.slice();
        cola = cola.reverse();
        cola = cola.slice(0,this.largo-1);

        for(var i = 1; i < cola.length; i++){
            var distancia = createVector(cola[i].x,cola[i].y).dist(this.pos);
            //if(distancia < anchoCelda  ){
                choque = true;
                //console.log("choque "+distancia);
              //  break;
            //}
        }
        //console.log("sin choque");
    }

    controlar(){

        let x = 0;
        let y = 0;

        if (key === 's') {
            x = 0;
            y = 1;
        } else if (key === 'w') {
            x = 0;
            y = -1;
        } else if (key === 'd') {
            x = 1;
            y = 0;
        } else if (key === 'a') {
            x = -1;
            y = 0;
        }

        let posX = constrain ( this.pos.x+(anchoCelda*x) , 0 , width-20);
        if(posX > width){
            posX = width;
        }

        let posY = constrain ( this.pos.y+(anchoCelda*y) , 0 , height-20) ;
        if(posY > height){
            posY = height;
        }

        let col = createVector(posX,posY);
        this.colaPos.push(col);

        this.setPos(posX,posY);

    }

}