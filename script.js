// Business Logic and Interactivity for Portfolio Website

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeTerminalEffect();
    addSectionObserver();
    logToConsole('Portfolio loaded successfully');
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Skill tag interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', handleSkillTagClick);
        tag.addEventListener('mouseenter', highlightRelatedSkills);
        tag.addEventListener('mouseleave', removeHighlight);
    });

    // Contact link tracking
    const contactLinks = document.querySelectorAll('.contact-info a');
    contactLinks.forEach(link => {
        link.addEventListener('click', trackContactClick);
    });
}

/**
 * Handle skill tag clicks with visual feedback
 */
function handleSkillTagClick(event) {
    const skill = event.target.textContent.trim();
    logToConsole(`Skill selected: ${skill}`);
    
    // Add pulse animation
    event.target.style.animation = 'none';
    setTimeout(() => {
        event.target.style.animation = 'skill-pulse 0.5s ease-out';
    }, 10);
    
    // Show notification
    showNotification(`${skill} - Expert level`);
}

/**
 * Highlight related skills on hover
 */
function highlightRelatedSkills(event) {
    const skill = event.target.textContent.trim();
    const skillCategory = event.target.closest('.skill-category');
    
    if (skillCategory) {
        const allTags = skillCategory.querySelectorAll('.skill-tag');
        allTags.forEach(tag => {
            if (tag !== event.target) {
                tag.style.opacity = '0.5';
            }
        });
    }
}

/**
 * Remove highlight on mouse leave
 */
function removeHighlight(event) {
    const skillCategory = event.target.closest('.skill-category');
    if (skillCategory) {
        const allTags = skillCategory.querySelectorAll('.skill-tag');
        allTags.forEach(tag => {
            tag.style.opacity = '1';
        });
    }
}

/**
 * Track contact link clicks for analytics
 */
function trackContactClick(event) {
    const link = event.target.textContent.trim();
    logToConsole(`Contact link clicked: ${link}`);
    
    // Create custom event for analytics
    const analyticsEvent = new CustomEvent('contactClicked', {
        detail: { type: link, timestamp: new Date().toISOString() }
    });
    document.dispatchEvent(analyticsEvent);
}

/**
 * Terminal effect simulation
 */
function initializeTerminalEffect() {
    const commandsQueue = [
        { text: '> Loading portfolio...', delay: 100 },
        { text: '> Initializing DevOps environment...', delay: 500 },
        { text: '> Compiling skills and experience...', delay: 900 },
        { text: '> Portfolio ready!', delay: 1300 }
    ];
    
    commandsQueue.forEach(cmd => {
        setTimeout(() => {
            logToConsole(cmd.text);
        }, cmd.delay);
    });
}

/**
 * Add intersection observer for scroll animations
 */
function addSectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                logToConsole(`Section visible: ${entry.target.querySelector('h2')?.textContent || 'Unknown'}`);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Show temporary notification on screen
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 30, 0, 0.9);
        border: 2px solid #00ff00;
        color: #00ff00;
        padding: 15px 20px;
        border-radius: 5px;
        font-family: 'Courier Prime', monospace;
        font-size: 0.9em;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

/**
 * Log messages to console with timestamp
 */
function logToConsole(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
}

/**
 * Get portfolio statistics
 */
function getPortfolioStats() {
    const stats = {
        skills: document.querySelectorAll('.skill-tag').length,
        experiences: document.querySelectorAll('.experience-item').length,
        sections: document.querySelectorAll('section').length,
        certifications: document.querySelectorAll('.skill-tag').length // Adjust based on actual DOM
    };
    return stats;
}

/**
 * Export stats for external use
 */
function exportStats() {
    const stats = getPortfolioStats();
    console.log('Portfolio Statistics:', stats);
    return stats;
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes skill-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(300px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(300px);
        }
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.portfolioApp = {
    getStats: getPortfolioStats,
    exportStats: exportStats,
    showNotification: showNotification,
    logToConsole: logToConsole
};
