import { composerService } from "../../component/composer/composerService.js";
import { postsService } from "../../component/posts/postsService.js";

export { composerService };

setTimeout(() => {
  postsService.loadMainPostsFeed();
}, 0);
