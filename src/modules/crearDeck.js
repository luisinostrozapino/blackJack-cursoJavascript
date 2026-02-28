/**
 *
 * @param {Array<string>} deck array vacio 
 * @param {Array<string>} tipos array de tipos de carta 
 * @param {Array<string>} especiales array de cartas especiales 
 * @returns {Array<string>} regresa la baraja desordenada
 */ 
// Esta función crea un nuevo deck
import _ from 'underscore';
export const crearDeck = (deck,tipos,especiales) => {
    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        };
    };
    
    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        };
    };
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}