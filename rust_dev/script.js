
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Typing effect for hero section
    const typedTextElement = document.getElementById('typed-text');
    const textToType = "Building robust, efficient systems with Rust. Backend developer specializing in performance-critical applications and system programming.";
    let charIndex = 0;
  
    function typeText() {
      if (charIndex < textToType.length) {
        typedTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 30);
      }
    }
  
    setTimeout(() => {
      typeText();
    }, 500);
  
    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-btn');
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuIcon.classList.toggle('active');
    });
  
    // Navigation links - smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Account for navbar height
              behavior: 'smooth'
            });
          }
          
          // Close mobile menu if open
          mobileMenu.classList.remove('active');
          menuIcon.classList.remove('active');
        }
      });
    });
  
    // Project data
    const projectData = [
      {
        id: 1,
        title: "Rust Concurrency Library",
        description: "A high-performance concurrent data structures library with lock-free implementations.",
        tags: ["Rust", "Concurrency", "Lock-Free", "Performance"],
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
        category: "Library",
      },
      {
        id: 2,
        title: "WebAssembly Image Processor",
        description: "Real-time image processing tool compiled to WebAssembly for lightning-fast browser performance.",
        tags: ["Rust", "WebAssembly", "Image Processing", "Web"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=800",
        category: "Web",
      },
      {
        id: 3,
        title: "Embedded Rust Device Driver",
        description: "Low-level device driver for IoT hardware with memory-safe guarantees.",
        tags: ["Rust", "Embedded", "IoT", "No_std"],
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=800",
        category: "Embedded",
      },
      {
        id: 4,
        title: "Rust CLI Toolkit",
        description: "Command-line interface toolkit with advanced templating and configuration.",
        tags: ["Rust", "CLI", "Terminal", "Developer Tools"],
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&q=80&w=800",
        category: "CLI",
      },
      {
        id: 5,
        title: "Distributed Systems Framework",
        description: "Fault-tolerant distributed systems framework for building reliable applications.",
        tags: ["Rust", "Distributed Systems", "Consensus", "Networking"],
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        category: "Library",
      },
      {
        id: 6,
        title: "Rust Game Engine Core",
        description: "Performance-focused core components for game development with Rust.",
        tags: ["Rust", "Gaming", "Graphics", "Engine"],
        githubUrl: "https://github.com",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=800",
        category: "Game",
      },
    ];
  
    // Display projects
    const projectsGrid = document.querySelector('.projects-grid');
    const noProjectsMessage = document.querySelector('.no-projects');
    let currentFilter = 'All';
  
    function renderProjects(filter) {
      projectsGrid.innerHTML = '';
      
      const filteredProjects = filter === 'All' 
        ? projectData 
        : projectData.filter(project => project.category === filter);
      
      if (filteredProjects.length === 0) {
        noProjectsMessage.style.display = 'block';
      } else {
        noProjectsMessage.style.display = 'none';
        
        filteredProjects.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.className = 'project-card';
          
          const tagsHtml = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
          ).join('');
          
          const liveUrlHtml = project.liveUrl 
            ? `<a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View live project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </a>` 
            : '';
          
          projectCard.innerHTML = `
            <div class="project-image">
              <img src="${project.image}" alt="${project.title}">
              <div class="project-category">${project.category}</div>
            </div>
            <div class="project-content">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-tags">${tagsHtml}</div>
              <div class="project-links">
                <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                ${liveUrlHtml}
              </div>
            </div>
          `;
          
          projectsGrid.appendChild(projectCard);
        });
      }
    }
  
    // Initial render
    renderProjects(currentFilter);
  
    // Project filters
    const projectFilters = document.querySelectorAll('.project-filter');
    projectFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        projectFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        currentFilter = this.getAttribute('data-filter');
        renderProjects(currentFilter);
      });
    });
  
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');
    const formSuccess = document.querySelector('.form-success');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simulate form submission
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Message Sent!';
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        formSuccess.style.display = 'block';
        
        // Reset button and hide success message after 5 seconds
        setTimeout(() => {
          submitButton.textContent = 'Send Message';
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  
    // Intersection Observer for section animations
    if ('IntersectionObserver' in window) {
      const sectionContainers = document.querySelectorAll('.section-container');
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px'
      };
  
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
  
      sectionContainers.forEach(section => {
        sectionObserver.observe(section);
      });
    }
  });