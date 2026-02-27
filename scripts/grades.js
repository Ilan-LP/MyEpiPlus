(function () {
    const BASE_URL = "https://my.epitech.eu";

    const SEMESTER_URL = "/api/auth/verify";

    const TARGET_URL = ["/api/evaluations/validations/me", "/api/evaluations/validations/alerts/me"];

    let blocksData = [];

    function waitForToken() {
        return new Promise((resolve) => {
            let lastToken = null;

            const interval = setInterval(async () => {
                const account = JSON.parse(localStorage.getItem("@account") || "{}");
                const token = account.token;

                if (!token || token === lastToken) return;
                lastToken = token;

                try {
                    const res = await fetch(BASE_URL + SEMESTER_URL, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    });

                    if (res.status === 401 || res.status === 403) {
                        lastToken = null;
                        return;
                    }

                    if (!res.ok) {
                        console.warn("[MEP] Error while fetching token", res.status);
                        return;
                    }

                    const data = await res.json();
                    clearInterval(interval);
                    resolve({ token, semester: data.semester });
                } catch (err) {
                    console.warn("[MEP] Network error while fetching token:", err);
                }
            }, 500);
        });
    }

    async function createDico({ token, semester }) {
        const dico = {};

        const grades_dico = {};
        for (const url of TARGET_URL) {
            for (let sem = 1; sem <= semester; sem++) {
                const res = await fetch(BASE_URL + url + "?semester=" + sem, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!res.ok) {
                    console.warn("[MEP] Error while fetching grades from " + url + " for semester " + sem, res.status);
                    continue;
                }
                const json = await res.json();
                let blockName = "";
                if ('units' in json) {
                    blockName = "units"
                } else if ('blocks' in json) {
                    blockName = "blocks"
                } else {
                    console.warn("[MEP] Unexpected response structure from " + url + " for semester " + sem, json);
                    continue;
                }
                for (const block of json[blockName]) {  
                    const title = block.title || block.blockTitle || block.name || "" ;
                    const titleFr = block.titleFr || block.blockTitleFr || "";
                    if (!title) {
                        console.warn("[MEP] No title found for block:", block);
                        continue;
                    }
                    if (!block.grade) {
                        console.warn("[MEP] No grade found for block:", block);
                        continue;
                    }
                    if (block.grade !== 'A' && block.grade !== 'B' && block.grade !== 'C' && block.grade !== 'D' && block.grade !== 'E' && block.grade !== 'Fail') {
                        continue;
                    }
                    if (block.grade === 'Fail') {
                        block.grade = 'E';
                    }
                    grades_dico[title.trim()] = block.grade;
                    grades_dico[titleFr.trim()] = block.grade;
                }
            }
        }
        return grades_dico;
    }

    waitForToken().then(async (tokenData) => {
        const dico = await createDico(tokenData);
        blocksData = dico
        tryReplace();
    });

    const observer = new MutationObserver(() => {
        tryReplace();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    function tryReplace() {
        if (Object.keys(blocksData).length === 0) {
            return;
        }
        const groupElements = document.querySelectorAll(
            ".m_8a5d1357.mantine-Title-root"
        );

        groupElements.forEach((groupElement) => {

            const parent = groupElement.parentElement;
            if (!parent) {
                console.warn("[MEP] No parent found for groupElement:", groupElement);
                return;
            }

            if (parent.dataset.modified) return;

            const text = (groupElement?.textContent || "").trim();
            if (!text) {
                console.warn("[MEP] No text content found for groupElement:", groupElement);
                return;
            }
            if (!blocksData[text]) {
                return;
            }
            const grade = blocksData[text];

            const badgeDiv = document.createElement("div");
            badgeDiv.className = "m_347db0ec mantine-Badge-root";
            badgeDiv.style.cssText = `
                    --badge-radius: var(--mantine-radius-xs);
                    --badge-color: var(--mantine-color-black);
                    --badge-bd: calc(0.0625rem * var(--mantine-scale)) solid transparent;
                    `;
            if (grade === 'A') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-teal-filled);"
            } else if (grade === 'B') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-blue-filled);"
            } else if (grade === 'C') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-yellow-filled);"
            } else if (grade === 'D') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-orange-filled);"
            } else if (grade === 'E') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-red-filled);"
            } else {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-gray-filled);"
            }

            const badgeLabel = document.createElement("span");
            badgeLabel.className = "m_5add502a mantine-Badge-label";
            badgeLabel.textContent = "Grade " + grade;
            badgeDiv.appendChild(badgeLabel);
            parent.appendChild(badgeDiv);

            parent.dataset.modified = "true";
        });
    }
})();
