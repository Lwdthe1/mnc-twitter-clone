import { StorageItemType } from "../constants.js";
import storage from "../storage.js";

const getCurrentUser = () => {
  const key = storage.getItemKey(StorageItemType.CurrentUser);
  const currentUser = storage.getItem(key);
  return currentUser || null;
};

const getAllUsers = () => {
  const allUsers = storage.getItemsByType(StorageItemType.User);
  return allUsers;
};

/**
 * Shapes the data into a User record for the database
 */
const shapeUserForStorage = ({ id, data }) => {
  const { name, imageUrl } = data;

  const user = { username, name, imageUrl, password };

  user.id = id;

  return user;
};

export const usersStorageService = {
  getCurrentUser,
  getAllUsers: getAllUsers,
  shapeUserForStorage,
};
