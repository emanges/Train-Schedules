
var config = {
    apiKey: "AIzaSyBLY5I_askhoat4I0Pw5YGhUqqPc98ZZqs",
    authDomain: "train-schedule-98798.firebaseapp.com",
    databaseURL: "https://train-schedule-98798.firebaseio.com",
    projectId: "train-schedule-98798",
    storageBucket: "train-schedule-98798.appspot.com",
    messagingSenderId: "601026573051"
  };

firebase.initializeApp(config);
  
 var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-name-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), 'h:mm:ss a').format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: firstTrain,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-name-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");   

});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

      // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain= childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextArrival= moment(nextTrain).format("hh:mm");


    var newRow = $("<tr>").append(
        $("<td>").text(trainName ),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextArrival),
       
      );
    
      // Append the new row to the table
      $("#employee-table > tbody").append(newRow);


    });
    

  