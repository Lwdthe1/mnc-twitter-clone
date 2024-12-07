import { PostAttachmentType } from "../composer/constants.js";

export const createNewPostElement = (post) => {
  const { id, text, attachments, createdAt } = post;
  const newPostElement = document.createElement("div");
  newPostElement.setAttribute("data-post-id", id);
  newPostElement.classList.add("post-card");

  const buttons = [
    {
      content: `<i class="fa fa-heart-o"></i>`,
      onClick: `controller.postCardService.toggleLike('${id}')`,
    },
    {
      content: `<i class="fa fa-comment-o"></i>`,
      onClick: `controller.postCardService.showCommentComposer('${id}')`,
    },
  ];

  newPostElement.innerHTML = `
    <div>${text}</div>
    <div>
        ${attachments.map((attachment) => {
          if (attachment.type === PostAttachmentType.Image && attachment.url) {
            return `<img class="post-card__image" src="${attachment.url}"/>`;
          }
        })}
    </div>
    <div class="u-flexCenteredItemsY u-gap15">
      ${buttons
        .map(({ content, onClick }) => {
          return `<button onclick="${onClick}">${content}</button>`;
        })
        .join("")}
    </div>
  `;

  return newPostElement;
};
