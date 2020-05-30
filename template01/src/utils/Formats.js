
/**
 * Retorna numero formateado como String
 * @param {Number} number
 * @returns String de numero con formato de dinero
 */
const moneyString = (number) => {
    number = Math.round(number)
    return ('$' + (String(number).replace(/(.)(?=(\d{3})+$)/g, '$1.')));
};


export default moneyString;