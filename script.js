const tabsContainerEL = document.querySelector('[data-js="features-section__tabs"]')
const tabsELs = Array.from(tabsContainerEL.querySelectorAll('button'))
const tabsVerticalBarEL = document.querySelector('[data-js="features-section__tabs__vertical-bar"]')
const featuresCarouselEL = document.querySelector('[data-js="features-section__carousel"]')
let tabIndexGlobal = 0


function highlightSelectedTab() {
  tabsELs.forEach(tabEL => tabEL.classList.remove('features-section__tabs__tab--active'))

  tabsELs[tabIndexGlobal].classList.add('features-section__tabs__tab--active')
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




tabsELs.forEach((tabEL, tabIndex) => tabEL.addEventListener('click', () => changeCarouselTab(tabIndex)))

window.addEventListener('resize', () => changeCarouselTab(false))
