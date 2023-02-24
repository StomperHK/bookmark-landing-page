const tabsContainerEL = document.querySelector('[data-js="features-section__tabs"]')
const tabsELs = Array.from(tabsContainerEL.querySelectorAll('button'))
const tabsVerticalBarEL = document.querySelector('[data-js="features-section__tabs__vertical-bar"]')
const featuresCarouselEL = document.querySelector('[data-js="features-section__carousel"]')
let tabIndexGlobal = 0

const accordionContainerEL = document.querySelector('[data-js="questions-section__accordion-container"]')
const accordionButtonsELs = Array.from(accordionContainerEL.querySelectorAll('button'))
const accordionParagraphsELs = Array.from(accordionContainerEL.querySelectorAll('p'))


function highlightSelectedTab() {
  const highlightedTab = tabsELs[tabIndexGlobal]

  tabsELs.forEach(tabEL => {
    tabEL.classList.remove('features-section__tabs__tab--active')
    tabEL.ariaSelected = "false"
  })

  highlightedTab.classList.add('features-section__tabs__tab--active')
  highlightedTab.ariaSelected = "true"
}

function changeCarouselTab(tabIndex) {
  const verticalTabWidth = tabsVerticalBarEL.clientWidth
  const featuresCarouselWidth = featuresCarouselEL.clientWidth

  if (tabIndex !== false) {   // checks if it's being given a tabIndex value
    tabIndexGlobal = tabIndex
  }

  tabsVerticalBarEL.style.transform = `translateX(${verticalTabWidth * tabIndexGlobal}px)`

  featuresCarouselEL.style.transform = `translateX(-${featuresCarouselWidth * tabIndexGlobal}px)`

  highlightSelectedTab()
}

function toggleAccordion(accordionButonEL, accordionIndex) {
  const accordionParagraph = accordionParagraphsELs[accordionIndex]
  const accordionArrowEL = accordionButonEL.querySelector('svg')

  if (accordionParagraph.dataset.expanded === "true") {
    accordionParagraph.style.height = "0px"
    accordionParagraph.dataset.expanded = "false"
    accordionParagraph.ariaExpanded = "false"

    accordionArrowEL.classList.remove('rotate-arrow')
  }
  else {
    const paragraphHeight = accordionParagraph.scrollHeight + 'px'
    
    accordionParagraph.style.height = paragraphHeight
    accordionParagraph.dataset.expanded = "true"
    accordionParagraph.ariaExpanded = "true"

    accordionArrowEL.classList.add('rotate-arrow')
  }
}


tabsELs.forEach((tabEL, tabIndex) => tabEL.addEventListener('click', () => changeCarouselTab(tabIndex)))

accordionButtonsELs.forEach((accordionButonEL, accordionIndex) => accordionButonEL.addEventListener('click', () => toggleAccordion(accordionButonEL, accordionIndex)))

window.addEventListener('resize', () => changeCarouselTab(false))
