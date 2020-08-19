const utils = require("./utils");

const getBirthdaysEmails = () => {
  const today = utils.getCurrentDate();
  const users = getUsers();

  let emails = [];
  users.forEach((user) => {
    if (user.birthday == today) emails.push(user.email);
  });

  return emails;
};

/*
 * It reads employees data from Azure Blob Store
 */
const getUsers = () => {
  const data = require("../mock/employees.json");
  const users = data.employees.map(userParser);

  return users;
};

/*
 * It parse users to give us digested data:
 *   { email: "employee@company.com", birthday: "DD/MM" }
 */
const BIRTH_MONTH_INDEX = 1;
const BIRTH_DAY_INDEX = 2;
const userParser = (employee) => {
  const date = employee.dateOfBirth.split("-");
  const birthday = `${date[BIRTH_DAY_INDEX]}/${date[BIRTH_MONTH_INDEX]}`;

  return { birthday: birthday, email: employee.workEmail };
};

module.exports = getBirthdaysEmails;
