// EIMC Portfolio Website - Enhanced for Mobile & PC

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initDevLab();
    initThemeCustomization();
    initPortfolio();
    initNameArtGenerator();
    initCalculator();
    initFooter();
    
    // Load saved settings
    loadSettings();
});

// ================ MOBILE NAVIGATION ================
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on links
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// ================ DEVLAB ================
function initDevLab() {
    const floatingDevlab = document.getElementById('floatingDevlab');
    const devlabSidebar = document.getElementById('devlabSidebar');
    const closeDevlab = document.getElementById('closeDevlab');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const editorTabs = document.querySelectorAll('.editor-tab');
    const runCodeBtn = document.getElementById('runCode');
    const templateBtns = document.querySelectorAll('.template-btn');
    
    // Toggle DevLab sidebar
    function toggleDevLab() {
        devlabSidebar.classList.toggle('active');
        document.body.style.overflow = devlabSidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    if (floatingDevlab) floatingDevlab.addEventListener('click', toggleDevLab);
    if (closeDevlab) closeDevlab.addEventListener('click', toggleDevLab);
    
    // Close DevLab when clicking outside on mobile
    if (window.innerWidth < 768) {
        document.addEventListener('click', function(event) {
            if (devlabSidebar.classList.contains('active') &&
                !devlabSidebar.contains(event.target) &&
                !floatingDevlab.contains(event.target)) {
                toggleDevLab();
            }
        });
    }
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            tabBtns.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
    
    // Editor tab switching
    editorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const editorType = this.dataset.editor;
            
            // Update active editor tab
            editorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding editor
            document.querySelectorAll('.editor').forEach(editor => {
                editor.classList.remove('active');
            });
            document.getElementById(`${editorType}Editor`).classList.add('active');
        });
    });
    
    // Run code in Code Lab
    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', function() {
            const htmlCode = document.getElementById('htmlEditor').value;
            const cssCode = document.getElementById('cssEditor').value;
            const preview = document.getElementById('codePreview');
            
            // Clear previous output
            preview.innerHTML = '';
            
            // Create style element
            const style = document.createElement('style');
            style.textContent = cssCode;
            preview.appendChild(style);
            
            // Add HTML
            preview.innerHTML += htmlCode;
        });
    }
    
    // Code templates
    const templates = {
        button: {
            html: `<button class="custom-btn">Click Me</button>`,
            css: `.custom-btn {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.custom-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`
        },
        card: {
            html: `<div class="custom-card">
    <h3>Beautiful Card</h3>
    <p>This is a custom card component you can use in your projects.</p>
    <button class="custom-btn">Learn More</button>
</div>`,
            css: `.custom-card {
    background: var(--bg-card);
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-color);
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
}

.custom-card h3 {
    color: var(--text-primary);
    margin-bottom: 12px;
}

.custom-card p {
    color: var(--text-secondary);
    margin-bottom: 20px;
}`
        },
        navbar: {
            html: `<nav class="custom-nav">
    <div class="nav-logo">LOGO</div>
    <div class="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
    </div>
</nav>`,
            css: `.custom-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: var(--bg-card);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
}

.nav-links {
    display: flex;
    gap: 24px;
}

.nav-links a {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.3s;
}

.nav-links a:hover {
    background: var(--primary);
    color: white;
}`
        }
    };
    
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateName = this.dataset.template;
            if (templates[templateName]) {
                document.getElementById('htmlEditor').value = templates[templateName].html;
                document.getElementById('cssEditor').value = templates[templateName].css;
                
                // Switch to HTML tab
                editorTabs.forEach(t => t.classList.remove('active'));
                document.querySelector('.editor-tab[data-editor="html"]').classList.add('active');
                document.querySelectorAll('.editor').forEach(editor => editor.classList.remove('active'));
                document.getElementById('htmlEditor').classList.add('active');
                
                // Auto-run the code
                runCodeBtn.click();
            }
        });
    });
    
    // Close DevLab with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && devlabSidebar.classList.contains('active')) {
            toggleDevLab();
        }
    });
}

