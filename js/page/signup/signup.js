import { navigateToHomePage } from "../../lib/router/router.js";
import { usersService } from "../../lib/users/userService.js";

const signup = () => {
  const firstNameInput = document.querySelector('input[name="firstName"]');
  const lastNameInput = document.querySelector('input[name="lastName"]');
  const usernameInput = document.querySelector('input[name="username"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const passwordConfirmationInput = document.querySelector(
    'input[name="passwordConfirmation"]'
  );

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const username = usernameInput.value.trim().replaceAll(" ", "");
  const password = passwordInput.value;
  const passwordConfirmation = passwordConfirmationInput.value;
  if (!username) {
    alert("Enter a valid username");
    return;
  }

  try {
    usersService.signupUser({
      username,
      password,
      passwordConfirmation,
      firstName,
      lastName,
    });

    navigateToHomePage();
  } catch (err) {
    console.error(err);
    alert(`Failed to signup due to: ${err.message}`);
  }
};

export { signup };
