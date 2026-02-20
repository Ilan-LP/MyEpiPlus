(function () {
    const originalXhrOpen = XMLHttpRequest.prototype.open;
    const originalXhrSend = XMLHttpRequest.prototype.send;
    let blocksData = [];

    const TARGET_URL = ["/api/evaluations/validations/me", "/api/evaluations/validations/alerts/me"];

    function handleData(data) {
        const payload = data?.units ?? data?.blocks ?? data;
        if (!Array.isArray(payload) || payload.length === 0) return;
        blocksData.push(...payload);
        tryReplace();
    }

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._interceptUrl = url;
        return originalXhrOpen.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (...args) {
        if (this._interceptUrl && (this._interceptUrl.includes(TARGET_URL[0]) || this._interceptUrl.includes(TARGET_URL[1]))) {
            this.addEventListener("load", () => {
                try {
                    const data = JSON.parse(this.responseText);
                    handleData(data);
                } catch (e) {
                    console.warn("[ext] Erreur parsing JSON XHR:", e);
                }
            });
        }
        return originalXhrSend.apply(this, args);
    };

    const observer = new MutationObserver(() => {
        tryReplace();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    function tryReplace() {
        if (blocksData.length === 0) {
            return;
        }
        const groupElements = document.querySelectorAll(
            ".m_8a5d1357.mantine-Title-root"
        );

        groupElements.forEach((groupElement) => {

            const parent = groupElement.parentElement;
            if (!parent) {
                console.warn("[ext] Aucun parent trouvé pour groupElement:", groupElement);
                return;
            }

            if (parent.dataset.modified) return;

            const text = (groupElement?.textContent || "").trim();
            const matchedBlock = blocksData.find((blockItem) => {
                const t = (blockItem.title ?? blockItem.blockTitle ?? blockItem.name ?? "").trim();
                return t === text;
            });
            if (!matchedBlock) return;

            if (matchedBlock.grade === 'in progress') return;

            const badgeDiv = document.createElement("div");
            badgeDiv.className = "m_347db0ec mantine-Badge-root";
            badgeDiv.style.cssText = `
                    --badge-radius: var(--mantine-radius-xs);
                    --badge-color: var(--mantine-color-black);
                    --badge-bd: calc(0.0625rem * var(--mantine-scale)) solid transparent;
                    `;
            if (matchedBlock.grade === 'A') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-teal-filled);"
            } else if (matchedBlock.grade === 'B') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-blue-filled);"
            } else if (matchedBlock.grade === 'C') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-yellow-filled);"
            } else if (matchedBlock.grade === 'D') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-orange-filled);"
            } else if (matchedBlock.grade === 'E') {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-red-filled);"
            } else {
                badgeDiv.style.cssText += " --badge-bg: var(--mantine-color-gray-filled);"
            }

            const badgeLabel = document.createElement("span");
            badgeLabel.className = "m_5add502a mantine-Badge-label";
            badgeLabel.textContent = "Grade " + matchedBlock.grade;
            badgeDiv.appendChild(badgeLabel);
            parent.appendChild(badgeDiv);

            parent.dataset.modified = "true";
        });
    }
})();
