// Global variables
let currentScreen = 'landing-screen';
let clientData = {};
let selectedContactMethod = '';
let progressSteps = [
    { id: 'step-1', name: 'CRM Trigger', delay: 1000 },
    { id: 'step-2', name: 'Drive Folder', delay: 2000 },
    { id: 'step-3', name: 'Cursor Build', delay: 3000 },
    { id: 'step-4', name: 'GitHub Repo', delay: 4000 },
    { id: 'step-5', name: 'Email Notification', delay: 5000 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Show the first screen
    showScreen('landing-screen');
    
    // Initialize tab functionality
    setupTabs();
    
    // Add some sample data to dashboard
    updateDashboardData();
    
    // Set up demo data
    clientData = {
        name: 'John Doe',
        email: 'john@example.com',
        description: 'E-commerce platform with inventory management, customer accounts, and payment processing.'
    };
}

function setupEventListeners() {
    // Form submission
    const intakeForm = document.getElementById('intake-form');
    if (intakeForm) {
        intakeForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Interactive elements
    setupInteractiveElements();
}

// Handle contact method selection
function selectContactMethod(method) {
    selectedContactMethod = method;
    
    // Update AI header based on selected method
    const aiHeader = document.getElementById('ai-header');
    const aiSubheader = document.getElementById('ai-subheader');
    
    if (method === 'text') {
        aiHeader.textContent = 'Chat with Our AI Assistant';
        aiSubheader.textContent = 'Tell us about your project via text chat';
    } else if (method === 'voice') {
        aiHeader.textContent = 'Voice AI Call with ElevenLabs';
        aiSubheader.textContent = 'Speak naturally with our AI agent';
    }
    
    // Show AI interaction screen
    showScreen('ai-interaction-screen');
    
    // Add typing indicator effect
    addTypingEffect();
}

// Add typing effect to simulate real-time conversation
function addTypingEffect() {
    const messages = document.querySelectorAll('.ai-message, .user-message');
    
    // Hide all messages initially
    messages.forEach(message => {
        message.style.display = 'none';
    });
    
    // Show messages one by one with typing effect
    let currentIndex = 0;
    
    function showNextMessage() {
        if (currentIndex < messages.length) {
            const message = messages[currentIndex];
            message.style.display = 'flex';
            
            // Add typing animation
            const content = message.querySelector('.message-content');
            content.style.animation = 'fadeInUp 0.5s ease-out';
            
            currentIndex++;
            
            // Delay before showing next message
            const delay = message.classList.contains('ai-message') ? 1500 : 800;
            setTimeout(showNextMessage, delay);
        } else {
            // All messages shown, enable continue button
            const continueBtn = document.querySelector('.btn-primary');
            continueBtn.style.animation = 'pulse 1s ease-in-out';
        }
    }
    
    // Start showing messages after a brief delay
    setTimeout(showNextMessage, 500);
}

// Complete AI interaction and move to Lamont notification screen
function completeAIInteraction() {
    // Update client data in all screens
    updateClientData();
    
    // Show Lamont notification screen
    showScreen('lamont-notification-screen');
    
    // Add completion animation
    setTimeout(() => {
        const notificationMethods = document.querySelectorAll('.method');
        notificationMethods.forEach((method, index) => {
            setTimeout(() => {
                method.style.animation = 'fadeInUp 0.3s ease-out';
            }, index * 200);
        });
    }, 500);
}

// Simulate Zoom call process
function simulateZoomCall() {
    showScreen('zoom-call-screen');
    
    // Animate typing in the last transcript line
    setTimeout(() => {
        const typingLine = document.querySelector('.transcript-line.typing .text');
        const fullText = "Great, and for the admin dashboard, what specific features do you need for managing inventory, processing orders, and tracking customer data?";
        let currentText = "Great, and for the admin dashboard, what specific features do you need for managing...";
        
        const typeWriter = () => {
            if (currentText.length < fullText.length) {
                currentText = fullText.substring(0, currentText.length + 1);
                typingLine.textContent = currentText;
                setTimeout(typeWriter, 50);
            }
        };
        
        typeWriter();
    }, 2000);
}

// Complete Zoom call and start analysis
function completeZoomCall() {
    showScreen('chatgpt-analysis-screen');
    
    // Animate the analysis steps
    setTimeout(() => {
        animateAnalysisSteps();
    }, 1000);
}

// Animate ChatGPT analysis steps
function animateAnalysisSteps() {
    const steps = document.querySelectorAll('.analysis-step');
    
    // Step 1: Analysis complete
    setTimeout(() => {
        document.getElementById('analysis-step-1').classList.add('active');
    }, 500);
    
    // Step 2: Wireframes complete
    setTimeout(() => {
        document.getElementById('analysis-step-2').classList.add('active');
        document.getElementById('analysis-step-1').classList.remove('processing');
    }, 1500);
    
    // Step 3: Prototype in progress
    setTimeout(() => {
        document.getElementById('analysis-step-3').classList.add('processing');
        const progressBar = document.querySelector('#analysis-step-3 .progress-fill-small');
        let width = 60;
        const interval = setInterval(() => {
            width += 2;
            progressBar.style.width = width + '%';
            if (width >= 100) {
                clearInterval(interval);
                document.getElementById('analysis-step-3').classList.remove('processing');
                document.getElementById('analysis-step-3').classList.add('active');
            }
        }, 100);
    }, 2500);
    
    // Step 4: Cursor prompt generation
    setTimeout(() => {
        document.getElementById('analysis-step-4').classList.add('processing');
        const progressBar = document.querySelector('#analysis-step-4 .progress-fill-small');
        let width = 0;
        const interval = setInterval(() => {
            width += 3;
            progressBar.style.width = width + '%';
            if (width >= 100) {
                clearInterval(interval);
                document.getElementById('analysis-step-4').classList.remove('processing');
                document.getElementById('analysis-step-4').classList.add('active');
            }
        }, 80);
    }, 4000);
}

// Start Cursor development process
function startCursorDevelopment() {
    showScreen('progress-screen');
    startProgressAnimation();
}

// Send link to Lamont
function sendLinkToLamont() {
    showScreen('lamont-final-screen');
    
    // Animate the completion
    setTimeout(() => {
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.animation = 'fadeInUp 0.3s ease-out';
            }, index * 100);
        });
    }, 500);
    
    showNotification('Live link sent to Lamont via SMS and email!');
}

