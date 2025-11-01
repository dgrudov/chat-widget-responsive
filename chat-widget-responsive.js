(function () {
  const IFRAME_SRC = "https://support-bot-ai-83659ec1.base44.app/EmbedChatWidget";
  const BUTTON_SIZE = 64;
  const BUTTON_BOTTOM = 24;
  const BUTTON_RIGHT = 24;
  const MOBILE_MAX = 600;

  const btn = document.createElement("button");
  btn.setAttribute("aria-label", "Open chat");
  Object.assign(btn.style, {
    position: "fixed",
    bottom: BUTTON_BOTTOM + "px",
    right: BUTTON_RIGHT + "px",
    width: BUTTON_SIZE + "px",
    height: BUTTON_SIZE + "px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#3B82F6,#6366F1)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(59,130,246,0.4)",
    transition: "transform .25s, box-shadow .25s"
  });
  btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';

  const iframe = document.createElement("iframe");
  iframe.setAttribute("allow", "microphone; camera; clipboard-write; fullscreen; autoplay;");
  iframe.setAttribute("title", "Support chat");
  Object.assign(iframe.style, {
    position: "fixed",
    border: "none",
    zIndex: 9999,
    display: "none",
    background: "transparent"
  });

  const mobileCloseBtn = document.createElement("button");
  mobileCloseBtn.innerHTML = "✕";
  Object.assign(mobileCloseBtn.style, {
    position: "fixed",
    top: "12px",
    right: "12px",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    fontSize: "18px",
    cursor: "pointer",
    zIndex: 10001,
    display: "none"
  });

  let isOpen = false;
  let loaded = false;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function applyResponsiveStyles() {
    if (isMobile()) {
      btn.style.display = isOpen ? "none" : "flex";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.borderRadius = "0";
      mobileCloseBtn.style.display = isOpen ? "block" : "none";
    } else {
      btn.style.display = "flex";
      iframe.style.width = "400px";
      iframe.style.height = "600px";
      iframe.style.bottom = (BUTTON_BOTTOM + BUTTON_SIZE + 12) + "px";
      iframe.style.right = BUTTON_RIGHT + "px";
      iframe.style.top = "auto";
      iframe.style.left = "auto";
      iframe.style.borderRadius = "16px";
      mobileCloseBtn.style.display = "none";
    }

    iframe.style.display = isOpen ? "block" : "none";
  }

  function openFrame() {
    if (!loaded) {
      iframe.src = IFRAME_SRC;
      loaded = true;
    }
    isOpen = true;
    btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    applyResponsiveStyles();
  }

  function closeFrame() {
    isOpen = false;
    btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';
    applyResponsiveStyles();
  }

  btn.addEventListener("click", () => (isOpen ? closeFrame() : openFrame()));
  mobileCloseBtn.addEventListener("click", closeFrame);

  btn.addEventListener("mouseenter", () => (btn.style.transform = "scale(1.08)"));
  btn.addEventListener("mouseleave", () => (btn.style.transform = "scale(1)"));
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      isOpen ? closeFrame() : openFrame();
    }
  });

  window.addEventListener("resize", applyResponsiveStyles);

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(btn);
    document.body.appendChild(iframe);
    document.body.appendChild(mobileCloseBtn);
    applyResponsiveStyles();
  });
})();
