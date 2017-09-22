var display = document.getElementById('display');
var historyDisplay = document.getElementById('history');
var showHistory = document.getElementById('showHistory');
var memoryStack = 0;
function clearDisplay(){
  display.textContent = 0;
}


function blink(){
  $('#display').css('opacity', 0).animate({'opacity': 1}, 75);
}


function addNumber(number){
  var displayedNumber = display.textContent;
  if (display.textContent.length > 20){
    blink();
  } else {
    if (displayedNumber === '0'){
      if (number === '0'){
        blink();
      } else {
        display.textContent = number;
      }
    } else {
      if (displayedNumber === '(0'){
        display.textContent = '(' + number;
      } else {
        display.textContent = displayedNumber + number;
      }
    }
  }
};


function addOperand(operand){
  if (historyDisplay.textContent.slice(-1) === ')'){
    historyDisplay.textContent += operand;
  } else {
    if (historyDisplay.textContent.match(/\=/g)){
      historyDisplay.textContent = display.textContent + operand;
    } else {
      historyDisplay.textContent += display.textContent + operand;
    }
  }
  showHistory.textContent = historyDisplay.textContent.slice(-22);
  clearDisplay();
}


function clearHistory(){
  if ((display.textContent) === '0'){
    historyDisplay.textContent = '';
    showHistory.textContent = historyDisplay.textContent.slice(-22);
  } else {
    clearDisplay();
  }
}

function deleteLastNumber(){
  if (display.textContent !== '0'){
    if (display.textContent.length > 1){
      display.textContent = display.textContent.slice(0,-1);
    } else {
      clearDisplay();
    }
  } else {
    blink();
  }
}

function addDot(){
  if (display.textContent.match(/\./g)){
    blink();
  } else {
    display.textContent += '.';
  }
}

function plusMinus(){
  if (display.textContent === '0'){
    blink();
  } else {
    if (display.textContent.match(/-/g)){
      display.textContent = display.textContent.slice(1);
    } else {
      display.textContent = '-'+ display.textContent;
    }
  }
}

function calculate(){
  //CHECK IF THE EXPRESSION HAS BEEN parseFloat
  if (historyDisplay.textContent.match(/=/g)){
    // CHECK IF THE WHOLE EXPRESSION IS IN PARENTHESIS
    if (historyDisplay.textContent.match(/^\(.+\)=$/g)){
      var lastOperation = historyDisplay.textContent.match(/([\/\+\*\-].+)\)=$/);
      historyDisplay.textContent = display.textContent + lastOperation[1] + '=';
      let result = eval(historyDisplay.textContent.slice(0,-1))
      display.textContent = result;
    } else {
      var lastOperation = historyDisplay.textContent.match(/[\/\+\*\-]\(?.+\)?=/);
      historyDisplay.textContent = display.textContent + lastOperation;
      let result = eval(historyDisplay.textContent.slice(0,-1));
      display.textContent = result;
    }
  } else {
    if (historyDisplay.textContent.slice(-1) === ')'){
      historyDisplay.textContent += '=';
      display.textContent = eval(historyDisplay.textContent.slice(0,-1));
    } else {
      historyDisplay.textContent += (display.textContent + '=');
      var result = eval(historyDisplay.textContent.slice(0,-1));
      display.textContent = result;
    }
  }
  showHistory.textContent = historyDisplay.textContent.slice(-22);
}

function memoryPlus(){
  memoryStack += eval(display.textContent);
  document.getElementById('memory-stack').textContent = 'M';
  clearDisplay();
}

function memoryRecall(){
  display.textContent = memoryStack;
}

function eraseMemory(){
  document.getElementById('memory-stack').textContent = '';
  memoryStack = 0;
}

