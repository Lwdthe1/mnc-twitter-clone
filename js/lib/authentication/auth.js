import { usersService } from "../users/userService.js";

const ensureAuthedUserOrRedirect = () => {
  const currentUser = usersService.getCurrentUser();

  if (currentUser) {
    return;
  }

  const currentPathParts = window.location.pathname.toLowerCase().split("/");

  // Remove the first part because it's empty
  currentPathParts.shift();

  const isLoginPage = currentPathParts[1] === "login.html";
  const isSignupPage = currentPathParts[1] === "signup.html";

  if (isLoginPage || isSignupPage) {
    return;
  }

  console.log("[Auth] No authenticated user. Logging out.");

  // Run the logout process to ensure all clean up is completed.
  usersService.logoutUser();

  window.location.href = "/page/login.html";
};

setTimeout(() => {
  const bodyElement = document.querySelector("body");

  const loadingOverlayElement = document.createElement("div");
  loadingOverlayElement.style.position = "fixed";
  loadingOverlayElement.style.top = 0;
  loadingOverlayElement.style.left = 0;
  loadingOverlayElement.style.width = "100vw";
  loadingOverlayElement.style.height = "100vh";
  loadingOverlayElement.style.background = "red";

  loadingOverlayElement.setAttribute(
    "data-is-authenticator-loading-overlay",
    "true"
  );
  bodyElement.append(loadingOverlayElement);

  ensureAuthedUserOrRedirect();

  bodyElement.removeChild(loadingOverlayElement);
}, 0);

export {};
