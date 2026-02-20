const script = document.createElement("script")
script.src = chrome.runtime.getURL("scripts/inject.js")
script.onload = () => script.remove()
document.documentElement.appendChild(script)