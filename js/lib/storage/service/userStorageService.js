import { StorageItemType } from "../constants.js";
import storage from "../storage.js";

const getCurrentUser = () => {
  const key = storage.getItemKey(StorageItemType.CurrentUser);
  const currentUser = storage.getItem(key);
  return currentUser || null;
};

const setCurrentUser = (user) => {
  const { storageKey, id } = storage.createItemKey(StorageItemType.CurrentUser);
  storage.setItem(storageKey, shapeUserForStorage({ id, data: user }));
};

const getAllUsers = () => {
  const allUsers = storage.getItemsByType(StorageItemType.User);
  return allUsers;
};

/**
 * Shapes the data into a User record for the database
 */
const shapeUserForStorage = ({ id, data }) => {
  const newUser = Object.entries(data).reduce((user, [key, value]) => {
    user[key] = value && value.trim ? value.trim() : value;
    return user;
  }, {});

  newUser.id = id;

  return newUser;
};

export const usersStorageService = {
  setCurrentUser,
  getCurrentUser,
  getAllUsers: getAllUsers,
  shapeUserForStorage,
};
