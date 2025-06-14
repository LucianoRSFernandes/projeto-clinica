exports.validarPlano = async (planoSaude) => {
    if (!planoSaude) {
        return false;
    }
    const dataVencimento = new Date(planoSaude.dataVencimento);
    const hoje = new Date();
    return dataVencimento >= hoje;
};