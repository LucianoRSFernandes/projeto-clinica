function getMonthYear(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    return `${year}-${month}`;
  }
  
  module.exports = { getMonthYear };