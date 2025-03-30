document.addEventListener('DOMContentLoaded', () => {
    // Blog filter and pagination shared variables
    const blogPosts = document.querySelectorAll('.blog-post');
    const postsPerPage = 4;

    // Blog filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.textContent.toLowerCase();

            // Show all posts if "All Posts" is selected
            if (filter === 'all posts') {
                showPage(currentPage); // Use pagination to show correct page
                return;
            }

            // Filter posts based on their tag
            blogPosts.forEach(post => {
                const tag = post.querySelector('.post-tag').textContent.toLowerCase();
                if (tag === filter) {
                    post.style.display = post.classList.contains('featured') ? 'grid' : 'block';
                    // Reset animation
                    post.style.animation = 'none';
                    post.offsetHeight; // Force reflow
                    post.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const pageNumbers = document.querySelectorAll('.page-number');
    let currentPage = 1;

    function showPage(pageNum) {
        // Special handling for first page: show 5 posts (1 featured + 4 regular)
        const postsOnFirstPage = 5;
        let start, end;
        
        if (pageNum === 1) {
            start = 0;
            end = postsOnFirstPage;
        } else {
            start = postsOnFirstPage + (pageNum - 2) * postsPerPage;
            end = start + postsPerPage;
        }

        blogPosts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.style.display = post.classList.contains('featured') ? 'grid' : 'block';
                // Reset animation
                post.style.animation = 'none';
                post.offsetHeight; // Force reflow
                post.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            } else {
                post.style.display = 'none';
            }
        });

        // Update active page number
        pageNumbers.forEach(num => {
            num.classList.remove('active');
            if (parseInt(num.textContent) === pageNum) {
                num.classList.add('active');
            }
        });

        // Calculate total pages needed
        const remainingPosts = blogPosts.length - postsOnFirstPage;
        const remainingPages = Math.ceil(remainingPosts / postsPerPage);
        const totalPages = 1 + remainingPages;

        // Enable/disable pagination buttons
        paginationButtons[0].disabled = pageNum === 1;
        paginationButtons[1].disabled = pageNum === totalPages;

        currentPage = pageNum;
    }

    // Initialize first page
    showPage(1);

    // Add click handlers for page numbers
    pageNumbers.forEach(number => {
        number.addEventListener('click', () => {
            const pageNum = parseInt(number.textContent);
            showPage(pageNum);
        });
    });

    // Previous/Next page functionality
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const remainingPosts = blogPosts.length - 5; // 5 posts on first page
            const remainingPages = Math.ceil(remainingPosts / postsPerPage);
            const totalPages = 1 + remainingPages;

            if (index === 0) { // Previous button
                showPage(Math.max(1, currentPage - 1));
            } else { // Next button
                showPage(Math.min(totalPages, currentPage + 1));
            }
        });
    });

    // Add hover effect for blog posts
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-5px)';
        });

        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
        });
    });

    // Blog post modal functionality
    const modalOverlay = document.querySelector('.blog-modal-overlay');
    const modalContent = document.querySelector('.blog-modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    const postDetails = document.querySelectorAll('.blog-post-details');
    const modalBody = document.querySelector('.blog-modal-body');

    function openModal(postId) {
        // Reset scroll position
        if (modalBody) {
            modalBody.scrollTop = 0;
        }

        // Hide all post details first
        postDetails.forEach(detail => {
            detail.style.display = 'none';
        });

        // Show modal overlay
        modalOverlay.style.display = 'flex';
        modalOverlay.offsetHeight; // Force reflow
        modalOverlay.classList.add('active');

        // Show the selected post details
        const selectedPost = document.querySelector(`.blog-post-details[data-post="${postId}"]`);
        if (selectedPost) {
            selectedPost.style.display = 'block';
        }

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        
        // Wait for the fade out animation to complete
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            // Reset scroll position
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }, 300);

        // Restore background scrolling
        document.body.style.overflow = '';
    }

    // Add click event for each blog post
    blogPosts.forEach(post => {
        post.addEventListener('click', () => {
            const postId = post.getAttribute('data-post');
            if (postId) {
                openModal(postId);
            }
        });
    });

    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevent scrolling of background when modal is open
    modalOverlay.addEventListener('wheel', (e) => {
        if (!e.target.closest('.blog-modal-content')) {
            e.preventDefault();
        }
    });
}); 