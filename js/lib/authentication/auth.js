import { navigateToHomePage, navigateToLoginPage } from "../router/router.js";
import { usersService } from "../users/userService.js";

const ensureAuthedUserOrRedirect = () => {
  const currentUser = usersService.getCurrentUser();

  const currentPathParts = window.location.pathname.toLowerCase().split("/");

  // Remove the first part because it's empty
  currentPathParts.shift();

  const isLoginPage = currentPathParts[1] === "login.html";
  const isSignupPage = currentPathParts[1] === "signup.html";

  const isAuthPage = isLoginPage || isSignupPage;
  if (currentUser) {
    if (isAuthPage) {
      navigateToHomePage();
    }

    return;
  }

  if (isAuthPage) {
    return;
  }

  console.log("[Auth] No authenticated user. Logging out.");

  // Run the logout process to ensure all clean up is completed.
  usersService.logoutUser();

  navigateToLoginPage();
};

setTimeout(() => {
  ensureAuthedUserOrRedirect();
}, 0);

export {};
