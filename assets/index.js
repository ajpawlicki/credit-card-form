const isValidName = (name) => {
  return name.trim().length > 4;
};

const isValidCardNumber = (num, cvv) => {
  return isValidVisa(num, cvv) || isValidAmEx(num, cvv);
};

const isValidVisa = (num, cvv) => {
  const isValidLength = num.length === 16;
  const startsWith4 = num[0] === '4';
  const hasValidCVV = cvv.length === 3;

  return isValidLength && startsWith4 && hasValidCVV;
};

const isValidAmEx = (num, cvv) => {
  const isValidLength = num.length === 15;

  const firstTwoChars = num.slice(0,2);
  const hasCorrectFirstTwoChars = firstTwoChars === '34' || firstTwoChars === '37';
  
  const hasValidCVV = cvv.length === 4;

  return isValidLength && hasCorrectFirstTwoChars && hasValidCVV;
};

const isValidExpiration = (month, year) => {
  const date = new Date();
};

const typeNumsOnly = (event) => {

};

$(document).ready(() => {
  const cardNumber = $('#card-number');
  const cvv = $('#cvv2');
  
  const submit = $('#submit');

  submit.click(e => {
    e.preventDefault();

    if (isValidCardNumber(cardNumber.val(), cvv.val())) {
      alert('Great!');
    } else {
      alert('Invalid card number and cvv!');
    }
  });
});