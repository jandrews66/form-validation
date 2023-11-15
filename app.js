const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");
const country = document.getElementById("country");
const ZIPField = document.getElementById("zip");
const zipError = document.querySelector("#zip + span.error");
const password = document.getElementById("password")
const passwordError = document.querySelector("#password + span.error")
const password2 = document.getElementById("password2")
const password2Error = document.querySelector("#password2 + span.error")
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close")


form.addEventListener("submit", (event) => {

    if (!email.validity.valid) {
       showError();
       event.preventDefault();
   } else if (!getConstraint(ZIPField.value)){
       showZipError();
       event.preventDefault();
   } else if (!passConstraint.test(password.value)){
       showPasswordError();
       event.preventDefault();

   } else if (password2.value != password.value){
       showPassword2Error();
       event.preventDefault();
   }
   else {
       event.preventDefault();
       modal.classList.toggle("hidden");
       form.reset();
   } 

});

closeBtn.addEventListener("click", () => {
    modal.classList.toggle("hidden");
})

email.addEventListener("input", (event) => {
  // Each time the user types something check if fields are valid
  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, remove the error message.
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
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

}

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
    

    


ZIPField.addEventListener("input", () => {
    checkZip();
})

country.addEventListener("change", () => {
    checkZip();
})

// Build the constraint checker
function getConstraint(value){
    let constraint = new RegExp(constraints[country.value][0], "");
    return constraint.test(value)
}

function checkZip(){

      // Check it!
    if (getConstraint(ZIPField.value)) {
    // The ZIP follows the constraint, we use the ConstraintAPI to tell it
    ZIPField.setCustomValidity("");
    zipError.textContent = ZIPField.validationMessage
  
    } else {
    // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
        showZipError();
    }  
}
function showZipError(){
    ZIPField.setCustomValidity(constraints[country.value][1]);
    zipError.textContent = ZIPField.validationMessage
}


const passConstraint = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")

password.addEventListener("input", () =>{
    if (passConstraint.test(password.value)){
        passwordError.textContent = "";
    } else {
        showPasswordError();
    }
})

function showPasswordError(){
    if (password.value.length < 8) {
        passwordError.textContent = "Password must more than 8 characters long"
    } else if (password.value.length > 15){
        passwordError.textContent = "Password must more less than 16 characters"
    } else {
        passwordError.textContent = "Password must contain 1 special character and 1 number"
    }
}

password2.addEventListener("input", () => {
    if (password2.value === password.value){
        password2Error.textContent = "";
    } else{
        showPassword2Error();
    }
})

function showPassword2Error(){
    password2Error.textContent = "Input must match Password"
}