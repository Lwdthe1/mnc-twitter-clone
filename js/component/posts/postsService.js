import { createNewPostElement } from "./postHtmlFactory.js";
import { postsStorageService } from "../../lib/storage/service/postsStorageService.js";

const loadMainPostsFeed = () => {
  const allPosts = postsStorageService.getAllPosts();
  const sortedPosts = allPosts.sort((postA, postB) => {
    return new Date(postB.createdAt) - new Date(postA.createdAt);
  });

  const mainPostsFeedElement = _getMainPostsFeedElement();
  sortedPosts.forEach((post) => {
    const { id } = post;
    const oldPostElement = mainPostsFeedElement.querySelector(
      `[data-post-id="${id}"]`
    );

    const newPostElement = createNewPostElement(post);

    if (oldPostElement) {
      mainPostsFeedElement.replaceChild(newPostElement, oldPostElement);
      return;
    }

    mainPostsFeedElement.appendChild(newPostElement);
  });
};

const prependPostToMainFeed = (post) => {
  const mainPostsFeedElement = _getMainPostsFeedElement();
  const newPostElement = createNewPostElement(post);
  mainPostsFeedElement.prepend(newPostElement);
};

const _getMainPostsFeedElement = () => {
  const mainPostsFeedElement = document.querySelector(".js-mainPostsFeed");
  return mainPostsFeedElement;
};

export const postsService = { prependPostToMainFeed, loadMainPostsFeed };
