/**
 * 
 * @param {Number} puntos 
 * @param {Array} puntosHTML 
 * @param {Number} smallIndex
 * @param {Number} cartaNum
 * @returns {Number} retorna los puntos
 */ 

export const pedirCarta = (puntos,puntosHTML,smallIndex,cartaNum)=>{

  puntos = puntos + cartaNum;
  puntosHTML[smallIndex].innerText = puntos;
  
  return puntos;
};
  