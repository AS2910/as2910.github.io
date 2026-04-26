(function () {
    'use strict';

    var header = document.querySelector('.site-header');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    var sections = [];

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el && id !== 'top') sections.push({ id: id, el: el, link: link });
    });

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (header) header.classList.toggle('is-scrolled', y > 4);

        var current = null;
        var threshold = 120;
        for (var i = 0; i < sections.length; i++) {
            var top = sections[i].el.getBoundingClientRect().top;
            if (top - threshold <= 0) current = sections[i];
        }

        navLinks.forEach(function (l) { l.classList.remove('is-active'); });
        if (current) {
            document.querySelectorAll('.nav-links a[href="#' + current.id + '"]').forEach(function (l) {
                l.classList.add('is-active');
            });
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
        var revealTargets = document.querySelectorAll('.section, .hero-heading, .hero-sub, .hero-actions, .issue, .work-item');
        revealTargets.forEach(function (el) { el.classList.add('reveal'); });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(function (el) { io.observe(el); });
    }
})();
