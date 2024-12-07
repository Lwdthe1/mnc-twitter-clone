export const navigateToHomePage = () => {
  _navigateToPage("/index.html");
};

export const navigateToProfilePage = ({ username }) => {
  _navigateToPage(`/profile.html?username=${username}`);
};

export const navigateToSettingsPage = () => {
  _navigateToPage("/page/settings.html");
};

export const navigateToSignupPage = () => {
  _navigateToPage("/signup.html");
};

export const navigateToLoginPage = () => {
  _navigateToPage("/page/login.html");
};

const _navigateToPage = (pagePath) => {
  const formatters = [
    (path) => {
      return path.startsWith("/page/") ? path.replace("/page/", "") : path;
    },
    (path) => {
      return path.startsWith("/") ? path.replace("/", "") : path;
    },
  ];

  const normalizedPath = formatters.reduce((path, formatPath) => {
    return formatPath(path);
  }, pagePath);

  window.location.href = `/page/${normalizedPath}`;
};
