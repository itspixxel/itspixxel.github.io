// Navbar toggle functionality
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

    // Modal functionality
    const modal = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');
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

    // Interactive background orbs
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length > 0) {
        // Remove mouse tracking and just keep the basic animation
        // The orbs will now only use their CSS animations defined in home.css
        orbs.forEach((orb) => {
            orb.style.transform = 'none'; // Reset any existing transforms
        });
    }

    // Remove or comment out the filtering logic
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Comment out the filtering logic
    /*
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.textContent.trim().toLowerCase();
            projectCards.forEach(card => {
                const tags = card.getAttribute('data-tags').toLowerCase();
                if (filter === 'all' || tags.includes(filter)) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });
    */

    // Ensure all project cards are visible on page load
    projectCards.forEach(card => {
        card.style.display = 'block'; // Show all cards
    });

    // Gallery navigation for modal project details
    document.querySelectorAll('.project-details').forEach(function(details) {
        const galleryItems = details.querySelectorAll('.gallery-item');
        if (galleryItems.length < 2) return; // No need for navigation
        let currentIndex = 0;
        const prevBtn = details.querySelector('.gallery-btn.prev-btn');
        const nextBtn = details.querySelector('.gallery-btn.next-btn');

        function showItem(index) {
            galleryItems.forEach((item, i) => {
                item.style.display = (i === index) ? 'block' : 'none';
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                showItem(currentIndex);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % galleryItems.length;
                showItem(currentIndex);
            });
        }
        showItem(currentIndex);
    });

    // Gallery modal logic for ALL project modals
    document.querySelectorAll('.project-details').forEach(function(modal) {
        const galleryItems = modal.querySelectorAll('.gallery-item');
        const prevBtn = modal.querySelector('.gallery-btn.prev-btn');
        const nextBtn = modal.querySelector('.gallery-btn.next-btn');
        const thumbnails = modal.querySelectorAll('.gallery-thumbnail');
        if (galleryItems.length === 0 || thumbnails.length === 0) return;
        let currentIndex = 0;

        function showGalleryItem(index) {
            galleryItems.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
            thumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                showGalleryItem(newIndex);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = (currentIndex + 1) % galleryItems.length;
                showGalleryItem(newIndex);
            });
        }
        thumbnails.forEach((thumb, i) => {
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                showGalleryItem(i);
            });
        });
        // Initialize
        showGalleryItem(currentIndex);
    });
});