// Copy live link to clipboard
function copyLiveLink() {
    const link = 'https://yourcompany.github.io/john-doe-ecommerce';
    
    // Try to use the Clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(() => {
            fallbackCopyTextToClipboard(link);
        });
    } else {
        fallbackCopyTextToClipboard(link);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Link copied to clipboard!');
        } else {
            showNotification('Failed to copy link');
        }
    } catch (err) {
        showNotification('Failed to copy link');
    }
    
    document.body.removeChild(textArea);
}

// Start the automated setup process
function startAutomation() {
    showScreen('progress-screen');
    startProgressAnimation();
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    clientData = {
        name: formData.get('name'),
        email: formData.get('email'),
        description: formData.get('description')
    };
    
    // Update client data in other screens
    updateClientData();
    
    // Show progress screen and start automation
    showScreen('progress-screen');
    startProgressAnimation();
}

function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
    
    // Add fade-in animation
    setTimeout(() => {
        if (targetScreen) {
            targetScreen.style.opacity = '1';
        }
    }, 100);
}

function startProgressAnimation() {
    const progressFill = document.getElementById('progress-fill');
    let currentStep = 0;
    
    // Reset all steps
    progressSteps.forEach((step, index) => {
        const stepElement = document.getElementById(step.id);
        const statusElement = document.getElementById(`status-${index + 1}`);
        
        stepElement.classList.remove('active', 'completed');
        statusElement.classList.remove('active', 'completed');
        statusElement.textContent = 'Pending';
    });
    
    // Start progress animation
    function animateStep() {
        if (currentStep < progressSteps.length) {
            const step = progressSteps[currentStep];
            const stepElement = document.getElementById(step.id);
            const statusElement = document.getElementById(`status-${currentStep + 1}`);
            
            // Mark current step as active
            stepElement.classList.add('active');
            statusElement.classList.add('active');
            statusElement.textContent = 'Processing...';
            
            // Update progress bar
            const progressPercent = ((currentStep + 1) / progressSteps.length) * 100;
            progressFill.style.width = progressPercent + '%';
            
            // Complete step after delay
            setTimeout(() => {
                stepElement.classList.remove('active');
                stepElement.classList.add('completed');
                statusElement.classList.remove('active');
                statusElement.classList.add('completed');
                statusElement.textContent = 'Completed';
                
                currentStep++;
                
                if (currentStep < progressSteps.length) {
                    // Continue to next step
                    setTimeout(animateStep, 500);
                } else {
                    // All steps completed, show preview
                    setTimeout(() => {
                        showScreen('preview-screen');
                    }, 1500);
                }
            }, step.delay);
        }
    }
    
    // Start the animation
    setTimeout(animateStep, 1000);
}

function updateClientData() {
    // Update client name and email in various screens
    const clientNameElements = document.querySelectorAll('#client-name-display, #dashboard-client-name');
    const clientEmailElements = document.querySelectorAll('#client-email-display, #dashboard-client-email');
    
    clientNameElements.forEach(element => {
        element.textContent = clientData.name || 'John Doe';
    });
    
    clientEmailElements.forEach(element => {
        element.textContent = clientData.email || 'john@example.com';
    });
}

