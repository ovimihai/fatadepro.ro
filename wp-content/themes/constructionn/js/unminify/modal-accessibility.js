window.addEventListener('load', function () {
  let mediEvent = {};
  let focusableElements = null
  let lastElement = null;
  let firstElement = null;
  let isFocusInsideSidebar = false;

  const sidebar = document.querySelector('#mobileSideMenu');
  const hamBarEl = document.querySelector('#sideMenuOpener')

  document.addEventListener('keydown', function (e) {
    mediEvent = e;

    if (document.activeElement === hamBarEl && e.key.toLowerCase() === "enter") {
      setTimeout(() => {
        mobileSideMenuClose.focus()
      }, 0)
    }

    if (mediEvent.key === "Tab" && !mediEvent.shiftKey && !isFocusInsideSidebar) {
      focusableElements = document.querySelectorAll('a, button');
      lastElement = focusableElements[focusableElements.length - 1];
      firstElement = focusableElements[0];


      if (document.activeElement === lastElement && !e.shiftKey) {
        e.preventDefault();
        console.log('lastElement')
        console.log(firstElement)
        setTimeout(() => {
          firstElement.focus();
        }, 0);
      }
    }

    if (mediEvent.shiftKey) {
      focusableElements = document.querySelectorAll('a, button');
      lastElement = focusableElements[focusableElements.length - 1];
      firstElement = focusableElements[0];
      if (document.activeElement === firstElement && mediEvent.shiftKey && !isFocusInsideSidebar) {
        e.preventDefault()
        setTimeout(() => {
          lastElement.focus();
        }, 0);
      }
    }


    if (isFocusInsideSidebar) {
      focusableElements = sidebar.querySelectorAll('a, button');
      lastElement = focusableElements[focusableElements.length - 1];
      firstElement = focusableElements[0];
      if (document.activeElement === lastElement && !e.shiftKey) {
        e.preventDefault();
        setTimeout(() => {
          firstElement.focus();
        }, 0);
      }
      if (document.activeElement === firstElement && e.shiftKey) {
        e.preventDefault()
        setTimeout(() => {
          lastElement.focus();
        }, 0);
      }
      if (document.activeElement === mobileSideMenuClose && e.key.toLowerCase() === "enter") {
        setTimeout(() => {
          hamBarEl.focus()
        }, 0)
      }
    }

  });

  sidebar.addEventListener('focusin', function (event) {
    focusableElements = sidebar.querySelectorAll('a, button');
    lastElement = focusableElements[focusableElements.length - 1];
    firstElement = focusableElements[0];
    isFocusInsideSidebar = true;
    updateSidebarTabbing(true);
  });

  sidebar.addEventListener('focusout', function (event) {
    isFocusInsideSidebar = false;
    updateSidebarTabbing(false);
  });

  // accessibility submenu - desktop
  let allowTrigger = true;
  const hasChilds = document.querySelectorAll('.main-navigation > .menu-container > #menu-primary > .menu-item-has-children')
  hasChilds.forEach((hasChild) => {
    const allSubMenu = hasChild.querySelectorAll('.sub-menu');
    const allLinks = hasChild.querySelectorAll('a');
    const lastLink = allLinks[allLinks.length - 1];
    hasChild.addEventListener('focusin', function (e) {
      if (mediEvent.shiftKey && mediEvent.key === "Tab" && allowTrigger) {
        allowTrigger = false
        allSubMenu.forEach((submenu) => {
          submenu.style.visibility = 'visible';
          submenu.style.opacity = 1;
        });
        setTimeout(() => {
          lastLink.focus();
          lastLink.classList.add('focus');
        }, 100);
      }
    })
    hasChild.addEventListener('focusout', function (e) {
      allSubMenu.forEach((submenu) => {
        submenu.style.visibility = 'hidden';
        submenu.style.opacity = 0;
      })
    })
    hasChild.addEventListener('keydown', function (event) {
      if (event.key === "Tab" && event.shiftKey && !allowTrigger) {
        const focusableEls = hasChild.querySelectorAll('a')
        const activeElement = document.activeElement;
        if (hasChild.contains(activeElement)) {
          if (focusableEls[0] === activeElement) {
            allowTrigger = true
          }
        }
      }
    });
  })

  function updateSidebarTabbing(isActive) {
    sidebar.querySelectorAll('a, button, [tabindex]').forEach(el => {
      if (isActive) {
        // Restore focusability
        el.removeAttribute('tabindex');
      } else {
        // Prevent tabbing into sidebar
        if (el.getAttribute('tabindex') !== '-1') {
          el.setAttribute('tabindex', '-1');
        }
      }
    });
  }
  // update tabbing when sidebar is opened or closed via focusin/focusout
  if (sidebar.classList.contains('active')) {
    updateSidebarTabbing(true);
  } else {
    updateSidebarTabbing(false);
  }
  // update tabbing when sidebar is opened or closed via click
  hamBarEl.addEventListener('click', function (e) {
    const isSidebarActive = sidebar.classList.contains('active');
    updateSidebarTabbing(isSidebarActive);
  });

  mobileSideMenuClose.addEventListener('click', function (e) {
    updateSidebarTabbing(false);
  });
})