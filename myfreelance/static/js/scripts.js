        // Language switching functionality
        function switchLanguage(lang) {
            // Hide all language content
            document.querySelectorAll('.lang-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected language content
            document.querySelectorAll(`[data-lang="${lang}"]`).forEach(content => {
                content.classList.add('active');
            });
            
            // Update language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.lang === lang) {
                    btn.classList.add('active');
                }
            });
        }
        

        // Modal functionality
        function openModal(modalId) {
            document.getElementById('modal-' + modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById('modal-' + modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Gestion des modales
        function openConsultationModal() {
            document.getElementById('consultation-modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
            trackEvent('modal_open', 'consultation', 'free_consultation');
        }

        function closeConsultationModal() {
            document.getElementById('consultation-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe portfolio cards for animation
        document.querySelectorAll('.portfolio-card, .service-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Dynamic navbar background on scroll
        const nav = document.querySelector('.nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.3)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.05)';
                nav.style.backdropFilter = 'blur(15px)';
            }
        });
        
        // Formulaire consultation gratuite
        document.getElementById('consultationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Analytics
            trackEvent('form_submit', 'consultation', 'free_30min');
            
            const subject = `Consultation gratuite 30min - ${data.name}`;
            const body = `
Demande de consultation gratuite :

Nom : ${data.name}
Email : ${data.email}
Téléphone : ${data.phone}
Créneaux préférés : ${data.availability || 'Flexible'}

BRIEF DU PROJET :
${data.brief}

---
Je souhaite réserver une consultation gratuite de 30min pour discuter de mon projet.
            `.trim();
            
            const mailtoLink = `mailto:clementa@aims.ac.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            
            closeConsultationModal();
            alert('Parfait ! Je vous recontacte sous 24h pour planifier notre rendez-vous.');
        });

        // Form enhancement
        document.addEventListener('DOMContentLoaded', function() {
            const forms = document.querySelectorAll('form[action*="mailto"]');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(form);
                    const data = {};
                    for (let [key, value] of formData.entries()) {
                        data[key] = value;
                    }
                    
                    const subject = 'Demande de projet - ' + (data.name || 'Nouveau contact');
                    const body = `
Nom: ${data.name || ''}
Email: ${data.email || ''}
Entreprise: ${data.company || 'Non spécifiée'}

PROJET:
${data.project || ''}

Budget: ${data.budget || 'À définir'}
Délai: ${data.timeline || 'Flexible'}
                    `.trim();
                    
                    const mailtoLink = `mailto:clementa@aims.ac.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = mailtoLink;
                });
            });
        });
        
    //
    // Mobile menu functionality
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        function closeMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to navigation
        /*window.addEventListener('scroll', function() {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.transform = 'translateX(-50%) scale(0.95)';
            } else {
                nav.style.background = 'rgba(15, 15, 15, 0.85)';
                nav.style.transform = 'translateX(-50%) scale(1)';
            }
        });*/

        // Add hamburger animation
        const style = document.createElement('style');
        style.textContent = `
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        `;
        document.head.appendChild(style);
