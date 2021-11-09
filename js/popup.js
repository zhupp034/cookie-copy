let copy = document.getElementById('copy')
let paste = document.getElementById('paste')
let domainInput = document.getElementById('domainInput')
var bg = chrome.extension.getBackgroundPage();

copy.addEventListener('click', () => {
    let domain = domainInput.value
    bg.inputCache = domain
    bg.copyCookies({domain}); // 访问bg的函数
})

paste.addEventListener('click', () => {
    bg.setCookies(); // 访问bg的函数
})

function init() {
    if (bg.inputCache) {
        domainInput.value = bg.inputCache
    }
}

init()
