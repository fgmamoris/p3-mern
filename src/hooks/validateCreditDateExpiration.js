export const validateCreditDateExpiration = (inputExpireDate) => {
  if (
    parseInt(inputExpireDate[0] + inputExpireDate[1]) <= 0 ||
    parseInt(inputExpireDate[0] + inputExpireDate[1]) >= 13
  ) {
    return { msg: 'Debe ingresar un mes válido', valid: 'true' };
  } else if (
    parseInt(inputExpireDate[2] + inputExpireDate[3]) <
    new Date().getFullYear() - 2000
  ) {
    return { msg: 'Tarjeta vencida', valid: 'true' };
  } else if (
    parseInt(inputExpireDate[2] + inputExpireDate[3]) >
    new Date().getFullYear() - 2000
  ) {
    return { msg: 'Tarjeta válida', valid: 'false' };
  } else if (
    parseInt(inputExpireDate[2] + inputExpireDate[3]) ===
      new Date().getFullYear() - 2000 &&
    inputExpireDate[0] + inputExpireDate[1] < new Date().getMonth() + 1
  ) {
    return { msg: 'Tarjeta vencida', valid: 'true' };
  } else {
    return { msg: 'Tarjeta válida', valid: 'false' };
  }
};
