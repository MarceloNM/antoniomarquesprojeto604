// António Marques
// 13/03/2026
// Projeto "ábaco em JavaScript"
// Testado no Firefox do Windows e no Chrome do Android


const tabu = [];  // tem valor 1 nas posições com conta, 0 nas posições sem conta e 2 nas posições parede
const tdes = [];  // guarda todas as células da tabela na sequência exata em que ela é criada
const timg = [];  // direto aos elementos na tabela

const ASCII_a = 97;

const total = [0,0,0,0,0,0,0,0,0,0,0,0,0];
const notas = [262,294,330,350,392,440,494,523,587,659,698,784,880];

const abaco = new Map();

const matriz = [{ qt:1, com: [{classe: "cse", qt: 1},
                                {classe: "lh", qt: 13},
                                {classe: "csd", qt: 1}]},
                { qt:2, com: [{classe: "lv", qt: 1},
                                {classe: "conta", qt: 13},
                                {classe: "lv", qt: 1}]},
                { qt:2, com: [{classe: "lv", qt: 1},
                                {classe: "eixo", qt: 13},
                                {classe: "lv", qt: 1}]},
                { qt:1, com: [{classe: "exe", qt: 1},
                                {classe: "lh", qt: 13},
                                {classe: "exd", qt: 1}]},
                { qt:3, com: [{classe: "lv", qt: 1},
                                {classe: "eixo", qt: 13},
                                {classe: "lv", qt: 1}]},
                { qt:5, com: [{classe: "lv", qt: 1},
                                {classe: "conta", qt: 13},
                                {classe: "lv", qt: 1}]},
                { qt:1, com: [{classe: "cie", qt: 1},
                                {classe: "lh", qt: 13},
                                {classe: "cid", qt: 1}]},
                ];

tabuleiro();


function som(nota) {
// 1. Criar o contexto de áudio
let context = new AudioContext();

// 2. Criar o oscilador
let oscillator = context.createOscillator();
oscillator.type = 'sine'; // Tipo de onda: 'sine', 'square', 'sawtooth', 'triangle'
oscillator.frequency.value = notas[nota]; // Frequência em Hz (440Hz = Lá)

// 3. Conectar e iniciar
oscillator.connect(context.destination);
oscillator.start();

// 4. Parar após 1 segundo
oscillator.stop(context.currentTime + 0.01);
}


