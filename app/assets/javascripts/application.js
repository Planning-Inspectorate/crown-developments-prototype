window.GOVUKPrototypeKit.documentReady(() => {

  const accordions = document.querySelectorAll(".app-accordion")

  accordions.forEach((accordion) => {

    const parentToggle = accordion.querySelector(".app-accordion__parent-toggle")
    const container = accordion.querySelector(`#${parentToggle.getAttribute("aria-controls")}`)
    const sectionToggles = accordion.querySelectorAll(".app-accordion__section-toggle")

    // Parent toggle (show/hide everything)
    
parentToggle.addEventListener("click", function () {

  const expanded = this.getAttribute("aria-expanded") === "true"

  this.setAttribute("aria-expanded", String(!expanded))

  const text = this.querySelector(".app-accordion__toggle-text")
  text.textContent = expanded ? "Show filters" : "Hide filters"

  container.hidden = expanded

  if (expanded) {
    // reset sections when closing
    sectionToggles.forEach((button) => {

      const content = document.getElementById(
        button.getAttribute("aria-controls")
      )

      button.setAttribute("aria-expanded", "false")
      button.querySelector(".app-accordion__toggle-text").textContent = "Show"
      content.hidden = true

    })
  }

})


    // Section toggles
    sectionToggles.forEach((button) => {

      button.addEventListener("click", function () {

        const expanded = this.getAttribute("aria-expanded") === "true"

        const content = document.getElementById(
          this.getAttribute("aria-controls")
        )

        this.setAttribute("aria-expanded", String(!expanded))

        this.querySelector(".app-accordion__toggle-text").textContent =
          expanded ? "Show" : "Hide"

        content.hidden = expanded

      })

    })

  })

})