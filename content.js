// content.js — exact mirror of the working script.js
(function () {
  function waitForElement() {
    var yourDIV = document.getElementsByClassName("TK")[0];
    var baseUrl = window.location.origin + window.location.pathname;
    var newUrl = baseUrl + "#search/is%3Aunread";
    var htmlLang = document.documentElement.lang;

    var active = (window.location.hash == "#search/is%3Aunread");
    var mainDivClassName  = active ? "aim ain" : "aim";
    var innerDiv1ClassName = active ? "TO aS3 nZ aiq" : "TO aS3";

    var unread_string =
      htmlLang == "uk" ? "Непрочитані" :
      htmlLang == "ru" ? "Непрочитаные" : "Unread";

    if (yourDIV) {
      // --- Build row exactly like the working script ---
      var mainDiv = document.createElement("div");
      mainDiv.className = mainDivClassName;
      mainDiv.id = "BVid1";

      var innerDiv1 = document.createElement("div");
      innerDiv1.id = "BVid2";
      innerDiv1.setAttribute("data-tooltip", "Unread");
      innerDiv1.setAttribute("data-tooltip-align", "r");
      innerDiv1.className = innerDiv1ClassName;

      var innerDiv2 = document.createElement("div");
      innerDiv2.className = "TN UKr6le";

      var innerDiv3 = document.createElement("div");
      innerDiv3.className = "qj";

      var innerDiv4 = document.createElement("div");
      innerDiv4.className = "aio UKr6le";

      var spanElement = document.createElement("span");
      spanElement.className = "nU";

      var anchorElement = document.createElement("a");
      anchorElement.className = "J-Ke n0";
      anchorElement.href = newUrl;
      anchorElement.target = "_top";
      anchorElement.setAttribute("aria-label", "Unread");
      anchorElement.setAttribute("tabindex", "-1");
      anchorElement.setAttribute("draggable", "false");
      anchorElement.textContent = unread_string;

      mainDiv.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = anchorElement.href;
      });

      spanElement.appendChild(anchorElement);

      var fifthInnerDiv = document.createElement("div");
      fifthInnerDiv.className = "nL aif"; // count container (empty, like script.js)

      // NOTE: Yes, the original script appends innerDiv3 twice; we mirror it exactly
      innerDiv4.appendChild(innerDiv3);
      innerDiv4.appendChild(spanElement);
      innerDiv2.appendChild(innerDiv3);
      innerDiv2.appendChild(innerDiv4);
      innerDiv2.appendChild(fifthInnerDiv);
      innerDiv1.appendChild(innerDiv2);
      mainDiv.appendChild(innerDiv1);

      // Insert as the second item (between Inbox and Starred on default layout)
      yourDIV.insertBefore(mainDiv, yourDIV.firstChild ? yourDIV.firstChild.nextSibling : null);
    } else {
      setTimeout(waitForElement, 1000);
    }
  }

  function handleHashChange() {
    var element1 = document.getElementById("BVid2");
    var element2 = document.getElementById("BVid1");
    var active = (window.location.hash == "#search/is%3Aunread");
    if (element1 && element2) {
      element2.className = active ? "aim ain" : "aim";
      element1.className = active ? "TO aS3 nZ aiq" : "TO aS3";
    }
  }

  window.onload = function () { waitForElement(); };
  window.addEventListener("hashchange", handleHashChange);
})();