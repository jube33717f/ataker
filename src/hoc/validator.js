// TODO @SONIA

const validatorEmail = {
  func: val => val && val.match(/\S+@\S+\.\S+/),
  msg: "Please type in valid email"
};
const validatorPwd = {
  func: val => val && val.length > 6,
  msg: "Length of password should be more than 6"
};

const validatorUsername = {
  func: val => val && val.match(/^[a-zA-Z ]+$/),
  msg: "Please type in valid username"
};

const validatorAge = {
  func: val => val && !isNaN(val) && val > 0 && val < 100,
  msg: "Please type in valid age"
};

const validatorTaskBudget = {
  func: val => val && !isNaN(val) && val > 5 && val < 9999,
  msg: "Please suggest a budget between $5 and $9,999 for your task"
};

const validatorNumOfCharacters = (min, max) => ({
  func: val => val && val.length > min && val.length < max,
  msg: `Please enter at least  ${min} characters and a maximum of ${max}`
})

const validatorNumOfDigits = (numOfDigits) => ({
  func: val => val && val.match(new RegExp("^[0-9]{" + numOfDigits + "}$")),
  msg: `Please enter a valid ${numOfDigits}-digit number`
})

const validatorDateOfBirth = {
  func: val => val && val.match(/(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/),//any date between 1900-2099
  msg: "Please enter a valid birth date"
}

export const validators = {
  email: validatorEmail,
  password: validatorPwd,
  age: validatorAge,
  username: validatorUsername,
  taskTitle: validatorNumOfCharacters(10, 50),
  taskDetail: validatorNumOfCharacters(25, 1500),
  taskBudget: validatorTaskBudget,
  accountNumber: validatorNumOfDigits(8),
  accountBsb: validatorNumOfDigits(6),
  postCode: validatorNumOfDigits(4),
  dateOfBirth: validatorDateOfBirth,
  mobileNumber: validatorNumOfDigits(10),
};
