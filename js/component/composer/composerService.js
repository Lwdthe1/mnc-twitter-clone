import { StorageItemType } from "../../lib/storage/constants.js";
import { postsStorageService } from "../../lib/storage/service/postsStorageService.js";
import { usersStorageService } from "../../lib/storage/service/userStorageService.js";
import storage from "../../lib/storage/storage.js";
import { postsService } from "../posts/postsService.js";
import { PostAttachmentType } from "./constants.js";
import queryHelper from "./queryHelper.js";

const {
  getImageElement,
  getImageInputElement,
  getTextAreaElement,
  getRemoveImageButtonElement,
} = queryHelper;

export function createPost() {
  const textAreaElement = getTextAreaElement();
  const selectedImageElement = getImageElement();
  const selectedImageUrl = selectedImageElement.src;

  const text = textAreaElement.value;

  const data = { text, createdAt: new Date().toISOString() };

  if (selectedImageUrl) {
    data.attachments = [
      { type: PostAttachmentType.Image, url: selectedImageUrl },
    ];
  }

  const { storageKey, id } = storage.createItemKey(StorageItemType.Post);

  const post = postsStorageService.shapePostForStorage({
    id,
    data,
  });

  post.creatorUserId = usersStorageService.getCurrentUser()?.id;

  storage.setItem(storageKey, post);

  _resetComposer();

  postsService.prependPostToMainFeed(post);
}

export function updatePost(originalPost, newData) {
  const { id } = originalPost;
  const newPost = postsStorageService.shapePostForStorage({
    id,
    data: {
      ...originalPost,
      // We want the newData last
      // so that it overrides the values of the originalPost
      ...newData,
    },
  });

  const storageKey = storage.getItemKey(StorageItemType.Post, id);

  storage.setItem(storageKey, newPost);

  return newPost;
}

export function deletePost(postId) {
  const storageKey = storage.getItemKey(StorageItemType.Post, postId);
  storage.deleteItem(storageKey);
}

export function onSelectImageButtonClick() {
  const imageInputElement = getImageInputElement();
  imageInputElement.click();
}

/**
 * Learn more about reading files from the user's computer: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_showing_thumbnails_of_user-selected_images
 */
export function onImageInputChange() {
  const imageInputElement = getImageInputElement();
  const selectedImageElement = getImageElement();

  const file = imageInputElement.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const removeImageButtonElement = getRemoveImageButtonElement();
    selectedImageElement.src = reader.result;

    selectedImageElement.classList.remove("u-hide");
    removeImageButtonElement.classList.remove("u-hide");
  };

  reader.readAsDataURL(file);
}

export function removeSelectedImage() {
  const imageInputElement = getImageInputElement();
  const selectedImageElement = getImageElement();
  const removeImageButtonElement = getRemoveImageButtonElement();

  selectedImageElement.src = "";
  imageInputElement.value = null;

  selectedImageElement.classList.add("u-hide");
  removeImageButtonElement.classList.add("u-hide");
}

const _resetComposer = () => {
  const textAreaElement = getTextAreaElement();
  textAreaElement.value = "";

  removeSelectedImage();
};

export const composerService = {
  createPost,
  updatePost,
  deletePost,
  onSelectImageButtonClick,
  onImageInputChange,
  removeSelectedImage,
};
