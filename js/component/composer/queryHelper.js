const getTextAreaElement = () => {
  return document.querySelector(".js-composerTextArea");
};

const getImageInputElement = () => {
  return document.querySelector(".js-composerImageInput");
};

const getImageElement = () => {
  return document.querySelector(".js-composerSelectedImage");
};

const getRemoveImageButtonElement = () => {
  const removeImageButtonElement = document.querySelector(
    ".js-composerRemoveSelectedImageButton"
  );

  return removeImageButtonElement;
};

export default {
  getTextAreaElement,
  getImageInputElement,
  getImageElement,
  getRemoveImageButtonElement,
};