function moveConta (esteID) {
    let pos = id2pos(esteID);
    console.log(esteID, pos);

    if (pos[0] < 8) {             // zona inferior do ábaco
        let inicio = [];
        let firstID = '';
        let passos = false;       // valida operações em mais de um passo
        switch (total[pos[1]]){    // coluna
            case 0: case 5:
                inicio = [4, pos[1]];
                firstID = pos2id(inicio);
                console.log(firstID);
                switch (pos[0]){    // linha
                    case 0: case 1:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                    case 2:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                    case 3:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                    case 4:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                        break;
                    case 5: case 6: case 7: case 8:
                    case 9: case 10: case 11:
                        break;
                    default:
                }
                break;
            case 1: case 6:
                inicio = [3, pos[1]];
                firstID = pos2id(inicio);
                console.log(firstID);
                switch (pos[0]){    // linha
                    case 0: case 1:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                    case 2:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                    case 3:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                        break;
                    case 4: case 5: case 6:
                        break; 
                    case 7:
                        descerContaInferior(esteID);
                        total[pos[1]]--;
                        break; 
                    case 8: case 9: case 10: case 11:
                        break;
                    default:
                }
                break;
            case 2: case 7:
                inicio = [2, pos[1]];
                firstID = pos2id(inicio);
                console.log(firstID);
                switch (pos[0]){    // linha
                    case 0: case 1:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                    case 2:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                        break;
                    case 3: case 4: case 5:
                        break;
                    case 7:
                        firstID = pos2id([6,pos[1]]);
                        esteID = descerContaInferior(firstID);
                        total[pos[1]]--;
                    case 6:
                        descerContaInferior(esteID);
                        total[pos[1]]--;
                        break; 
                    case 8: case 9: case 10: case 11:
                        break;
                    default:
                }
                break;
            case 3: case 8:
                inicio = [1, pos[1]];
                firstID = pos2id(inicio);
                console.log(firstID);
                switch (pos[0]){    // linha
                    case 0: case 1:
                        firstID = subirContaInferior(firstID);
                        total[pos[1]]++;
                        break;
                    case 2: case 3: case 4:
                        break;
                    case 7: 
                        firstID = pos2id([5,pos[1]]);
                        firstID = descerContaInferior(firstID);
                        total[pos[1]]--;
                        passos = true;
                    case 6:
                        if (!passos) firstID = pos2id([5,pos[1]]);
                        esteID = descerContaInferior(firstID);
                        total[pos[1]]--;
                    case 5:
                        descerContaInferior(esteID);
                        total[pos[1]]--;
                        break;
                    case 8: case 9: case 10: case 11:
                        break;
                    default:
                }
                break;
            case 4: case 9:
                inicio = [1, pos[1]];
                firstID = pos2id(inicio);
                console.log(firstID);
                switch (pos[0]){    // linha
                    case 1: case 2: case 3:
                        break;
                    case 0: case 7: 
                        firstID = pos2id([4,pos[1]]);
                        esteID = descerContaInferior(firstID);
                        total[pos[1]]--;
                        passos = true;
                    case 6:
                        if (!passos) esteID = pos2id([4,pos[1]]);
                        esteID = descerContaInferior(esteID);
                        total[pos[1]]--;
                        passos = true;
                    case 5:
                        if (!passos) esteID = pos2id([4,pos[1]]);
                        esteID = descerContaInferior(esteID);
                        total[pos[1]]--;
                        passos = true;
                    case 4:
                        descerContaInferior(esteID);
                        total[pos[1]]--;
                        break;
                    case 8: case 9: case 10: case 11:
                        break;
                    default:
                }
                break;
                break;
            default:
        }
    } else {         // zona superior do ábaco
        if (pos[0] == 8) {
            subirContaSuperior(esteID);
            console.log(8, esteID);
            total[pos[1]] -= 5;
        } else {
            if (pos[0] == 11) {
                if (total[pos[1]] < 5) { 
                    esteID = downId(esteID);
                    descerContaSuperior(esteID);
                    console.log(pos[1], esteID);
                    total[pos[1]] += 5;
                } else {
                    esteID = pos2id([8,pos[1]]);
                    subirContaSuperior(esteID);
                    console.log(pos[1], esteID);
                    total[pos[1]] -= 5;
                }
            } else {
                descerContaSuperior(esteID);
                console.log(pos[1], esteID);
                total[pos[1]] += 5;
            }
        }
    }

    // subirContaInferior(esteID);
    // descerContaSuperior(esteID);
    // moveUpConta(esteID);
    console.log(total);
}

function tabuleiro() {  // cria o ábaco em DOM
    const body = document.querySelector('body');
    const quadro = document.createElement('div');
    body.appendChild(quadro);
    quadro.classList.add('quadro');
    let contador = 0;
    for (const caso of matriz) {    // sete casos
        //console.log('caso.qt: ', caso.qt);
        for (let i = 0; i < caso.qt; i++) {
            //console.log('i: ', i);
            for (const peca of caso.com){
                //console.log('caso.com: ', caso.com);
                for (let j = 0; j < peca.qt; j++) {
                    const cell = document.createElement('div');
                    quadro.appendChild(cell);
                    cell.classList.add(peca.classe);
                    if (peca.classe == 'conta' || peca.classe == 'eixo'){
                        cell.id = int2id(contador);
                        abaco.set(cell.id, cell);
                        contador++;
                        if (peca.classe === 'conta') {
                            // cell.addEventListener("click", () => {moveConta(this.id)});
                            cell.onclick = function () { moveConta(this.id)}; 
                            ativaMousover(true, cell);
                        }
                    }
                    cell.innerHTML = "&nbsp";
                }
            }
        }
    }
}


