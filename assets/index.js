const isValidName = (name) => {
  return name.trim().length > 4;
};

const isValidCardNumber = (num, cvv) => {
  return isValidVisa(num, cvv) || isValidAmEx(num, cvv);
};

const isValidVisa = (num, cvv) => {
  
};

const isValidAmEx = (num, cvv) => {

};

const isValidExpiration = (month, year) => {

};

const typeNumsOnly = () => {

}

$(document).ready(() => {

});