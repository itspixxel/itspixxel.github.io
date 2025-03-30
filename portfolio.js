document.addEventListener('DOMContentLoaded', () => {
    // Navbar functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Function to reset nav links animation
    function resetNavLinksAnimation() {
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.animation = 'none';
            link.offsetHeight; // Force reflow
            link.style.animation = `navLinksFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards ${0.2 + (index * 0.1)}s`;
        });
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Reset animations when opening mobile menu
            if (navLinks.classList.contains('active')) {
                resetNavLinksAnimation();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                // Reset animations when returning to desktop view
                resetNavLinksAnimation();
            }
        });
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to activate the "All Projects" filter by default
    function activateAllProjectsFilter() {
        const allProjectsButton = Array.from(filterButtons).find(btn => btn.textContent.toLowerCase() === 'all projects');
        if (allProjectsButton) {
            allProjectsButton.classList.add('active');
            allProjectsButton.click();
        }
    }

    // Call the function to activate the "All Projects" filter on page load
    activateAllProjectsFilter();

    // Function to apply filters
    function applyFilters() {
        const activeFilters = Array.from(filterButtons)
            .filter(btn => btn.classList.contains('active'))
            .map(btn => btn.textContent.toLowerCase());

        let visibleCount = 0;

        // Show all projects if "All Projects" is selected and it's the only filter
        if (activeFilters.includes('all projects') && activeFilters.length === 1) {
            projectCards.forEach((card, index) => {
                card.style.display = 'block';
                animateCard(card, 0.1 + (index * 0.1));
                visibleCount++;
            });
            return;
        }

        // Filter projects based on their tags
        projectCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('.project-tag'))
                .map(tag => tag.textContent.toLowerCase());

            // Check if any of the active filters (excluding "all projects") match the card's tags
            const activeFiltersWithoutAll = activeFilters.filter(filter => filter !== 'all projects');
            if (activeFiltersWithoutAll.some(filter => tags.includes(filter))) {
                card.style.display = 'block';
                animateCard(card, 0.1 + (visibleCount * 0.1));
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
    }

    function animateCard(card, delay) {
        card.style.animation = 'none';
        card.offsetHeight; // Force reflow
        card.style.animation = `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards ${delay}s`;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAllProjects = button.textContent.toLowerCase() === 'all projects';
            const wasActive = button.classList.contains('active');

            if (isAllProjects) {
                // If clicking "All Projects", deactivate all other filters
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            } else {
                // If clicking any other filter
                const allProjectsButton = Array.from(filterButtons)
                    .find(btn => btn.textContent.toLowerCase() === 'all projects');
                
                // Toggle the clicked button
                button.classList.toggle('active');
                
                // Get all active filters after the toggle
                const activeFilters = Array.from(filterButtons)
                    .filter(btn => btn.classList.contains('active') && 
                                 btn.textContent.toLowerCase() !== 'all projects');

                // If there are other active filters, deactivate "All Projects"
                if (activeFilters.length > 0) {
                    allProjectsButton.classList.remove('active');
                } else {
                    // If no other filters are active, activate "All Projects"
                    allProjectsButton.classList.add('active');
                }
            }

            // Apply filters whenever a button is clicked
            applyFilters();
        });
    });

    // Project cards animation and modal functionality
    const modal = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal');
    const projectDetails = document.querySelectorAll('.project-details');
    const modalBody = document.querySelector('.modal-body');

    function openModal(projectId) {
        // Reset scroll position before showing new content
        if (modalBody) {
            modalBody.scrollTop = 0;
        }

        // Hide all project details first
        projectDetails.forEach(detail => {
            detail.style.display = 'none';
        });

        // Show the modal overlay first
        modal.style.display = 'flex';
        // Force a reflow to ensure the transition works
        modal.offsetHeight;
        modal.classList.add('active');

        // Show the selected project details
        const selectedProject = document.querySelector(`.project-details[data-project="${projectId}"]`);
        if (selectedProject) {
            selectedProject.style.display = 'block';
        }

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        
        // Wait for the fade out animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            // Reset scroll position
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }, 300); // Match this with the CSS transition duration

        // Restore background scrolling
        document.body.style.overflow = '';
    }

    if (modal && closeModalBtn) {
        // Add click event for each project card
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                if (projectId) {
                    openModal(projectId);
                }
            });
        });

        // Close modal when clicking the close button
        closeModalBtn.addEventListener('click', closeModalHandler);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalHandler();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModalHandler();
            }
        });

        // Prevent scrolling of background when modal is open
        modal.addEventListener('wheel', (e) => {
            if (!e.target.closest('.modal-content')) {
                e.preventDefault();
            }
        });
    }

    // Project cards animation
    if (projectCards.length > 0) {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
            }, 100 * (index + 1));
        });
    }
}); 