const subirContaInferior = (esteID) => {
    let localID = esteID; 
    for (let i = 0; i < 3; i++) {
        moveUpConta(localID);
        localID = upId(localID);
    }
    som(id2pos(esteID)[1]);
    // console.log(esteID);
    return downId(esteID);
}
const descerContaInferior = (esteID) => {
    let localID = esteID;
    for (let i = 0; i < 3; i++) {
        moveDownConta(localID);
        localID = downId(localID);
    }
    som(id2pos(esteID)[1]);
    return upId(esteID);
} 
const subirContaSuperior = (esteID) => {
    for (let i = 0; i < 2; i++) {
        moveUpConta(esteID);
        esteID = upId(esteID);
    }
    som(id2pos(esteID)[1]);
}
const descerContaSuperior = (esteID) => {
    for (let i = 0; i < 2; i++) {
        moveDownConta(esteID);
        esteID = downId(esteID);
    }
    som(id2pos(esteID)[1]);
}

const moveUpConta = (esteID) => {
    const de = abaco.get(esteID);
    ativaMousover(false, de);
    // de.removeEventListener("click", () => {moveConta(de.id)});
    de.onclick = null;
    let t = upId(esteID);
    // console.log(t);
    const para = abaco.get(t);
    para.classList.remove('eixo');
    para.classList.add('conta');
    para.onclick = function() {moveConta(this.id)};
    //para.addEventListener("click", () => {moveConta(para.id)});
    ativaMousover(true, para);
    de.classList.remove('contaover');
    de.classList.remove('conta');
    de.classList.add('eixo');
}
const moveDownConta = (esteID) => {
    const de = abaco.get(esteID);
    ativaMousover(false, de);
    // de.removeEventListener("click", () => {moveConta(de.id)});
    de.onclick = null;
    let t = downId(esteID);
    console.log(t);
    const para = abaco.get(t);
    para.classList.remove('eixo');
    para.classList.add('conta');
    para.onclick = function() {moveConta(para.id)};
    // para.addEventListener("click", () => {moveConta(para.id)});
    ativaMousover(true, para);
    de.classList.remove('contaover');
    de.classList.remove('conta');
    de.classList.add('eixo');
}

function ativaMousover(sim, imagem){
    if (sim){
        imagem.onmouseover = function() { mouseHover(this); };
        imagem.onmouseout = function() { mouseOut(this); }; 

    } else {
        imagem.onmouseover = null; //function() { };
        imagem.onmouseout = null; // function() { }; 
    }
}

function mouseHover(elemento) {
    elemento.classList.remove('conta');
    elemento.classList.add('contaover');
}
function mouseOut(elemento) {
    elemento.classList.remove('contaover');
    elemento.classList.add('conta');
}

function upId(id){
    let pos = id2pos(id);
    // console.log(pos);
    pos[0]++;
    // console.log(pos);
    return(pos2id(pos));
}

function downId(id) {
    let pos = id2pos(id);
    // console.log(pos);
    pos[0]--;
    // console.log(pos);
    return(pos2id(pos));
}

function pos2id(pos) {
    return (String.fromCharCode(pos[0] + ASCII_a, pos[1] + ASCII_a));
}

function int2id(contador){
    let pos = 155 - contador;
    let linha = Math.floor(pos / 13);
    let col = pos % 13;
    return(String.fromCharCode(linha + ASCII_a, col + ASCII_a));
}

function id2pos(esteID) {
    let resultado = [];
    let linha = esteID.charCodeAt(0) - ASCII_a;
    let coluna = esteID.charCodeAt(1) - ASCII_a;
    resultado.push(linha);
    resultado.push(coluna);
    return resultado;
}