/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

import { crearDeck } from '../modules/crearDeck';
import { pedirCarta } from '../modules/pedirCarta';
import {renderCarta} from '../modules/renderCarta';

let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
const PUNTAJE_GANADOR = 21;

let puntosJugador = 0,
puntosComputadora = 0;

// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

deck = crearDeck(deck,tipos,especiales);

// Esta función me permite tomar una carta
const tomarCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

// devuelve la carta como tipo number
const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
};

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    
    do {
        const carta = tomarCarta();
        const cartaNum = valorCarta( carta );
        puntosComputadora = pedirCarta(puntosComputadora,puntosHTML,1,cartaNum);
        renderCarta(carta,divCartasComputadora);
        if( puntosMinimos > PUNTAJE_GANADOR ) {
            break;
        };

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= PUNTAJE_GANADOR ) );

    setTimeout(() => {
        ( puntosComputadora === puntosMinimos ) ?
            alert('Nadie gana') :
        ( puntosMinimos > PUNTAJE_GANADOR ) ?
            alert('Computadora gana'):
        ( puntosComputadora > PUNTAJE_GANADOR ) ?
            alert('Jugador gana'):
            alert('Computadora gana');
    }, 100 );
}

const buttonsDisabled = ()=>{
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
};
// Eventos
btnPedir.addEventListener('click', () => {

    const carta = tomarCarta();
    const cartaNum = valorCarta( carta );

    puntosJugador = pedirCarta(puntosJugador,puntosHTML,0,cartaNum);
    renderCarta(carta,divCartasJugador);

    if ( puntosJugador > PUNTAJE_GANADOR ) {
        console.warn('Lo siento mucho, perdiste');
        buttonsDisabled();
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === PUNTAJE_GANADOR ) {
        console.warn('21, genial!');
        buttonsDisabled();
        turnoComputadora( puntosJugador );
    }

});


btnDetener.addEventListener('click', () => {
    buttonsDisabled();
    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck(deck,tipos,especiales);

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});
