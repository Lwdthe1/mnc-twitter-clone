import { usersStorageService } from "../storage/service/userStorageService.js";

const getCurrentUser = () => {
  return usersStorageService.getCurrentUser();
};

const signupUser = ({
  username,
  password,
  passwordConfirmation,
  firstName,
  lastName,
}) => {
  const allUsers = usersStorageService.getAllUsers();

  const existingUser = allUsers.find((user) => {
    return username === user.username;
  });

  if (existingUser) {
    throw new Error("That username is already taken.");
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
