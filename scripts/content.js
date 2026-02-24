let asciiArt = "  __  __      ___      _ ___ _         " + "\n"
asciiArt += " |  \\/  |_  _| __|_ __(_) _ \\ |_  _ ___" + "\n"
asciiArt += " | |\\/| | || | _|| '_ \\ |  _/ | || (_-<" + "\n"
asciiArt += " |_|  |_|\\_, |___| .__/_|_| |_|\\_,_/__/" + "\n"
asciiArt += "         |__/    |_|                     "

console.log(asciiArt)

const script = document.createElement("script")
script.src = chrome.runtime.getURL("scripts/grades.js")
script.onload = () => script.remove()
document.documentElement.appendChild(script)