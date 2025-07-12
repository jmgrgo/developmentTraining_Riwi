// Prompts to ask for data.
let name = prompt("Please type the name: ");
let age = parseInt(prompt("Please type the age: "));

// Function to validate if the age is a valid number.
function validateNumber(age) {

    // While loop meant to repeat when the user puts a negative number or a text instead of a number.
  while (isNaN(age) || age < 0) {

    // Alert to indicate the user to put a valid number.
    alert("Please put a valid number.");

    // Prompt to ask for the age again.
    age = parseInt(prompt("Please type the age: "));
  }

  // Returns the age once it is a valid number.
  return age;
}


// Function to print if the person is above age or under age.
function validateAge(name, age) {

    // Compare the given age with 18.
  if (age >= 18) {
    alert(name + " is above age.");
  } else {
    alert(name + " is under age.");
  }
}

// The returned age gets assigned to the "age" variable.
age = validateNumber(age);

// Main function call
validateAge(name, age);
