import { PostAttachmentType } from "../composer/constants.js";

export const createNewPostElement = (post) => {
  const { id, text, attachments, createdAt } = post;
  const newPostElement = document.createElement("div");
  newPostElement.setAttribute("data-post-id", id);
  newPostElement.classList.add("post-card");

  newPostElement.innerHTML = `
        <div>${text}</div>
        <div>
            ${attachments.map((attachment) => {
              if (
                attachment.type === PostAttachmentType.Image &&
                attachment.url
              ) {
                return `<img class="post-card__image" src="${attachment.url}"/>`;
              }
            })}
        </div>
        <div>
        ${createdAt}
        </div>
    `;

  return newPostElement;
};
