document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = tab?.url ?? '';
    const isOnSite = url.includes('my.epitech.eu');

    const dot = document.querySelector('.status-dot');
    const label = document.querySelector('.status-label');

    const tabButton = document.querySelector('.tab-button');

    if (isOnSite) {
      dot.classList.remove('inactive');
      label.classList.remove('inactive');
      tabButton.classList.add('inactive');
      label.innerHTML = 'Extension <strong>activated</strong> on this tab';
    } else {
      dot.classList.add('inactive');
      label.classList.add('inactive');
      tabButton.classList.remove('inactive');
      label.innerHTML = 'Go on <strong>my.epitech.eu</strong>';
    }
  });

  document.getElementById('open-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.url?.includes('my.epitech.eu')) {
        chrome.tabs.update(tab.id, { active: true });
      } else {
        chrome.tabs.create({ url: 'https://my.epitech.eu/' });
      }
    });
  });

  document.getElementById('github-link').addEventListener('click', (e) => {
    e.preventDefault();
    const url = e.target.href;
    chrome.tabs.create({ url });
  });
});
