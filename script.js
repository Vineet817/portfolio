
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Handle navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.getElementById('navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        // Change icon between bars and times
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Fetch and display GitHub repositories
    fetchGitHubRepos();
});

// Function to fetch GitHub repositories
async function fetchGitHubRepos() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        const response = await fetch('https://api.github.com/users/Vineet817/repos');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        let repos = await response.json();
        
        // Filter out specified repositories
        const excludedRepos = ['bxbunny', 'empty', 'forage-walmart-task-4', 'malware', 'portfolio', 'programs', 'scrapy'];
        repos = repos.filter(repo => !excludedRepos.includes(repo.name));
        
        // Clear loading indicator
        projectsGrid.innerHTML = '';
        
        // Get language colors mapping
        const languageColors = {
            'Python': 'bg-blue-500',
            'JavaScript': 'bg-yellow-500',
            'TypeScript': 'bg-blue-600',
            'HTML': 'bg-orange-500',
            'CSS': 'bg-purple-500',
            'C++': 'bg-pink-600',
            'Rust': 'bg-red-700',
            'Java': 'bg-red-500'
        };
        
        // Map language to class
        function getLanguageClass(language) {
            if (!language) return '';
            
            switch(language) {
                case 'Python': return 'python';
                case 'JavaScript': return 'js';
                case 'TypeScript': return 'js';
                case 'C++': return 'cpp';
                case 'Rust': return 'rust';
                case 'Java': return 'java';
                default: return '';
            }
        }
        
        // Render each repository
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const langClass = getLanguageClass(repo.language);
            
            card.innerHTML = `
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    
                    <div class="project-tags">
                        ${repo.language ? `<span class="tag ${langClass}">${repo.language}</span>` : ''}
                        ${repo.topics && repo.topics.slice(0, 3).map(topic => 
                            `<span class="tag">${topic}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
        
        // Add animation delay to cards
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * index}s`;
        });
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p class="text-red-500">${error.message || 'Failed to load projects. Please try again later.'}</p>
                <p class="mt-4">
                    Visit my GitHub directly at 
                    <a href="https://github.com/Vineet817?tab=repositories" 
                       target="_blank" 
                       class="text-tech-purple hover:underline">
                        github.com/Vineet817
                    </a>
                </p>
            </div>
        `;
    }
}

// Helper function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations if browser supports IntersectionObserver
if ('IntersectionObserver' in window) {
    animateOnScroll();
}
