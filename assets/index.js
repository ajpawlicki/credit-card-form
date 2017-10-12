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
    errorMessage.show();
    
    if (!isValidName(name.val())) {
      errorType.append('<span>Invalid name</span>');

    } else if (!isValidCardNumber(cardNumber.val(), cvv.val())) {
      errorType.append('<span>Invalid card number and cvv</span>');

    } else if (!isValidExpiration(month.val(), year.val())) {
      errorType.append('<span>Invalid expiration</span>');

    } else {
      errorMessage.hide();
      alert('Great, everything looks good!');
    }
  });

  cardNumber.keydown(typeNumsOnly);
  cvv.keydown(typeNumsOnly);

  const amex = $('#amex');
  const visa = $('#visa');

  const cardNumberField = $('#card-number-field');

  cardNumber.keyup(() => {
    const cardNumberEl = cardNumber[0];
    const cvvEl = cvv[0];

    amex.removeClass('transparent');
    visa.removeClass('transparent');
    cardNumberEl.maxLength = '16';
    cvvEl.maxLength = '4';

    if (startsWith4(cardNumber.val())) {
      amex.addClass('transparent');
      
      cardNumberEl.maxLength = '16';
      cvvEl.maxLength = '3';
    }

    if (hasAmexFirstTwoChars(cardNumber.val())) {
      visa.addClass('transparent');

      cardNumberEl.maxLength = '15';
      cvvEl.maxLength = '4';
    }

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

const startsWith4 = (num) => {
  return num[0] === '4';
};

const isValidVisaNum = (num) => {
  const isValidLength = num.length === 16;
  
  return isValidLength && startsWith4(num);
};

const isValidVisaCVV = (cvv) => {
  return cvv.length === 3;
};

const hasAmexFirstTwoChars = (num) => {
  const firstTwoChars = num.slice(0,2);

  return firstTwoChars === '34' || firstTwoChars === '37';
};

const isValidAmExNum = (num) => {
  const isValidLength = num.length === 15;

  return isValidLength && hasAmexFirstTwoChars(num);
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
  const isReloadPage = e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true);
  const isDirectionKey = e.keyCode >= 35 && e.keyCode <= 40;
  
  if (isValidKey || isSelectAll || isReloadPage || isDirectionKey) return;
  
  const isNotANumber = e.shiftKey || (e.keyCode < 48 || e.keyCode > 57);
  const isNotOnNumberPad = e.keyCode < 96 || e.keyCode > 105;

  if (isNotANumber && isNotOnNumberPad) e.preventDefault();
};