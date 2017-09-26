$(document).ready(() => {
  const name = $('#name');
  const cardNumber = $('#card-number');
  const cvv = $('#cvv2');
  const body = $('#body-container');

  const month = $('#month');
  const year = $('#year');
  
  const submit = $('#submit');

  const errorMessage = $('#error-container');
  const errorType = $('#error-type');

  submit.click(e => {
    e.preventDefault();
    errorType.empty();
    
    if (!isValidName(name.val())) {
      errorMessage.css('visibility', 'visible');
      errorType.append('<span>Invalid name</span>');
      // alert('Invalid name!');
    } else if (!isValidCardNumber(cardNumber.val(), cvv.val())) {
      errorMessage.css('visibility', 'visible');
      errorType.append('<span>Invalid card number and cvv</span>');
      // alert('Invalid card number and cvv!');
    } else if (!isValidExpiration(month.val(), year.val())) {
      errorMessage.css('visibility', 'visible');
      errorType.append('<span>Invalid expiration</span>');
      // alert('Invalid expiration!');
    } else {
      errorMessage.css('visibility', 'hidden');
      alert('Great, everything is correct!');
    }
  });

  cardNumber.keydown(typeNumsOnly);
  cvv.keydown(typeNumsOnly);
});

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
  }
  
  return false;
};

const typeNumsOnly = (e) => {
  const isValidKey = $.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1;
  const isSelectAll = e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true);
  const isDirectionKey = e.keyCode >= 35 && e.keyCode <= 40;
  
  if (isValidKey || isSelectAll || isDirectionKey) return;
  
  const isNotANumber = e.shiftKey || (e.keyCode < 48 || e.keyCode > 57);
  const isNotOnNumberPad = e.keyCode < 96 || e.keyCode > 105;

  if (isNotANumber && isNotOnNumberPad) e.preventDefault();
};