function setupTabs() {
    // Tab functionality for preview screen
    const tabs = document.querySelectorAll('.tab');
    const desktopPreview = document.getElementById('desktop-preview');
    const mobilePreview = document.getElementById('mobile-preview');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide appropriate preview
            if (this.dataset.tab === 'desktop') {
                desktopPreview.style.display = 'block';
                mobilePreview.style.display = 'none';
            } else {
                desktopPreview.style.display = 'none';
                mobilePreview.style.display = 'block';
            }
        });
    });
}

function switchTab(tabType) {
    const tabs = document.querySelectorAll('.tab');
    const desktopPreview = document.getElementById('desktop-preview');
    const mobilePreview = document.getElementById('mobile-preview');
    
    // Update tab states
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabType) {
            tab.classList.add('active');
        }
    });
    
    // Show appropriate preview
    if (tabType === 'desktop') {
        desktopPreview.style.display = 'block';
        mobilePreview.style.display = 'none';
    } else {
        desktopPreview.style.display = 'none';
        mobilePreview.style.display = 'block';
    }
}

function setupInteractiveElements() {
    // Add hover effects to wireframe elements
    const wireframeButtons = document.querySelectorAll('.wireframe-btn');
    wireframeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add interactivity to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add pulse effect
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Add interactivity to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(37, 204, 50, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function updateDashboardData() {
    // Update dashboard with current client data
    if (clientData.name && clientData.email) {
        const dashboardClientName = document.getElementById('dashboard-client-name');
        const dashboardClientEmail = document.getElementById('dashboard-client-email');
        
        if (dashboardClientName) {
            dashboardClientName.textContent = clientData.name;
        }
        if (dashboardClientEmail) {
            dashboardClientEmail.textContent = clientData.email;
        }
    }
    
    // Add some animation to stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 30;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue);
        }, 50);
    });
}

function exportData() {
    // Simulate data export
    const data = {
        clients: [
            {
                name: clientData.name || 'John Doe',
                email: clientData.email || 'john@example.com',
                project: 'E-commerce Platform',
                status: 'Completed',
                timestamp: new Date().toISOString()
            }
        ],
        stats: {
            activeProjects: 12,
            completedToday: 3,
            successRate: 98
        }
    };
    
    // Create and download file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'n8n-workflow-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Data exported successfully!');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25CC32;
        color: #000000;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
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
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Utility functions
function resetWorkflow() {
    // Reset all data and return to start
    clientData = {};
    selectedContactMethod = '';
    showScreen('landing-screen');
    
    // Reset form
    const form = document.getElementById('intake-form');
    if (form) {
        form.reset();
    }
    
    // Reset progress
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    
    // Reset AI chat messages
    const messages = document.querySelectorAll('.ai-message, .user-message');
    messages.forEach(message => {
        message.style.display = 'flex';
        message.style.animation = '';
    });
    
    showNotification('Workflow reset successfully!');
}

// Make functions available globally
window.showScreen = showScreen;
window.exportData = exportData;
window.resetWorkflow = resetWorkflow;
window.selectContactMethod = selectContactMethod;
window.completeAIInteraction = completeAIInteraction;
window.startAutomation = startAutomation;
window.simulateZoomCall = simulateZoomCall;
window.completeZoomCall = completeZoomCall;
window.startCursorDevelopment = startCursorDevelopment;
window.sendLinkToLamont = sendLinkToLamont;
window.copyLiveLink = copyLiveLink;

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to go back to landing screen
    if (e.key === 'Escape') {
        showScreen('landing-screen');
    }
    
    // Number keys for quick navigation
    if (e.key >= '1' && e.key <= '9') {
        const screens = [
            'landing-screen', 
            'ai-interaction-screen', 
            'lamont-notification-screen', 
            'zoom-call-screen', 
            'chatgpt-analysis-screen', 
            'progress-screen', 
            'preview-screen', 
            'github-pages-screen', 
            'lamont-final-screen'
        ];
        const screenIndex = parseInt(e.key) - 1;
        if (screens[screenIndex]) {
            showScreen(screens[screenIndex]);
        }
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading states for better feedback
function addLoadingState(element, duration = 2000) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.style.opacity = '0.7';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.opacity = '1';
    }, duration);
}

// Initialize loading states on interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('no-loading')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
});

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('client-name');
    const emailInput = document.getElementById('client-email');
    const descriptionInput = document.getElementById('project-description');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#25CC32';
            } else {
                this.style.borderColor = '#333333';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.style.borderColor = '#25CC32';
            } else {
                this.style.borderColor = '#ff6b6b';
            }
        });
    }
    
    if (descriptionInput) {
        descriptionInput.addEventListener('input', function() {
            const wordCount = this.value.trim().split(/\s+/).length;
            if (wordCount >= 10) {
                this.style.borderColor = '#25CC32';
            } else {
                this.style.borderColor = '#ffc107';
            }
        });
    }
}); 