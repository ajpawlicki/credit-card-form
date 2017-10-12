$(document).ready(() => {
  const name = $('#name');
  const cardNumber = $('#card-number');
  const cvv = $('#cvv2');

  const month = $('#month');
  const year = $('#year');
  
  const submit = $('#submit');

  const errorMessage = $('#error-container');
  const errorType = $('#error-type');

  submit.click(e => {
    e.preventDefault();
    errorType.empty();
    errorMessage.css('display', 'block');
    
    if (!isValidName(name.val())) {
      errorType.append('<span>Invalid name</span>');

    } else if (!isValidCardNumber(cardNumber.val(), cvv.val())) {
      errorType.append('<span>Invalid card number and cvv</span>');

    } else if (!isValidExpiration(month.val(), year.val())) {
      errorType.append('<span>Invalid expiration</span>');

    } else {
      errorMessage.css('display', 'none');
      alert('Great, everything looks good!');
    }
  });

  cardNumber.keydown(typeNumsOnly);
  cvv.keydown(typeNumsOnly);

  const amex = $('#amex');
  const visa = $('#visa');

  const cardNumberField = $('#card-number-field');

  cardNumber.keyup(() => {
    amex.removeClass('transparent');
    visa.removeClass('transparent');

    const startsWith4 = cardNumber.val()[0] === '4';
    if (startsWith4) amex.addClass('transparent');
    
    const firstTwoChars = cardNumber.val().slice(0,2);
    const hasAmexFirstTwoChars = firstTwoChars === '34' || firstTwoChars === '37';

    if (hasAmexFirstTwoChars) visa.addClass('transparent');

    if (isValidAmExNum(cardNumber.val()) || isValidVisaNum(cardNumber.val())) {
      cardNumberField.removeClass('has-error');
      cardNumberField.addClass('has-success');
    } else {
      cardNumberField.addClass('has-error');
    }
  });

  const cvvField = $('#cvv-field');

  cvv.keyup(() => {
    if (isValidCardNumber(cardNumber.val(), cvv.val())) {
      cvvField.removeClass('has-error');
      cvvField.addClass('has-success');
    } else {
      cvvField.addClass('has-error');
    }
  });
});

// Functions to call for user events:

const isValidName = (name) => {
  return name.trim().length > 4;
};

const isValidCardNumber = (num, cvv) => {
  const isValidVisa = isValidVisaNum(num) && isValidVisaCVV(cvv);
  const isValidAmEx = isValidAmExNum(num) && isValidAmExCVV(cvv);

  return isValidVisa || isValidAmEx;
};

const isValidVisaNum = (num) => {
  const isValidLength = num.length === 16;
  const startsWith4 = num[0] === '4';
  
  return isValidLength && startsWith4;
};

const isValidVisaCVV = (cvv) => {
  return cvv.length === 3;
};

const isValidAmExNum = (num) => {
  const isValidLength = num.length === 15;

  const firstTwoChars = num.slice(0,2);
  const hasCorrectFirstTwoChars = firstTwoChars === '34' || firstTwoChars === '37';
  
  return isValidLength && hasCorrectFirstTwoChars;
};

const isValidAmExCVV = (cvv) => {
  return cvv.length === 4;
};

const isValidExpiration = (month, year) => {
  const date = new Date();
  
  const currMonth = date.getMonth() + 1;
  const currYear = date.getFullYear();

  if (year > currYear) {
    return true;
  } else if (+year === currYear) {
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