document.addEventListener('DOMContentLoaded', () => {
    console.log('Ecophon Landing Page Loaded');

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0 && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (valid) {
                const btn = form.querySelector('button');
                const originalText = btn.innerText;

                btn.innerText = 'Sent!';
                btn.style.backgroundColor = '#28a745';

                setTimeout(() => {
                    form.reset();
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);

                alert('Thank you! We will get in touch soon.');
            }
        });
    }

    // Brochure Download Popup Functionality
    const brochurePopup = document.getElementById('brochure-popup');
    const brochureForm = document.getElementById('brochure-form');
    const brochureClose = document.querySelector('.brochure-close');
    const brochureUrlInput = document.getElementById('brochure-url');
    const brochureProductInput = document.getElementById('brochure-product');
    const brochureProductName = document.getElementById('brochure-product-name');

    // Open brochure popup when clicking download buttons
    document.querySelectorAll('.btn-download[data-brochure]').forEach(btn => {
        btn.addEventListener('click', () => {
            const brochureUrl = btn.dataset.brochure;
            const productName = btn.dataset.product;

            if (brochureUrlInput) brochureUrlInput.value = brochureUrl;
            if (brochureProductInput) brochureProductInput.value = productName;
            if (brochureProductName) brochureProductName.textContent = productName;

            if (brochurePopup) {
                brochurePopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeBrochurePopup() {
        if (brochurePopup) {
            brochurePopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close button
    if (brochureClose) {
        brochureClose.addEventListener('click', closeBrochurePopup);
    }

    // Close on backdrop click
    if (brochurePopup) {
        brochurePopup.addEventListener('click', (e) => {
            if (e.target === brochurePopup) closeBrochurePopup();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && brochurePopup && brochurePopup.classList.contains('active')) {
            closeBrochurePopup();
        }
    });

    // Handle brochure form submission
    if (brochureForm) {
        brochureForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = brochureForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const brochureUrl = brochureUrlInput.value;

            const formData = new FormData(brochureForm);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            submitBtn.textContent = "Submitting...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Close popup
                    closeBrochurePopup();
                    brochureForm.reset();

                    // Trigger file download
                    if (brochureUrl) {
                        const link = document.createElement('a');
                        link.href = brochureUrl;
                        // Set filename from URL
                        const filename = brochureUrl.substring(brochureUrl.lastIndexOf('/') + 1);
                        link.setAttribute('download', filename);
                        link.target = "_blank"; // Fallback for some browsers
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        alert("Thank you! Your brochure download will start shortly.");
                    } else {
                        alert("Thank you! However, the brochure file could not be found.");
                    }
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    // ==========================================
    // Real Spaces Image Slider Functionality
    // ==========================================

    // Image Data Configuration
    const sliderImages = {
        corporate: [
            'assets/CeilingSpace/CeilingOffice/CeilingOffice1.webp',
            'assets/CeilingSpace/CeilingOffice/CeilingOffice2.webp',
            'assets/CeilingSpace/CeilingOffice/CeilingOffice3.webp',
            'assets/CeilingSpace/CeilingOffice/CeilingOffice4.webp'
        ],
        education: [
            'assets/CeilingSpace/CeilingEducation/CeilingEducation1.webp',
            'assets/CeilingSpace/CeilingEducation/CeilingEducation2.webp',
            'assets/CeilingSpace/CeilingEducation/CeilingEducation3.webp',
            'assets/CeilingSpace/CeilingEducation/CeilingEducation4.webp'
        ],
        healthcare: [
            'assets/CeilingSpace/CeilingHealthcare/CeilingHealthcare1.webp',
            'assets/CeilingSpace/CeilingHealthcare/CeilingHealthcare2.webp',
            'assets/CeilingSpace/CeilingHealthcare/CeilingHealthcare3.webp',
            'assets/CeilingSpace/CeilingHealthcare/CeilingHealthcare4.webp'
        ],
        infrastructure: [
            'assets/CeilingSpace/Ceilings- infrastructure-project/Ceilings- infrastructure-project1.webp',
            'assets/CeilingSpace/Ceilings- infrastructure-project/Ceilings- infrastructure-project2.webp',
            'assets/CeilingSpace/Ceilings- infrastructure-project/Ceilings- infrastructure-project3.webp',
            'assets/CeilingSpace/Ceilings- infrastructure-project/Ceilings- infrastructure-project4.webp'
        ]
    };

    const sliderModal = document.getElementById('image-slider-modal');
    const sliderWrapper = document.getElementById('modal-slides-wrapper');
    const sliderDots = document.getElementById('modal-dots');
    const sliderTitle = document.getElementById('slider-title');
    const sliderClose = document.getElementById('slider-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    let currentModalSlide = 0;
    let currentCategoryImages = [];

    // Open Slider
    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const categoryName = card.querySelector('h3').textContent;

            if (sliderImages[category]) {
                openSliderModal(category, categoryName);
            }
        });
    });

    function openSliderModal(category, title) {
        currentCategoryImages = sliderImages[category];
        sliderTitle.textContent = title;
        currentModalSlide = 0;

        // Clear previous content
        sliderWrapper.innerHTML = '';
        sliderDots.innerHTML = '';

        // Populate Slides and Dots
        currentCategoryImages.forEach((imgSrc, index) => {
            // Create Slide
            const slideDiv = document.createElement('div');
            slideDiv.className = `modal-slide ${index === 0 ? 'active' : ''}`;
            slideDiv.innerHTML = `<img src="${imgSrc}" alt="${title} Image ${index + 1}">`;
            sliderWrapper.appendChild(slideDiv);

            // Create Dot
            const dot = document.createElement('div');
            dot.className = `modal-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToModalSlide(index));
            sliderDots.appendChild(dot);
        });

        sliderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateModalSlider() {
        const slides = sliderWrapper.querySelectorAll('.modal-slide');
        const dots = sliderDots.querySelectorAll('.modal-dot');

        slides.forEach((slide, index) => {
            if (index === currentModalSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, index) => {
            if (index === currentModalSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextModalSlide() {
        if (currentCategoryImages.length === 0) return;
        currentModalSlide = (currentModalSlide + 1) % currentCategoryImages.length;
        updateModalSlider();
    }

    function prevModalSlide() {
        if (currentCategoryImages.length === 0) return;
        currentModalSlide = (currentModalSlide - 1 + currentCategoryImages.length) % currentCategoryImages.length;
        updateModalSlider();
    }

    function goToModalSlide(index) {
        currentModalSlide = index;
        updateModalSlider();
    }

    function closeSliderModal() {
        sliderModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for Modal Controls
    if (modalNext) modalNext.addEventListener('click', nextModalSlide);
    if (modalPrev) modalPrev.addEventListener('click', prevModalSlide);
    if (sliderClose) sliderClose.addEventListener('click', closeSliderModal);

    // Close on backdrop click
    if (sliderModal) {
        sliderModal.addEventListener('click', (e) => {
            if (e.target === sliderModal) closeSliderModal();
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!sliderModal || !sliderModal.classList.contains('active')) return;

        if (e.key === 'Escape') closeSliderModal();
        if (e.key === 'ArrowRight') nextModalSlide();
        if (e.key === 'ArrowLeft') prevModalSlide();
    });

    // ==========================================
    // Quick Enquiry Modal Functionality
    // ==========================================
    const quickEnquiryModal = document.getElementById('quick-enquiry-modal');
    const chatBtn = document.getElementById('chat-btn');
    const enquiryClose = document.getElementById('enquiry-close');

    function openEnquiryModal() {
        if (quickEnquiryModal) {
            quickEnquiryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeEnquiryModal() {
        if (quickEnquiryModal) {
            quickEnquiryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (chatBtn) chatBtn.addEventListener('click', openEnquiryModal);
    if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiryModal);

    // Close on backdrop click
    if (quickEnquiryModal) {
        quickEnquiryModal.addEventListener('click', (e) => {
            if (e.target === quickEnquiryModal) closeEnquiryModal();
        });
    }

    // Close on Escape key (shared with brochure modal listener logic, but adding specific check)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quickEnquiryModal && quickEnquiryModal.classList.contains('active')) {
            closeEnquiryModal();
        }
    });

    // ==========================================
    // Floating Buttons Scroll Visibility
    // ==========================================
    const floatingButtons = document.querySelector('.floating-buttons');

    function toggleFloatingButtons() {
        if (!floatingButtons) return;

        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;

        // Check if scrolled more than 20%
        if ((scrollPosition / scrollTotal) > 0.20) {
            floatingButtons.classList.add('visible');
        } else {
            floatingButtons.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleFloatingButtons);
    // Initial check in case page is reloaded in middle
    toggleFloatingButtons();

    // ==========================================
    // Footer Form Handling (Web3Forms)
    // ==========================================
    const footerForms = document.querySelectorAll('.footer-form, #quick-enquiry-form');

    footerForms.forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your enquiry has been sent.");
                    form.reset();
                } else {
                    alert("Error: " + data.message);
                }

            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });

});