function startParenthesis(){
  var leftParenthesisCounter = (historyDisplay.textContent.match(/\(/g) || []).length;
  var rightParenthesisCounter = (historyDisplay.textContent.match(/\)/g) || []).length;
  var currentLeftParenthesisCounter = (display.textContent.match(/\(/g) || []).length;

  if (leftParenthesisCounter + currentLeftParenthesisCounter < (rightParenthesisCounter + 1)){
    display.textContent = '('+display.textContent;
  } else {
    blink();
  }
  showHistory.textContent = historyDisplay.textContent.slice(-22);
}

function closeParenthesis(){
  var leftParenthesisCounter = (historyDisplay.textContent.match(/\(/g) || []).length;
  var rightParenthesisCounter = (historyDisplay.textContent.match(/\)/g) || []).length;
  var currentLeftParenthesisCounter = (display.textContent.match(/\(/g) || []).length;

  if (rightParenthesisCounter === leftParenthesisCounter){
    blink();
  } else {
    historyDisplay.textContent += display.textContent + ')';
  }
  clearDisplay();
  showHistory.textContent = historyDisplay.textContent.slice(-22);
}



// $(document).ready(function(){
//   function blink(){
//     $('#display').css('opacity', 0).animate({'opacity': 1}, 100);
//   }
//   // // PUT THE CURRENT BUTTON'S VALUE TO THE CURRENT STEP
//   // // READY
//   // $('#button-1,\
//   //    #button-2,\
//   //    #button-3,\
//   //    #button-4,\
//   //    #button-5,\
//   //    #button-6,\
//   //    #button-7,\
//   //    #button-8,\
//   //    #button-9').on('click', function(){
//   //   currentOperation += $(this).text();
//   //   if (lastOperation !== ''){
//   //     lastOperation += $(this).text();
//   //   }
//   //   showCurrentStep();
//   // });
//
//
//   // TAKE CARE IF THE 0 PRESSED AS THE FIRST VALUE
//   $('#button-0').on('click', function(){
//     if (currentOperation !== ''){
//       currentOperation += $(this).text();
//     }
//     if (lastOperation !== ''){
//       lastOperation += $(this).text();
//     }
//     showCurrentStep();
//   });
//
//
//   // DELETE THE LAST STEP
//   $('#c').on('click', function(){
//     if (currentOperation !== ''){
//       currentOperation = '';
//     } else {
//       lastOperation = operations = currentOperation = '';
//     }
//     showCurrentStep();
//     showOperationHistory();
//     blink();
//   });
//
//
//   // DELETE LAST NUMBER;
//   $('#del').on('click', function(){
//     if (currentOperation.length>1){
//       currentOperation = currentOperation.slice(0, -1);
//       lastOperation = lastOperation.slice(0,-1);
//     } else {
//       currentOperation = '';
//     }
//     showCurrentStep();
//     blink();
//   });
//
//
//   // MANAGE DECIMAL VALUES
//   $('#button-dot').on('click', function(){
//     if (currentOperation.indexOf('.') === -1){
//       currentOperation += $(this).text();
//     } else {
//       $('#display').css('opacity', 0).animate({'opacity': 1}, 100);
//     }
//     showCurrentStep();
//   });
//
//
//   // MANAGE PLUS-MINUS BUTTON
//  $('#button-plusminus').on('click', function(){
//    if ((/[0-9]/).test(currentOperation[0])){
//      currentOperation = '-' + currentOperation;
//      lastOperation = lastOperation[0] + '-' + lastOperation.slice(1);
//    } else {
//      currentOperation = currentOperation.slice(1);
//      lastOperation = lastOperation.slice(1);
//    }
//    showCurrentStep();
//  });
//
//   // MANAGE PARENTHESIS
//   $('#p-left').on('click', function(){
//     if (currentOperation[0] === '('){
//       blink();
//     } else {
//       currentOperation = '( ' + currentOperation;
//     }
//     showOperationHistory();
//     showCurrentStep();
//   })
//
//
//   $('#p-right').on('click', function(){
//     var leftCounter = (operations.match(/\(/g) || []).length;
//     var rightCounter = (operations.match(/\)/g) || []).length;
//
//     if ((operations.match(/=/g)) || (operations === '')){
//       blink();
//     } else {
//
//       // CHECK, IF THE USER WOULD LIKE TO CLOSE A PARENTHESIS WHICH HAVEN'T BEEN OPENED
//       if (leftCounter > rightCounter){
//         operations += ' ' + currentOperation + ' )  ';
//       } else {
//         operations = '( '+ operations + ' ' + currentOperation + ' )  ';
//       }
//     }
//
//
//     currentOperation = '';
//     showCurrentStep();
//     showOperationHistory();
//   })
//
//
//   //
//   // WHEN AN OPERATION BUTTION HAS BEEN PRESSED, IT ADDS TO THE HISTORY.
//   // IF CURRENT VALUE IS EMPTY, IT CHANGES THE LAST OPERAND
//   //
//   $('#button-plus, \
//      #button-minus, \
//      #button-divide, \
//      #button-multiply').on('click', function(){
//
//      // CHECK, THAT IF WE SHOULD WORK WITH THE RESULT OF PREVIOUS CALCULATION
//      if (operations.match(/[=]/i)){
//        operations = currentOperation + ' ' + $(this).text();
//        showOperationHistory();
//        currentOperation = '';
//        showCurrentStep();
//      }
//
//      if (currentOperation !== ''){
//        // IF THERE IS A VALUE TO WORK WITH
//        operations += ' ' + currentOperation + ' ' + $(this).text();
//        currentOperation = '';
//      } else {
//        if (operations === ''){
//          operations = '0 ' + operations.slice(0,-1) + $(this).text();
//        } else {
//          // JUST CHANGING THE CURRENT OPERAND
//          operations = operations.slice(0,-1) + $(this).text();
//        }
//      }
//      lastOperation = $(this).text() + ' ' ;
//      showCurrentStep();
//      showOperationHistory();
//    });
//
//
//   // SHOW THE RESULT
//   $('#button-equal').on('click', function(){
//     var leftCounter = (operations.match(/\(/g) || []).length;
//     var rightCounter = (operations.match(/\)/g) || []).length;
//
//     // GRAB THE WHOLE OPERATION WITHOUT THE LAST OPERAND,
//     // THEN ADD THE LAST OPERATION PLUS AN EQUAL SIGN
//     operations = operations.slice(0, -1) + ' ' + lastOperation + ' =';
//     showOperationHistory();
//     // THE DISPLAY WILL SHOW THE COMPLETE LIST OF THE OPERATIONS WITHOUT
//     // THE EQUAL SIGN AT THE END, AND MAKES THE CALCULATION
//     // BUT AT FIRST CHECK, IF EVERY PARENTHESIS ARE CLOSED
//     while (rightCounter !== leftCounter){
//       operations = operations.slice(0,-1)+') =';
//       rightCounter = (operations.match(/\)/g) || []).length;
//       showOperationHistory();
//     }
//     currentOperation = parseFloat(operations.slice(0, -1));
//     // IT SHOWS THE RESULT
//     showCurrentStep();
//     // IT SET UP THE RESULT AS THE LAST OPERAND
//     operations = currentOperation + ' =';
//     return currentOperation;
//    });
//
//
//
//
//
//    $('#mr').on('click', function(memory){
//      currentOperation = memory;
//      alert(memory);
//      showCurrentStep();
//    });
//
//
//    // CLEAR THE MEMORY STACK
//    $('#mc').on('click', function(){
//      $('#memory-stack').html('');
//      memory = 0;
//    });
//
   // SET KEYPRESSES
   $(document).on('keyup', function(e){
     switch (e.which){
          case 48:
          case 96:
            $('#button-0').click();
            break;
          case 49:
          case 97:
            $('#button-1').click();
            break;
          case 50:
          case 98:
            $('#button-2').click();
            break;
          case 51:
          case 99:
            $('#button-3').click();
            break;
          case 52:
          case 100:
            $('#button-4').click();
            break;
          case 53:
          case 101:
            $('#button-5').click();
            break;
          case 54:
          case 102:
            $('#button-6').click();
            break;
          case 55:
          case 103:
            $('#button-7').click();
            break;
          case 56:
          case 104:
            $('#button-8').click();
            break;
          case 57:
          case 105:
            $('#button-9').click();
            break;
          case 190:
            $('#button-dot').click();
            break;
          case 173:
            $('#button-minus').click();
            break;
          case 109:
            $('#button-plus').click();
            break;
          case 106:
            $('#button-multiply').click();
            break;
          case 111:
            $('#button-divide').click();
            break;
          case 13:
            $('#button-equal').click();
            break;
     }
   });
// });
