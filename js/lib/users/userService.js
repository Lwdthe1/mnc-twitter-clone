import { usersStorageService } from "../storage/service/userStorageService.js";

const getCurrentUser = () => {
  return usersStorageService.getCurrentUser();
};

const signupUser = (data) => {
  const newUser = usersStorageService.createUser(data);

  if (!newUser) {
    throw new Error("Failed to create that user.");
  }

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
  usersStorageService.unsetCurrentUser();
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
