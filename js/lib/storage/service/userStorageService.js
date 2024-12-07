import {
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../../users/constants.js";
import { StorageItemType } from "../constants.js";
import storage from "../storage.js";

const getCurrentUser = () => {
  const key = storage.getItemKey(StorageItemType.CurrentUser);
  const currentUser = storage.getItem(key);
  return currentUser || null;
};

const setCurrentUser = (user) => {
  if (!user.id) {
    throw new Error("Current user must have an ID");
  }

  storage.setItem(
    StorageItemType.CurrentUser,
    shapeUserForStorage({ id: user.id, data: user })
  );
};

const unsetCurrentUser = () => {
  storage.setItem(StorageItemType.CurrentUser, null);
};

const createUser = (data) => {
  const allUsers = getAllUsers();

  const username = data.username.trim();
  const password = data.password.trim();
  const passwordConfirmation = data.passwordConfirmation.trim();
  const firstName = data.firstName.trim();

  if (username.length < MIN_USERNAME_LENGTH) {
    throw new Error(
      `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    );
  }

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

  const { storageKey, id } = storage.createItemKey(StorageItemType.User);
  const newUser = shapeUserForStorage({ id, data: data });
  storage.setItem(storageKey, newUser);

  return newUser;
};

const getAllUsers = () => {
  const allUsers = storage.getItemsByType(StorageItemType.User);
  return allUsers;
};

/**
 * Shapes the data into a User record for the database
 */
const shapeUserForStorage = ({ id, data }) => {
  const newUser = Object.entries(data)
    .filter(([key]) => {
      return key !== "passwordConfirmation";
    })
    .reduce((user, [key, value]) => {
      user[key] = value && value.trim ? value.trim() : value;
      return user;
    }, {});

  newUser.id = id;

  return newUser;
};

export const usersStorageService = {
  createUser,
  setCurrentUser,
  unsetCurrentUser,
  getCurrentUser,
  getAllUsers: getAllUsers,
  shapeUserForStorage,
};
