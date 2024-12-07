import { usersStorageService } from "../storage/service/userStorageService.js";

const MIN_PASSWORD_LENGTH = 6;

const getCurrentUser = () => {
  return usersStorageService.getCurrentUser();
};

const signupUser = (data) => {
  const { passwordConfirmation, firstName, lastName } = data;
  const username = data.username.trim();
  const password = data.password.trim();

  const allUsers = usersStorageService.getAllUsers();

  const existingUserByUsername = allUsers.find((user) => {
    return username === user.username;
  });

  if (existingUserByUsername) {
    throw new Error("That username is already taken.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    );
  }

  if (password !== passwordConfirmation) {
    throw new Error("Your password confirmation is invalid.");
  }

  if (!firstName.trim()) {
    throw new Error("You must provide your first name.");
  }

  const newUser = {
    username,
    password,
    passwordConfirmation,
    firstName,
    lastName,
  };

  usersStorageService.setCurrentUser(newUser);
};

const loginUser = ({ username, password }) => {
  const allUsers = usersStorageService.getAllUsers();
  const targetUser = allUsers.find((user) => {
    return username === user.username && password === user.password;
  });

  if (!targetUser) {
    throw new Error("Invalid credentials.");
  }
};

const logoutUser = () => {
  usersStorageService.setCurrentUser(null);
};

const updateCurrentUser = (newData) => {
  const currentUser = getCurrentUser();

  const newUser = { ...currentUser };
  newUser.firstName = newData.firstName;
  newUser.lastName = newData.lastName;

  usersStorageService.setCurrentUser(newUser);
};

export const usersService = {
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
  updateCurrentUser,
};
