$(document).ready(function(){
  var currentOperation = '';
  var lastOperation = '';
  var operations = '';

  function showCurrentStep(){
    if (currentOperation[0] === '.'){
      currentOperation = '0.';
    }

    if (currentOperation === ''){
      $('#display').html('0');
    } else {
      $('#display').html(currentOperation);
    }
  }
  showCurrentStep();


  function showOperationHistory(){
    $('#calculations').html(operations);
  }
  showOperationHistory();


  function blink(){
    $('#display').css('opacity', 0).animate({'opacity': 1}, 100);
  }
  // PUT THE CURRENT BUTTON'S VALUE TO THE CURRENT STEP
  // READY
  $('#button-1,\
     #button-2,\
     #button-3,\
     #button-4,\
     #button-5,\
     #button-6,\
     #button-7,\
     #button-8,\
     #button-9').on('click', function(){
    currentOperation += $(this).text();
    if (lastOperation !== ''){
      lastOperation += $(this).text();
    }
    showCurrentStep();
  });


  // TAKE CARE IF THE 0 PRESSED AS THE FIRST VALUE
  $('#button-0').on('click', function(){
    if (currentOperation !== ''){
      currentOperation += $(this).text();
    }
    if (lastOperation !== ''){
      lastOperation += $(this).text();
    }
    showCurrentStep();
  });


  // DELETE THE LAST STEP
  $('#c').on('click', function(){
    if (currentOperation !== ''){
      currentOperation = '';
    } else {
      lastOperation = operations = currentOperation = '';
    }
    showCurrentStep();
    showOperationHistory();
    blink();
  });


  // DELETE LAST NUMBER;
  $('#del').on('click', function(){
    if (currentOperation.length>1){
      currentOperation = currentOperation.slice(0, -1);
      lastOperation = lastOperation.slice(0,-1);
    } else {
      currentOperation = '';
    }
    showCurrentStep();
    blink();
  });


  // MANAGE DECIMAL VALUES
  $('#button-dot').on('click', function(){
    if (currentOperation.indexOf('.') === -1){
      currentOperation += $(this).text();
    } else {
      $('#display').css('opacity', 0).animate({'opacity': 1}, 100);
    }
    showCurrentStep();
  });


  // MANAGE PLUS-MINUS BUTTON
 $('#button-plusminus').on('click', function(){
   if ((/[0-9]/).test(currentOperation[0])){
     currentOperation = '-' + currentOperation;
     lastOperation = lastOperation[0] + '-' + lastOperation.slice(1);
   } else {
     currentOperation = currentOperation.slice(1);
     lastOperation = lastOperation.slice(1);
   }
   showCurrentStep();
 });

  // MANAGE PARENTHESIS
  $('#p-left').on('click', function(){
    if (currentOperation[0] === '('){
      blink();
    } else {
      currentOperation = '( ' + currentOperation;
    }
    showOperationHistory();
    showCurrentStep();
  })

  $('#p-right').on('click', function(){
    var leftCounter = (operations.match(/\(/g) || []).length;
    var rightCounter = (operations.match(/\)/g) || []).length;

    if ((operations.match(/=/g)) || (operations === '')){
      blink();
    } else {

      // CHECK, IF THE USER WOULD LIKE TO CLOSE A PARENTHESIS WHICH HAVEN'T BEEN OPENED
      if (leftCounter > rightCounter){
        operations += ' ' + currentOperation + ' )  ';
      } else {
        operations = '( '+ operations + ' ' + currentOperation + ' )  ';
      }
    }


    currentOperation = '';
    showOperationHistory();
  })


  //
  // WHEN AN OPERATION BUTTION HAS BEEN PRESSED, IT ADDS TO THE HISTORY.
  // IF CURRENT VALUE IS EMPTY, IT CHANGES THE LAST OPERAND
  //
  $('#button-plus, \
     #button-minus, \
     #button-divide, \
     #button-multiply').on('click', function(){

     // CHECK, THAT IF WE SHOULD WORK WITH THE RESULT OF PREVIOUS CALCULATION
     if (operations.match(/[=]/i)){
       operations = currentOperation + ' ' + $(this).text();
       showOperationHistory();
       currentOperation = '';
       showCurrentStep();
     }

     if (currentOperation !== ''){
       // IF THERE IS A VALUE TO WORK WITH
       operations += ' ' + currentOperation + ' ' + $(this).text();
       currentOperation = '';
     } else {
       if (operations === ''){
         operations = '0 ' + operations.slice(0,-1) + $(this).text();
       } else {
         // JUST CHANGING THE CURRENT OPERAND
         operations = operations.slice(0,-1) + $(this).text();
       }
     }
     lastOperation = $(this).text() + ' ' ;
     showCurrentStep();
     showOperationHistory();
   });


  // SHOW THE RESULT
  $('#button-equal').on('click', function(){
    var leftCounter = (operations.match(/\(/g) || []).length;
    var rightCounter = (operations.match(/\)/g) || []).length;

    // GRAB THE WHOLE OPERATION WITHOUT THE LAST OPERAND,
    // THEN ADD THE LAST OPERATION PLUS AN EQUAL SIGN
    operations = operations.slice(0, -1) + ' ' + lastOperation + ' =';
    showOperationHistory();
    // THE DISPLAY WILL SHOW THE COMPLETE LIST OF THE OPERATIONS WITHOUT
    // THE EQUAL SIGN AT THE END, AND MAKES THE CALCULATION
    // BUT AT FIRST CHECK, IF EVERY PARENTHESIS ARE CLOSED
    while (rightCounter !== leftCounter){
      operations = operations.slice(0,-1)+') =';
      rightCounter = (operations.match(/\)/g) || []).length;
      showOperationHistory();
    }
    currentOperation = eval(operations.slice(0, -1));
    // IT SHOWS THE RESULT
    showCurrentStep();
    // IT SET UP THE RESULT AS THE LAST OPERAND
    operations = currentOperation + ' =';
   });


});
