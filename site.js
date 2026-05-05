(function () {
  function setFooterYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function clearHighlight() {
    document.querySelectorAll(".highlight-reading").forEach((span) => {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    });
  }

  function cancelReading() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    clearHighlight();
  }

  function initSectionTabs() {
    const tabButtons = Array.from(
      document.querySelectorAll(".tab-btn[data-target]")
    );
    const sections = Array.from(document.querySelectorAll(".section-block"));
    const sectionLinks = Array.from(document.querySelectorAll(".js-section-link"));

    if (!sections.length || (!tabButtons.length && !sectionLinks.length)) return;

    function activateSection(targetId) {
      sections.forEach((section) => {
        section.classList.toggle("active", section.id === targetId);
      });

      tabButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.target === targetId);
      });

      cancelReading();
    }

    function scrollToTop() {
      const mainTop = document.getElementById("top");
      if (mainTop) mainTop.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activateSection(button.dataset.target);
      });
    });

    sectionLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        activateSection(link.dataset.target);
        scrollToTop();
      });
    });
  }

  function activatePackageTab(details, targetId) {
    const tabButtons = details.querySelectorAll(".tab-btn[data-tab]");
    const panels = details.querySelectorAll(".tab-panel");

    tabButtons.forEach((button) => button.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    const button = Array.from(tabButtons).find(
      (item) => item.dataset.tab === targetId
    );
    const target = details.querySelector("#" + targetId);

    if (button) button.classList.add("active");
    if (target) target.classList.add("active");
  }

  function initPackageTabs() {
    const detailsItems = Array.from(document.querySelectorAll(".object-details"));
    if (!detailsItems.length) return;

    detailsItems.forEach((details) => {
      details.querySelectorAll(".tab-btn[data-tab]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          activatePackageTab(details, button.dataset.tab);
        });
      });

      details.querySelectorAll("[data-toggle-target]").forEach((button) => {
        const targetId = button.getAttribute("data-toggle-target");
        const target = details.querySelector("#" + targetId);
        if (!target) return;

        button.addEventListener("click", () => {
          const isHidden = target.hasAttribute("hidden");
          if (isHidden) {
            target.removeAttribute("hidden");
            button.textContent = "Verberg de volledige tabel";
          } else {
            target.setAttribute("hidden", "");
            button.textContent = "Toon toch de volledige tabel";
          }
        });
      });
    });

    const params = new URLSearchParams(window.location.search);
    const objectToOpen = (params.get("open") || "").trim();
    const packageToOpen = (
      params.get("pakket") ||
      params.get("amp;pakket") ||
      ""
    )
      .trim()
      .replace(/\D/g, "")
      .charAt(0);

    if (!objectToOpen || !["1", "2", "3"].includes(packageToOpen)) return;

    const details = detailsItems.find(
      (item) => item.dataset.object === objectToOpen
    );
    if (!details) return;

    details.open = true;

    const tabButton = Array.from(details.querySelectorAll(".tab-btn[data-tab]")).find(
      (button) => button.dataset.tab.endsWith("-p" + packageToOpen)
    );

    if (tabButton) activatePackageTab(details, tabButton.dataset.tab);
    details.scrollIntoView({ block: "start" });
  }

  function initReadAloud() {
    const playBtn = document.getElementById("playBtn");
    const stopBtn = document.getElementById("stopBtn");
    if (
      !playBtn ||
      !stopBtn ||
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      return;
    }

    let nodes = [];
    let index = 0;

    function getNodes() {
      const container = document.querySelector("main");
      if (!container) return [];

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.parentElement) return NodeFilter.FILTER_REJECT;

          const tag = node.parentElement.tagName.toLowerCase();
          if (["button", "iframe", "script", "style"].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }

          const section = node.parentElement.closest(".section-block");
          if (section && !section.classList.contains("active")) {
            return NodeFilter.FILTER_REJECT;
          }

          if (node.parentElement.closest("[hidden], [aria-hidden='true']")) {
            return NodeFilter.FILTER_REJECT;
          }

          if (node.textContent.trim().length < 2) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const list = [];
      let node;
      while ((node = walker.nextNode())) list.push(node);
      return list;
    }

    function highlight(node) {
      clearHighlight();
      const span = document.createElement("span");
      span.className = "highlight-reading";
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);
    }

    function speakNext() {
      if (index >= nodes.length) return;

      const text = nodes[index].textContent.trim();
      highlight(nodes[index]);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "nl-NL";
      utterance.onend = () => {
        index++;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    }

    playBtn.addEventListener("click", () => {
      cancelReading();
      nodes = getNodes();
      index = 0;
      speakNext();
    });

    stopBtn.addEventListener("click", cancelReading);
  }

  setFooterYear();
  initSectionTabs();
  initPackageTabs();
  initReadAloud();
})();
