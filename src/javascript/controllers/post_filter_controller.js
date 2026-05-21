import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "post", "empty"]

  connect() {
    const params = new URLSearchParams(window.location.search)
    const requestedTag = params.get("tag") || "all"
    this.activeTag = this.hasButtonForTag(requestedTag) ? requestedTag : "all"
    this.applyFilter()
  }

  filter(event) {
    this.activeTag = event.params.tag || "all"
    this.applyFilter()
    this.updateUrl()
  }

  applyFilter() {
    let visibleCount = 0

    this.postTargets.forEach((post) => {
      const tags = post.dataset.postTags.split(" ")
      const visible = this.activeTag === "all" || tags.includes(this.activeTag)

      post.classList.toggle("hidden", !visible)
      visibleCount += visible ? 1 : 0
    })

    this.buttonTargets.forEach((button) => {
      const active = button.dataset.postFilterTagParam === this.activeTag

      button.classList.toggle("filter-button-active", active)
      button.classList.toggle("filter-button-inactive", !active)
      button.setAttribute("aria-pressed", active ? "true" : "false")
    })

    if (this.hasEmptyTarget) {
      this.emptyTarget.classList.toggle("hidden", visibleCount > 0)
    }
  }

  updateUrl() {
    const url = new URL(window.location)

    if (this.activeTag === "all") {
      url.searchParams.delete("tag")
    } else {
      url.searchParams.set("tag", this.activeTag)
    }

    window.history.replaceState({}, "", url)
  }

  hasButtonForTag(tag) {
    return this.buttonTargets.some((button) => button.dataset.postFilterTagParam === tag)
  }
}
