import "../base.js";
import * as controller from "./signup.js";

setTimeout(() => {
  document
    .querySelector(".js-submitSignupButton")
    .addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      controller.signup();
    });
}, 0);

window.controller = controller;
