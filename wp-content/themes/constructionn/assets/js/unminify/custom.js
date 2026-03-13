window?.addEventListener('DOMContentLoaded', () => {

    // notification bar
    const notifBar = document.querySelector('.notification-wrap');
    const notifyCloseBtn = notifBar?.querySelector('#notify-close');

    notifyCloseBtn?.addEventListener('click', () => {
        notifBar.style.position = 'absolute'
        notifBar.style.left = '0'
        notifBar.style.right = '0'
        notifBar.classList.add('hide');
    })

    // side bar
    const hamBarDesktop = document.querySelector('#desktopSideMenuOpener');
    const sideMenuOverlay = document.querySelector('#sideMenuOverlay');
    const desktopSideMenuEl = document.querySelector('#desktopSideMenu')
    const desktopSideMenuClose = document.querySelector('#desktopSideMenuClose')

    hamBarDesktop?.addEventListener('click', () => {
        hamBarDesktop?.classList.add('active')
        sideMenuOverlay.style.display = 'block'
        desktopSideMenuEl.classList.add('active')
    })

    sideMenuOverlay?.addEventListener('click', () => {
        sideMenuOverlay.style.display = 'none'
        hamBarDesktop?.classList.remove('active')
        desktopSideMenuEl?.classList.remove('active')
    })
    desktopSideMenuClose?.addEventListener('click', () => {
        sideMenuOverlay.style.display = 'none'
        hamBarDesktop?.classList.remove('active')
        desktopSideMenuEl?.classList.remove('active')
    })


    // side bar
    const hamBarEl = document.querySelector('#sideMenuOpener');
    const mobileSideMenuEl = document.querySelector('#mobileSideMenu');
    const mobileSideMenuClose = document.querySelector('#mobileSideMenuClose');
    hamBarEl?.addEventListener('click', () => {
        hamBarEl.classList.add('active')
        sideMenuOverlay.style.display = 'block'
        mobileSideMenuEl.classList.add('active')
    })

    sideMenuOverlay?.addEventListener('click', () => {
        sideMenuOverlay.style.display = 'none'
        hamBarEl?.classList.remove('active')
        mobileSideMenuEl?.classList.remove('active')
    })
    mobileSideMenuClose?.addEventListener('click', () => {
        sideMenuOverlay.style.display = 'none'
        hamBarEl?.classList.remove('active')
        mobileSideMenuEl?.classList.remove('active')
    })

    //Mobile Side Menu
    const mobileMenus = document.querySelectorAll('#mobileSideMenu .menu');

    mobileMenus?.forEach((mobileMenu) => {
        if (mobileMenu) {
            const menuItems = mobileMenu.querySelectorAll('.menu-item.menu-item-has-children');

            menuItems.forEach((item) => {
                const subMenu = item.querySelector('.sub-menu');
                if (subMenu) {
                    const button = document.createElement('button');
                    button.classList.add('angle-down');
                    button.textContent = 'Angle down';
                    item.insertBefore(button, subMenu);
                    //   item.appendChild(button);
                }
            });
        }
    })

    const submenuOpener = document.querySelectorAll('.angle-down');
    const handleOpeningSubmenu = (opener) => {
        let totalHeight = 0; // Initialize totalHeight to 0
        const submenu = opener.nextElementSibling;
        totalHeight = submenu.scrollHeight
        const innerSubMenu = submenu.querySelectorAll('ul');
        innerSubMenu.forEach(menu => {
            totalHeight += menu.scrollHeight;
        })
        if (submenu.style.visibility === "visible") {
            submenu.style.visibility = "hidden";
            submenu.style.maxHeight = "0";
        } else {
            submenu.style.visibility = "visible";
            submenu.style.maxHeight = totalHeight + "px";
        }
        opener.classList.toggle('active')
        totalHeight = 0;
    }
    submenuOpener.forEach(opener => {
        opener?.addEventListener('click', () => handleOpeningSubmenu(opener));
    });


    // dynamic menu dropdown
    const subMenus = document.querySelectorAll('.desktop-header .menu .sub-menu');

    subMenus.forEach(function (menu) {
        const rect = menu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            if (menu.parentElement.parentElement.classList.contains('menu')) {
                menu.style.left = 'auto';
                menu.style.right = '0';
            } else {
                menu.style.left = 'auto';
                menu.style.right = '100%';
            }
        }
    });

    const label = document.getElementById('wp-block-email__label')
    const inputField = document.getElementById('wp-block-email__field')

    inputField?.addEventListener('click', () => {
        label?.classList.add('active')
    })
    inputField?.addEventListener('change', () => {
        if (inputField.value.length <= 0) {
            label?.classList.remove('active')
        }
    })


    // Define the Intersection Observer options
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.5, // Trigger when at least 50% of the target is visible
    };

    // Scroll To Top
    const scrollTopEl = document.querySelector('#scroll__top');

    function toggleScrollTopEl() {
        var bottomThreshold = 100; // Adjust the threshold as needed

        // Calculate the scroll position and the document height
        var scrollPosition = window.scrollY;
        var documentHeight = document.body.scrollHeight - window.innerHeight;

        if (scrollPosition >= documentHeight - bottomThreshold) {
            scrollTopEl?.classList.add('active')
        } else {
            scrollTopEl?.classList.remove('active')
        }
    }
    window?.addEventListener('scroll', toggleScrollTopEl);
    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    scrollTopEl?.addEventListener('click', (e) => {
        e.preventDefault()
        goToTop()
    })
})