// ================ THEME CUSTOMIZATION ================
function initThemeCustomization() {
    const colorPresets = document.querySelectorAll('.color-preset');
    const colorInputs = document.querySelectorAll('.color-input input[type="color"]');
    const fontSelects = document.querySelectorAll('.font-control select');
    const fontSizeSlider = document.getElementById('fontSize');
    const fontValue = document.getElementById('fontValue');
    const resetColorsBtn = document.getElementById('resetColors');
    const saveThemeBtn = document.getElementById('saveTheme');
    const layoutType = document.getElementById('layoutType');
    const colBtns = document.querySelectorAll('.col-btn');
    const styleBtns = document.querySelectorAll('.style-btn');
    const animationType = document.getElementById('animationType');
    
    // Theme presets
    const themes = {
        default: {
            primary: '#4a6cf7',
            secondary: '#6c5ce7',
            accent: '#fd79a8',
            bgPrimary: '#ffffff',
            bgSecondary: '#f8f9fa',
            bgCard: '#ffffff'
        },
        dark: {
            primary: '#5d78ff',
            secondary: '#7e6ce7',
            accent: '#ff6b9d',
            bgPrimary: '#1a1a2e',
            bgSecondary: '#16213e',
            bgCard: '#0f3460'
        },
        blue: {
            primary: '#0984e3',
            secondary: '#00cec9',
            accent: '#ff7675',
            bgPrimary: '#ffffff',
            bgSecondary: '#f0f8ff',
            bgCard: '#ffffff'
        },
        purple: {
            primary: '#a29bfe',
            secondary: '#6c5ce7',
            accent: '#fd79a8',
            bgPrimary: '#ffffff',
            bgSecondary: '#f9f7ff',
            bgCard: '#ffffff'
        },
        green: {
            primary: '#00b894',
            secondary: '#00cec9',
            accent: '#fd79a8',
            bgPrimary: '#ffffff',
            bgSecondary: '#f0fff9',
            bgCard: '#ffffff'
        },
        red: {
            primary: '#e17055',
            secondary: '#fdcb6e',
            accent: '#a29bfe',
            bgPrimary: '#fff9e6',
            bgSecondary: '#fff5e6',
            bgCard: '#ffffff'
        }
    };
    
    // Apply theme preset
    colorPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            const themeName = this.dataset.theme;
            applyTheme(themeName);
            saveSetting('theme', themeName);
        });
    });
    
    // Color pickers
    colorInputs.forEach(input => {
        input.addEventListener('input', function() {
            const colorVar = this.id.replace('Color', '').replace('bg', 'bg-');
            updateCSSVariable(`--${colorVar}`, this.value);
        });
    });
    
    // Font selection
    fontSelects.forEach(select => {
        select.addEventListener('change', function() {
            const fontType = this.id.replace('Font', '').toLowerCase();
            updateCSSVariable(`--font-${fontType}`, this.value);
            saveSetting(`${fontType}Font`, this.value);
        });
    });
    
    // Font size slider
    if (fontSizeSlider && fontValue) {
        fontSizeSlider.addEventListener('input', function() {
            const size = this.value + 'px';
            fontValue.textContent = size;
            updateCSSVariable('--font-size-base', size);
            saveSetting('fontSize', this.value);
        });
    }
    
    // Layout type
    if (layoutType) {
        layoutType.addEventListener('change', function() {
            const portfolioGrid = document.getElementById('portfolioGrid');
            if (portfolioGrid) {
                portfolioGrid.className = 'portfolio-grid ' + this.value;
                saveSetting('layoutType', this.value);
            }
        });
    }
    
    // Column buttons
    colBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cols = this.dataset.cols;
            
            // Update active button
            colBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update CSS variable
            updateCSSVariable('--grid-columns', cols);
            saveSetting('gridColumns', cols);
        });
    });
    
    // Style buttons
    styleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const style = this.dataset.style;
            
            // Update active button
            styleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply style
            applyCardStyle(style);
            saveSetting('cardStyle', style);
        });
    });
    
    // Animation type
    if (animationType) {
        animationType.addEventListener('change', function() {
            document.body.classList.remove('animation-fast', 'animation-slow', 'animation-none');
            if (this.value !== 'normal') {
                document.body.classList.add(`animation-${this.value}`);
            }
            saveSetting('animation', this.value);
        });
    }
    
    // Reset colors
    if (resetColorsBtn) {
        resetColorsBtn.addEventListener('click', function() {
            applyTheme('default');
            document.getElementById('headingFont').value = 'Poppins';
            document.getElementById('bodyFont').value = 'Inter';
            document.getElementById('fontSize').value = 16;
            fontValue.textContent = '16px';
            layoutType.value = 'grid';
            animationType.value = 'normal';
            
            updateCSSVariable('--font-heading', 'Poppins');
            updateCSSVariable('--font-body', 'Inter');
            updateCSSVariable('--font-size-base', '16px');
            
            document.body.classList.remove('animation-fast', 'animation-slow', 'animation-none');
            
            // Reset column buttons
            colBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('.col-btn[data-cols="3"]').classList.add('active');
            updateCSSVariable('--grid-columns', '3');
            
            // Reset style buttons
            styleBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('.style-btn[data-style="normal"]').classList.add('active');
            resetCardStyle();
            
            saveSetting('reset', true);
        });
    }
    
    // Save theme
    if (saveThemeBtn) {
        saveThemeBtn.addEventListener('click', function() {
            const themeData = {
                colors: {
                    primary: document.getElementById('primaryColor').value,
                    secondary: document.getElementById('secondaryColor').value,
                    bgPrimary: document.getElementById('bgColor').value
                },
                fonts: {
                    heading: document.getElementById('headingFont').value,
                    body: document.getElementById('bodyFont').value,
                    size: document.getElementById('fontSize').value
                },
                layout: {
                    type: layoutType.value,
                    columns: document.querySelector('.col-btn.active')?.dataset.cols || '3',
                    style: document.querySelector('.style-btn.active')?.dataset.style || 'normal',
                    animation: animationType.value
                }
            };
            
            localStorage.setItem('eimcTheme', JSON.stringify(themeData));
            showNotification('Theme saved successfully!');
        });
    }
    
    function applyTheme(themeName) {
        if (themes[themeName]) {
            // Update CSS variables
            Object.entries(themes[themeName]).forEach(([key, value]) => {
                updateCSSVariable(`--${key}`, value);
            });
            
            // Update color pickers
            document.getElementById('primaryColor').value = themes[themeName].primary;
            document.getElementById('secondaryColor').value = themes[themeName].secondary;
            document.getElementById('bgColor').value = themes[themeName].bgPrimary;
            
            // Update body class for dark theme
            if (themeName === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    }
    
    function applyCardStyle(style) {
        const cards = document.querySelectorAll('.service-card, .portfolio-item');
        
        cards.forEach(card => {
            card.classList.remove('minimal-style', 'bold-style');
            
            if (style === 'minimal') {
                card.classList.add('minimal-style');
                card.style.border = '1px solid var(--border-color)';
                card.style.boxShadow = 'none';
                card.style.padding = 'var(--spacing-lg)';
            } else if (style === 'bold') {
                card.classList.add('bold-style');
                card.style.border = '2px solid var(--primary)';
                card.style.boxShadow = 'var(--shadow-lg)';
                card.style.padding = 'var(--spacing-xl)';
            }
        });
    }
    
    function resetCardStyle() {
        const cards = document.querySelectorAll('.service-card, .portfolio-item');
        cards.forEach(card => {
            card.classList.remove('minimal-style', 'bold-style');
            card.style.border = '';
            card.style.boxShadow = '';
            card.style.padding = '';
        });
    }
}

// ================ PORTFOLIO WITH LOAD MORE ================
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const shownCount = document.getElementById('shownCount');
    const totalCount = document.getElementById('totalCount');
    
    let allProjects = [];
    let displayedProjects = [];
    let currentFilter = 'all';
    let currentView = 'grid';
    let itemsPerLoad = 1;
    let currentIndex = 0;
    
    // Initialize portfolio
    loadPortfolio();
    
    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            currentIndex = 0;
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and display projects
            filterAndDisplayProjects();
            saveSetting('portfolioFilter', currentFilter);
        });
    });
    
    // Change view
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentView = this.dataset.view;
            
            // Update active view
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid class
            portfolioGrid.className = 'portfolio-grid ' + currentView;
            saveSetting('portfolioView', currentView);
        });
    });
    
    // Load more projects
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
    
    async function loadPortfolio() {
        const loading = portfolioGrid.querySelector('.loading');
        
        // Try to load images 1-29 from images folder
        const projectPromises = [];
        
        for (let i = 1; i <= 29; i++) {
            projectPromises.push(
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = `${i}.jpg`;
                    
                    img.onload = function() {
                        // Assign random category for demonstration
                        const categories = ['web', 'design', 'branding'];
                        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                        
                        resolve({
                            id: i,
                            src: img.src,
                            category: randomCategory,
                            title: `Project ${i}`,
                            description: 'Professional digital solution delivered with excellence.',
                            tags: randomCategory === 'web' ? ['Web', 'Development'] : 
                                  randomCategory === 'design' ? ['Design', 'UI/UX'] : 
                                  ['Branding', 'Identity']
                        });
                    };
                    
                    img.onerror = function() {
                        // Image doesn't exist, resolve with null
                        resolve(null);
                    };
                })
            );
        }
        
        // Wait for all images to load
        const results = await Promise.all(projectPromises);
        
        // Filter out null results (images that don't exist)
        allProjects = results.filter(project => project !== null);
        
        // Remove loading indicator
        if (loading) {
            loading.remove();
        }
        
        // Update total count
        if (totalCount) {
            totalCount.textContent = allProjects.length;
        }
        
        // Initial display
        filterAndDisplayProjects();
    }
    
    function filterAndDisplayProjects() {
        // Clear current display
        portfolioGrid.innerHTML = '';
        displayedProjects = [];
        
        // Filter projects
        const filteredProjects = currentFilter === 'all' 
            ? allProjects 
            : allProjects.filter(project => project.category === currentFilter);
        
        // Reset index
        currentIndex = 0;
        
        // Display initial batch
        displayNextBatch(filteredProjects);
        
        // Update load more button visibility
        updateLoadMoreButton(filteredProjects);
    }
    
    function displayNextBatch(projects) {
        const endIndex = Math.min(currentIndex + itemsPerLoad, projects.length);
        const batch = projects.slice(currentIndex, endIndex);
        
        batch.forEach(project => {
            const projectElement = createProjectElement(project);
            portfolioGrid.appendChild(projectElement);
            displayedProjects.push(project);
        });
        
        currentIndex = endIndex;
        
        // Update shown count
        if (shownCount) {
            shownCount.textContent = displayedProjects.length;
        }
    }
    
    function createProjectElement(project) {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.category = project.category;
        
        div.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.src}" alt="${project.title}" loading="lazy">
            </div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tags">
                    ${project.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        return div;
    }
    
    function loadMoreProjects() {
        const filteredProjects = currentFilter === 'all' 
            ? allProjects 
            : allProjects.filter(project => project.category === currentFilter);
        
        displayNextBatch(filteredProjects);
        updateLoadMoreButton(filteredProjects);
    }
    
    function updateLoadMoreButton(filteredProjects) {
        if (loadMoreBtn) {
            if (currentIndex >= filteredProjects.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'flex';
                loadMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Load More (${filteredProjects.length - currentIndex} remaining)`;
            }
        }
    }
}

// ================ NAME ART GENERATOR ================
function initNameArtGenerator() {
    const nameInput = document.getElementById('nameInput');
    const styleOptions = document.querySelectorAll('.style-option');
    const generateBtn = document.getElementById('generateArtBtn');
    const downloadBtn = document.getElementById('downloadArtBtn');
    const shareBtn = document.getElementById('shareArtBtn');
    const previewArea = document.getElementById('previewArea');
    
    let currentArt = null;
    let currentStyle = 'gradient';
    
    // Style selection
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            styleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentStyle = this.dataset.style;
        });
    });
    
    // Generate art
    if (generateBtn) {
        generateBtn.addEventListener('click', generateNameArt);
    }
    
    // Download art
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadNameArt);
    }
    
    // Share art
    if (shareBtn) {
        shareBtn.addEventListener('click', shareNameArt);
    }
    
    // Enter key to generate
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateNameArt();
            }
        });
    }
    
    function generateNameArt() {
        const name = nameInput.value.trim();
        
        if (!name) {
            showNotification('Please enter a name first!');
            nameInput.focus();
            return;
        }
        
        // Clear previous art
        previewArea.innerHTML = '';
        
        // Create art element
        const artElement = document.createElement('div');
        artElement.className = 'generated-art';
        artElement.textContent = name.toUpperCase();
        
        // Apply style
        applyArtStyle(artElement, currentStyle);
        
        previewArea.appendChild(artElement);
        currentArt = name.toUpperCase();
        
        // Enable download and share buttons
        downloadBtn.disabled = false;
        shareBtn.disabled = false;
        
        // Save to history
        saveArtToHistory(name, currentStyle);
        
        showNotification('Name art generated successfully!');
    }
    
    function applyArtStyle(element, style) {
        // Base styles
        element.style.fontFamily = 'var(--font-heading)';
        element.style.fontWeight = '800';
        element.style.textAlign = 'center';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.padding = '2rem';
        element.style.borderRadius = '12px';
        
        // Style variations
        switch(style) {
            case 'gradient':
                element.style.fontSize = '3.5rem';
                element.style.letterSpacing = '2px';
                element.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                element.style.webkitBackgroundClip = 'text';
                element.style.webkitTextFillColor = 'transparent';
                element.style.backgroundClip = 'text';
                break;
            case 'modern':
                element.style.fontSize = '3rem';
                element.style.letterSpacing = '4px';
                element.style.fontWeight = '900';
                element.style.color = 'var(--text-primary)';
                element.style.border = '4px solid var(--primary)';
                element.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
                break;
            case 'elegant':
                element.style.fontSize = '3.8rem';
                element.style.fontWeight = '300';
                element.style.fontStyle = 'italic';
                element.style.letterSpacing = '3px';
                element.style.color = 'var(--text-primary)';
                element.style.textShadow = '1px 1px 3px rgba(0,0,0,0.2)';
                break;
        }
    }
    
    function downloadNameArt() {
        if (!currentArt) return;
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1200;
        canvas.height = 600;
        
        // Get current colors
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim();
        const secondaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary').trim();
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.font = 'bold 120px "Poppins", sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 20;
        ctx.fillText(currentArt, canvas.width / 2, canvas.height / 2);
        
        // Add watermark
        ctx.font = '24px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 0;
        ctx.fillText('Created with EIMC Name Art Generator', canvas.width / 2, canvas.height - 50);
        
        // Download
        const link = document.createElement('a');
        link.download = `eimc-name-art-${currentArt.toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showNotification('Art downloaded successfully!');
    }
    
    function shareNameArt() {
        if (!currentArt) return;
        
        const shareData = {
            title: 'My Name Art',
            text: `Check out my name art "${currentArt}" created with EIMC!`,
            url: window.location.href
        };
        
        if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData);
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareData.text).then(() => {
                showNotification('Link copied to clipboard!');
            });
        }
    }
    
    function saveArtToHistory(name, style) {
        const history = JSON.parse(localStorage.getItem('eimcArtHistory') || '[]');
        history.unshift({
            name: name,
            style: style,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 20 items
        if (history.length > 20) {
            history.pop();
        }
        
        localStorage.setItem('eimcArtHistory', JSON.stringify(history));
    }
}

// ================ CALCULATOR ================
function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const calcResult = document.getElementById('calcResult');
    
    if (calculateBtn && calcResult) {
        calculateBtn.addEventListener('click', calculateCost);
    }
    
    function calculateCost() {
        const service = document.getElementById('serviceType').value;
        const complexity = document.getElementById('complexity').value;
        const timeline = document.getElementById('timeline').value;
        const pages = parseInt(document.getElementById('pages').value) || 1;
        
        // Validate inputs
        if (!service || !complexity || !timeline) {
            showNotification('Please fill all required fields');
            return;
        }
        
        // Base prices
        const basePrices = {
            graphics: 15000,
            web: 50000,
            internet: 25000,
            domain: 10000
        };
        
        // Complexity multipliers
        const complexityMultipliers = {
            simple: 0.8,
            medium: 1.0,
            complex: 1.5
        };
        
        // Timeline multipliers
        const timelineMultipliers = {
            standard: 1.0,
            fast: 1.3,
            urgent: 1.7
        };
        
        // Calculate cost
        let baseCost = basePrices[service] || 0;
        let complexityFactor = complexityMultipliers[complexity] || 1;
        let timelineFactor = timelineMultipliers[timeline] || 1;
        
        // Additional cost for web pages
        let additionalCost = 0;
        if (service === 'web') {
            additionalCost = (pages - 1) * 5000;
        }
        
        let totalCost = (baseCost * complexityFactor * timelineFactor) + additionalCost;
        
        // Update display
        document.getElementById('basePrice').textContent = `₦${Math.round(baseCost).toLocaleString()}`;
        document.getElementById('complexityFactor').textContent = `${complexityFactor.toFixed(1)}x`;
        document.getElementById('timelineFactor').textContent = `${timelineFactor.toFixed(1)}x`;
        document.getElementById('additionalCost').textContent = `₦${Math.round(additionalCost).toLocaleString()}`;
        document.getElementById('totalCost').textContent = `₦${Math.round(totalCost).toLocaleString()}`;
        
        // Show result
        calcResult.classList.add('active');
        
        // Save calculation history
        saveCalculationHistory(service, totalCost);
    }
    
    function saveCalculationHistory(service, cost) {
        const history = JSON.parse(localStorage.getItem('eimcCalcHistory') || '[]');
        history.unshift({
            service: service,
            cost: cost,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 10 calculations
        if (history.length > 10) {
            history.pop();
        }
        
        localStorage.setItem('eimcCalcHistory', JSON.stringify(history));
    }
}

// ================ FOOTER ================
function initFooter() {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ================ UTILITY FUNCTIONS ================
function updateCSSVariable(name, value) {
    document.documentElement.style.setProperty(name, value);
}

function saveSetting(key, value) {
    const settings = JSON.parse(localStorage.getItem('eimcSettings') || '{}');
    settings[key] = value;
    localStorage.setItem('eimcSettings', JSON.stringify(settings));
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('eimcSettings') || '{}');
    const themeData = JSON.parse(localStorage.getItem('eimcTheme') || '{}');
    
    // Load theme from saved theme data
    if (themeData.colors) {
        Object.entries(themeData.colors).forEach(([key, value]) => {
            updateCSSVariable(`--${key}`, value);
        });
    }
    
    // Load fonts
    if (themeData.fonts) {
        if (themeData.fonts.heading) {
            document.getElementById('headingFont').value = themeData.fonts.heading;
            updateCSSVariable('--font-heading', themeData.fonts.heading);
        }
        
        if (themeData.fonts.body) {
            document.getElementById('bodyFont').value = themeData.fonts.body;
            updateCSSVariable('--font-body', themeData.fonts.body);
        }
        
        if (themeData.fonts.size) {
            document.getElementById('fontSize').value = themeData.fonts.size;
            document.getElementById('fontValue').textContent = themeData.fonts.size + 'px';
            updateCSSVariable('--font-size-base', themeData.fonts.size + 'px');
        }
    }
    
    // Load layout settings
    if (themeData.layout) {
        if (themeData.layout.type) {
            document.getElementById('layoutType').value = themeData.layout.type;
            const portfolioGrid = document.getElementById('portfolioGrid');
            if (portfolioGrid) {
                portfolioGrid.className = 'portfolio-grid ' + themeData.layout.type;
            }
        }
        
        if (themeData.layout.columns) {
            updateCSSVariable('--grid-columns', themeData.layout.columns);
            document.querySelectorAll('.col-btn').forEach(btn => btn.classList.remove('active'));
            const activeColBtn = document.querySelector(`.col-btn[data-cols="${themeData.layout.columns}"]`);
            if (activeColBtn) activeColBtn.classList.add('active');
        }
        
        if (themeData.layout.animation && themeData.layout.animation !== 'normal') {
            document.getElementById('animationType').value = themeData.layout.animation;
            document.body.classList.add(`animation-${themeData.layout.animation}`);
        }
    }
    
    // Load saved settings
    if (settings.portfolioFilter) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        const activeFilterBtn = document.querySelector(`.filter-btn[data-filter="${settings.portfolioFilter}"]`);
        if (activeFilterBtn) activeFilterBtn.classList.add('active');
    }
    
    if (settings.portfolioView) {
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        const activeViewBtn = document.querySelector(`.view-btn[data-view="${settings.portfolioView}"]`);
        if (activeViewBtn) activeViewBtn.classList.add('active');
        
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid) {
            portfolioGrid.className = 'portfolio-grid ' + settings.portfolioView;
        }
    }
    
    if (settings.cardStyle) {
        document.querySelectorAll('.style-btn').forEach(btn => btn.classList.remove('active'));
        const activeStyleBtn = document.querySelector(`.style-btn[data-style="${settings.cardStyle}"]`);
        if (activeStyleBtn) activeStyleBtn.classList.add('active');
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on window load
window.addEventListener('load', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Initialize lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Update items per load based on screen size
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid && window.innerWidth < 768) {
            // Less items per load on mobile
            itemsPerLoad = 4;
        } else {
            itemsPerLoad = 6;
        }
    }, 250);
});