document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor click behavior

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Scroll to the target section smoothly
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
