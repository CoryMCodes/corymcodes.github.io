import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.applyStoredTheme()
  }

  toggle() {
    document.documentElement.classList.toggle("dark")
    localStorage.setItem(
      "corymcodes-theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    )
  }

  applyStoredTheme() {
    const storedTheme = localStorage.getItem("corymcodes-theme")

    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }
}
