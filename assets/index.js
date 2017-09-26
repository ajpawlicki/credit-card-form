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
  
  const currMonth = date.getMonth() + 1;
  const currYear = date.getFullYear();

  if (year > currYear) {
    return true;
  } else if (Number(year) === currYear) {
    return month > currMonth;
  } else {
    return false;
  }
};

const typeNumsOnly = (event) => {

};

$(document).ready(() => {
  const name = $('#name');
  const cardNumber = $('#card-number');
  const cvv = $('#cvv2');

  const month = $('#month');
  const year = $('#year');
  
  const submit = $('#submit');

  submit.click(e => {
    e.preventDefault();

    if (!isValidName(name.val())) {
      alert('Invalid name!');
    } else if (!isValidCardNumber(cardNumber.val(), cvv.val())) {
      alert('Invalid card number and cvv!');
    } else if (!isValidExpiration(month.val(), year.val())) {
      alert('Invalid expiration!');
    } else {
      alert('Great!');
    }
  });
});