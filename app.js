const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");
const zipError = document.querySelector("#zip + span.error");
const password = document.getElementById("password")
const passwordError = document.querySelector("#password + span.error")
const password2 = document.getElementById("password2")
const password2Error = document.querySelector("#password2 + span.error")


email.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", (event) => {
    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
      // If it isn't, we display an appropriate error message
      showError();
      // Then we prevent the form from being sent by canceling the event
      event.preventDefault();
    } else {
        
        console.log("High Five!")
        event.preventDefault();

    }

});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}

function checkZIP() {
    // For each country, defines the pattern that the ZIP has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };
  
    // Read the country id
    const country = document.getElementById("country").value;
  
    // Get the NPA field
    const ZIPField = document.getElementById("zip");
  
    // Build the constraint checker
    const constraint = new RegExp(constraints[country][0], "");
  
    // Check it!
    if (constraint.test(ZIPField.value)) {
      // The ZIP follows the constraint, we use the ConstraintAPI to tell it
      ZIPField.setCustomValidity("");
      zipError.textContent = ZIPField.validationMessage

    } else {
      // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
      // give a message about the format required for this country
        showZipError();

    }

    function showZipError(){
        ZIPField.setCustomValidity(constraints[country][1]);
        zipError.textContent = ZIPField.validationMessage
    }
}

password.addEventListener("input", () =>{
    constraint = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
    if (constraint.test(password.value)){
        passwordError.textContent = "";
    } else if (password.value.length < 8) {
        passwordError.textContent = "Password must more than 8 characters long"
    } else if (password.value.length > 15){
        passwordError.textContent = "Password must more less than 16 characters"
    } else {
        passwordError.textContent = "Password must contain 1 special character and 1 number"
    }
})

password2.addEventListener("input", () => {
    if (password2.value === password.value){
        password2Error.textContent = "";
    } else {
        password2Error.textContent = "Input must match Password"
    }
})

window.onload = () => {
    document.getElementById("zip").oninput = checkZIP;
    document.getElementById("country").oninput = checkZIP;

};