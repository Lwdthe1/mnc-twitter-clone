import { StorageItemType } from "../constants.js";
import storage from "../storage.js";

const getAllPosts = () => {
  const allPosts = storage.getItemsByType(StorageItemType.Post);
  return allPosts;
};

/**
 * Shapes the data into a Post record for the database
 */
const shapePostForStorage = ({ id, data, currentUser }) => {
  const { text, createdAt, attachments } = data;
  const post = {
    text,
    attachments: [],
    createdAt,
  };

  if (attachments) {
    post.attachments = attachments.map((attachment) => {
      return { type: attachment.type, url: attachment.url };
    });
  }

  if (currentUser) {
    post.creatorUserId = currentUser.id;
  }

  post.id = id;

  return post;
};

export const postsStorageService = { getAllPosts, shapePostForStorage };
