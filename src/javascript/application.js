import "@hotwired/turbo"
import { Application } from "@hotwired/stimulus"

import NavController from "./controllers/nav_controller.js"
import PostFilterController from "./controllers/post_filter_controller.js"
import ThemeController from "./controllers/theme_controller.js"

window.Stimulus = Application.start()
window.Stimulus.register("nav", NavController)
window.Stimulus.register("post-filter", PostFilterController)
window.Stimulus.register("theme", ThemeController)
