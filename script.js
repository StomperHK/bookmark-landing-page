const tabsContainerEL = document.querySelector('[data-js="features-section__tabs"]')
const tabsELs = Array.from(tabsContainerEL.querySelectorAll('button'))
const tabsVerticalBarEL = document.querySelector('[data-js="features-section__tabs__vertical-bar"]')
const featuresCarouselEL = document.querySelector('[data-js="features-section__carousel"]')
let tabIndexGlobal = 0

const accordionContainerEL = document.querySelector('[data-js="questions-section__accordion-container"]')
const accordionButtonsELs = Array.from(accordionContainerEL.querySelectorAll('button'))
const accordionParagraphsELs = Array.from(accordionContainerEL.querySelectorAll('p'))

const formEL = document.querySelector('[data-js="stay-up-to-date-section__grid-container"]')
const formInputEL = document.querySelector('[data-js="stay-up-to-date-section__input-wrapper__input"]')
const formInputLabelEL = document.querySelector('[data-js="stay-up-to-date-section__input-wrapper__label"]')
const formInputErrorSvgEL = document.querySelector('[data-js="stay-up-to-date-section__input-wrapper__svg"]')
const formInputErrorMessage = document.querySelector('[data-js="stay-up-to-date-section__input-wrapper__input-error-message"]')


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

  if (accordionButonEL.dataset.expanded === "true") {
    accordionParagraph.style.height = "0px"
    accordionButonEL.dataset.expanded = "false"
    accordionButonEL.ariaExpanded = "false"

    accordionArrowEL.classList.remove('rotate-arrow')
  }

  else {
    const paragraphHeight = accordionParagraph.scrollHeight + 'px'
    
    accordionParagraph.style.height = paragraphHeight
    accordionButonEL.dataset.expanded = "true"
    accordionButonEL.ariaExpanded = "true"

    accordionArrowEL.classList.add('rotate-arrow')
  }
}

function enableErrorMessage(message) {
  formInputErrorMessage.textContent = message
  formInputErrorMessage.classList.add('show-error-message')

  formInputErrorSvgEL.classList.add('show-error-svg')
  
  formInputEL.ariaInvalid = 'true'
  formInputEL.classList.add('apply-error-style-on-element')
}

function disableErrorMessage() {
  formInputErrorMessage.classList.remove('show-error-message')
  
  formInputErrorSvgEL.classList.remove('show-error-svg')

  formInputEL.ariaInvalid = 'false'
  formInputEL.classList.remove('apply-error-style-on-element')
}

function verifyForm(event) {
  event.preventDefault()

  const inputValue = formInputEL.value
  
  if (!inputValue) {
    enableErrorMessage('preencha este campo')
  }
  else if(inputValue.includes(' ') || !(inputValue.includes('@')) || !(inputValue.includes('.'))) {
    enableErrorMessage('oops, digite um e-mail válido')
  }
}

function hideInputLabel() {
  formInputLabelEL.classList.add('hide-label')
}

function verifyInput() {
  const inputValue = formInputEL.value

  if (inputValue) {
    formInputLabelEL.classList.add('hide-label')
  }
  else {
    formInputLabelEL.classList.remove('hide-label')
  }

  disableErrorMessage()
}


tabsELs.forEach((tabEL, tabIndex) => tabEL.addEventListener('click', () => changeCarouselTab(tabIndex)))

accordionButtonsELs.forEach((accordionButonEL, accordionIndex) => accordionButonEL.addEventListener('click', () => toggleAccordion(accordionButonEL, accordionIndex)))

formEL.addEventListener('submit', verifyForm)

formInputEL.addEventListener('focus', hideInputLabel)

formInputEL.addEventListener('input', verifyInput)

window.addEventListener('resize', () => changeCarouselTab(false))
