$(document).ready(function() {
  // --- our code goes here ---
  console.log('READY SIR');

  //register char input on #twee-text text area
  $("#tweet-text").keyup(function() {
    //get this object count
    let textArea = $(this);

    //get counter object
    let counter = textArea.next().find('output');
    //assign the value
    const remainingChar = 140 - $(this).val().length;
    counter.val(remainingChar);

    //change element color based on value
    counter.css('color', remainingChar < 0 ? 'rgba(235, 8, 8, 0.85)' : ' #2121209f');
    textArea
    
  });

  $("#btn").on('click', function() {
    console.log('(){}', this); //The this keyword is a reference to the button
  });

  $("#btn").on('click', () => {
    textArea.val();
    console.log('=>', this); //The this keyword here refers to something else!
  });

});

