/**
 * Interactive Web Pages Assignment - JavaScript Implementation
 * This file contains all the interactive functionality for the web application
 * including event handling, DOM manipulation, and form validation.
 */

// =============================================================================
// PART 1: EVENT HANDLING AND DOM SETUP
// =============================================================================

/**
 * Initialize all interactive elements when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeCounter();
    initializeFAQ();
    initializeTabs();
    initializeDropdown();
    initializeFormValidation();
    
    // Log successful initialization
    console.log('%c🚀 Interactive Web Assignment Loaded Successfully!', 
        'color: #667eea; font-size: 16px; font-weight: bold;');
});

// =============================================================================
// PART 2: INTERACTIVE ELEMENTS IMPLEMENTATION
// =============================================================================

/**
 * Theme Toggle Functionality
 * Switches between light and dark themes with smooth transitions
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme preference or default to light
    const savedTheme = getStoredTheme() || 'light';
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme + '-theme');
    updateThemeToggleText(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const isLight = body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        // Toggle theme classes
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(newTheme + '-theme');
        
        // Update button text and save preference
        updateThemeToggleText(newTheme);
        saveTheme(newTheme);
        
        // Add a subtle animation effect
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

/**
 * Update theme toggle button text based on current theme
 */
function updateThemeToggleText(theme) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

/**
 * Theme storage helpers (with fallback for environments without localStorage)
 */
function saveTheme(theme) {
    try {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('theme', theme);
        } else {
            // Fallback: store in a global variable
            window.currentTheme = theme;
        }
    } catch (e) {
        window.currentTheme = theme;
    }
}

function getStoredTheme() {
    try {
        if (typeof Storage !== 'undefined') {
            return localStorage.getItem('theme');
        } else {
            return window.currentTheme;
        }
    } catch (e) {
        return window.currentTheme;
    }
}

/**
 * Interactive Counter Game
 * Provides multiple ways to manipulate a counter with visual feedback
 */
function initializeCounter() {
    let count = 0;
    const display = document.getElementById('counterDisplay');
    const incrementBtn = document.getElementById('incrementBtn');
    const increment5Btn = document.getElementById('increment5Btn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    const randomBtn = document.getElementById('randomBtn');

    /**
     * Update counter display with animation and color changes
     */
    function updateDisplay() {
        display.textContent = count;
        
        // Add scale animation effect
        display.style.transform = 'scale(1.1)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 200);
        
        // Change color based on value
        if (count > 0) {
            display.style.color = '#38a169'; // Green for positive
        } else if (count < 0) {
            display.style.color = '#e53e3e'; // Red for negative
        } else {
            display.style.color = '#667eea'; // Blue for zero
        }
    }

    // Event listeners for counter buttons
    incrementBtn.addEventListener('click', () => {
        count++;
        updateDisplay();
        addButtonFeedback(incrementBtn);
    });

    increment5Btn.addEventListener('click', () => {
        count += 5;
        updateDisplay();
        addButtonFeedback(increment5Btn);
    });

    decrementBtn.addEventListener('click', () => {
        count--;
        updateDisplay();
        addButtonFeedback(decrementBtn);
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        updateDisplay();
        addButtonFeedback(resetBtn);
    });

    randomBtn.addEventListener('click', () => {
        count = Math.floor(Math.random() * 201) - 100; // Random between -100 and 100
        updateDisplay();
        addButtonFeedback(randomBtn);
    });

    // Keyboard support for counter (arrow keys and spacebar)
    document.addEventListener('keydown', function(event) {
        // Don't interfere with form inputs
        if (event.target.tagName.toLowerCase() === 'input' || 
            event.target.tagName.toLowerCase() === 'textarea') {
            return;
        }
        
        switch(event.key) {
            case 'ArrowUp':
                count++;
                updateDisplay();
                event.preventDefault();
                break;
            case 'ArrowDown':
                count--;
                updateDisplay();
                event.preventDefault();
                break;
            case ' ':
                count = 0;
                updateDisplay();
                event.preventDefault();
                break;
        }
    });

    // Initialize display
    updateDisplay();
}

/**
 * Add visual feedback to buttons when clicked
 */
function addButtonFeedback(button) {
    button.style.transform = 'translateY(-2px) scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

/**
 * Collapsible FAQ Section
 * Smooth accordion-style expansion and collapse with rotation animations
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.dataset.faq;
            const answer = document.querySelector(`[data-answer="${faqId}"]`);
            const icon = this.querySelector('.faq-icon');
            
            if (!answer || !icon) return;
            
            // Check if this FAQ is currently active
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ items (accordion behavior)
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.faq-icon').forEach(item => {
                if (item !== icon) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                answer.classList.add('active');
                icon.classList.add('active');
            } else {
                answer.classList.remove('active');
                icon.classList.remove('active');
            }
        });
        
        // Add hover effect
        question.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        question.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Tabbed Interface System
 * Dynamic content switching with active state management
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Add fade-in animation
                targetPanel.style.opacity = '0';
                targetPanel.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    targetPanel.style.opacity = '1';
                    targetPanel.style.transform = 'translateY(0)';
                    targetPanel.style.transition = 'all 0.3s ease';
                }, 50);
            }
        });
        
        // Add button animation on click
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Interactive Dropdown Menu
 * Click-to-toggle dropdown with outside click closing
 */
function initializeDropdown() {
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    if (!dropdownToggle || !dropdownMenu) return;
    
    // Toggle dropdown visibility
    dropdownToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        const isVisible = dropdownMenu.style.display === 'block';
        
        if (isVisible) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });
    
    // Handle dropdown item clicks
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            executeDropdownAction(action);
            closeDropdown();
        });
        
        // Add hover animation
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeDropdown();
        }
    });
    
    /**
     * Open dropdown with animation
     */
    function openDropdown() {
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'translateY(0)';
            dropdownMenu.style.transition = 'all 0.2s ease';
        }, 10);
        
        // Rotate arrow
        const arrow = dropdownToggle.querySelector('span');
        if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
        }
    }
    
    /**
     * Close dropdown with animation
     */
    function closeDropdown() {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            dropdownMenu.style.display = 'none';
        }, 200);
        
        // Reset arrow
        const arrow = dropdownToggle.querySelector('span');
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
    }
}

/**
 * Execute dropdown actions based on selection
 */
function executeDropdownAction(action) {
    switch(action) {
        case 'alert':
            alert('Hello! This is a dropdown action. 🎉');
            break;
            
        case 'console':
            const timestamp = new Date().toLocaleString();
            console.log(`%cDropdown action executed at ${timestamp}`, 'color: #38a169; font-weight: bold;');
            alert('Check the browser console for the logged message! 📝');
            break;
            
        case 'color':
            changePageColors();
            break;
            
        case 'animate':
            animatePage();
            break;
            
        default:
            console.warn('Unknown dropdown action:', action);
    }
}

/**
 * Change page background with random gradient colors
 */
function changePageColors() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const originalBackground = document.body.style.background;
    
    document.body.style.background = randomColor;
    document.body.style.transition = 'background 0.5s ease';
    
    // Show notification
    showNotification('🎨 Background color changed! It will reset in 3 seconds.');
    
    // Reset after 3 seconds
    setTimeout(() => {
        document.body.style.background = originalBackground;
    }, 3000);
}

/**
 * Animate the entire page with a scale effect
 */
function animatePage() {
    const body = document.body;
    body.style.transform = 'scale(0.95)';
    body.style.transition = 'transform 0.3s ease';
    
    showNotification('✨ Page animation activated!');
    
    setTimeout(() => {
        body.style.transform = 'scale(1.02)';
    }, 150);
    
    setTimeout(() => {
        body.style.transform = 'scale(1)';
    }, 300);
    
    setTimeout(() => {
        body.style.transform = '';
        body.style.transition = '';
    }, 600);
}

/**
 * Show a temporary notification message
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// =============================================================================
// PART 3: COMPREHENSIVE FORM VALIDATION
// =============================================================================

/**
 * Advanced Form Validation System
 * Real-time validation with custom error messages and visual feedback
 */
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const fields = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        age: document.getElementById('age'),
        website: document.getElementById('website'),
        message: document.getElementById('message')
    };

    /**
     * Validation Rules and Regular Expressions
     */
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes'
        },
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address (example: user@domain.com)'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[(]?[\d\s\-\(\)]{10,}$/,
            message: 'Please enter a valid phone number (at least 10 digits)'
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)'
        },
        confirmPassword: {
            required: true,
            message: 'Passwords do not match'
        },
        age: {
            required: false,
            min: 13,
            max: 120,
            message: 'Age must be between 13 and 120 years'
        },
        website: {
            required: false,
            pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            message: 'Please enter a valid URL (include http:// or https://)'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 500,
            message: 'Message must be between 10 and 500 characters'
        }
    };

    /**
     * Validation function for individual fields
     */
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };

        // Check if required field is empty
        if (rules.required && (!value || value.trim() === '')) {
            return { 
                isValid: false, 
                message: `${getFieldLabel(fieldName)} is required` 
            };
        }

        // If field is empty and not required, it's valid
        if (!value || value.trim() === '') {
            return { isValid: true };
        }

        // Trim the value for further validation
        value = value.trim();

        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: rules.message };
        }

        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: rules.message };
        }

        // Check pattern (regex validation)
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }

        // Check numeric range for age
        if (rules.min !== undefined || rules.max !== undefined) {
            const numValue = parseInt(value, 10);
            if (isNaN(numValue) || 
                (rules.min !== undefined && numValue < rules.min) || 
                (rules.max !== undefined && numValue > rules.max)) {
                return { isValid: false, message: rules.message };
            }
        }

        // Special validation for confirm password
        if (fieldName === 'confirmPassword') {
            const passwordValue = fields.password ? fields.password.value : '';
            if (value !== passwordValue) {
                return { isValid: false, message: rules.message };
            }
        }

        return { isValid: true };
    }

    /**
     * Get user-friendly field label for error messages
     */
    function getFieldLabel(fieldName) {
        const labels = {
            fullName: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            age: 'Age',
            website: 'Website',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    /**
     * Update field UI based on validation result
     */
    function updateFieldUI(fieldName, validationResult) {
        const field = fields[fieldName];
        if (!field) return;
        
        const errorElement = document.getElementById(fieldName + 'Error');
        const successElement = document.getElementById(fieldName + 'Success');

        if (validationResult.isValid) {
            // Field is valid
            field.classList.remove('error');
            if (field.value.trim() !== '') {
                field.classList.add('success');
            }
            
            // Hide error message
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            
            // Show success message for filled fields
            if (successElement && field.value.trim() !== '') {
                successElement.style.display = 'block';
            }
        } else {
            // Field has errors
            field.classList.remove('success');
            field.classList.add('error');
            
            // Hide success message
            if (successElement) {
                successElement.style.display = 'none';
            }
            
            // Show error message
            if (errorElement) {
                errorElement.textContent = validationResult.message;
                errorElement.style.display = 'block';
            }
        }
    }

    /**
     * Debounce function to limit validation frequency
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Set up real-time validation for all fields
     */
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (!field) return;
        
        // Debounced validation function
        const debouncedValidation = debounce(() => {
            const validationResult = validateField(fieldName, field.value);
            updateFieldUI(fieldName, validationResult);
        }, 300);
        
        // Real-time validation on input
        field.addEventListener('input', debouncedValidation);

        // Immediate validation on blur (when user leaves field)
        field.addEventListener('blur', function() {
            const validationResult = validateField(fieldName, this.value);
            updateFieldUI(fieldName, validationResult);
        });

        // Clear validation state on focus
        field.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(fieldName + 'Error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    });

    /**
     * Handle form submission with comprehensive validation
     */
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isFormValid = true;
        const formData = {};
        const errors = [];

        // Validate all fields
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (!field) return;
            
            const value = field.value;
            const validationResult = validateField(fieldName, value);
            
            // Update UI
            updateFieldUI(fieldName, validationResult);
            
            if (!validationResult.isValid) {
                isFormValid = false;
                errors.push({
                    field: fieldName,
                    message: validationResult.message
                });
            } else {
                formData[fieldName] = value;
            }
        });

        // Handle form submission result
        const successMessage = document.getElementById('formSuccess');
        
        if (isFormValid) {
            handleSuccessfulSubmission(formData, successMessage);
        } else {
            handleFailedSubmission(errors, successMessage);
        }
    });

    /**
     * Handle successful form submission
     */
    function handleSuccessfulSubmission(formData, successMessage) {
        // Show success message
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Log form data to console
        console.log('%cForm submitted successfully! 🎉', 'color: #38a169; font-size: 14px; font-weight: bold;');
        console.log('Form Data:', formData);
        
        // Show notification
        showNotification('🎉 Form submitted successfully!');
        
        // Optional: Reset form after confirmation
        setTimeout(() => {
            if (confirm('Form submitted successfully! Would you like to reset the form?')) {
                resetForm();
            }
        }, 2000);
    }

    /**
     * Handle failed form submission
     */
    function handleFailedSubmission(errors, successMessage) {
        // Hide success message
        if (successMessage) {
            successMessage.style.display = 'none';
        }
        
        // Log errors to console
        console.log('%cForm validation failed ❌', 'color: #e53e3e; font-weight: bold;');
        console.log('Validation Errors:', errors);
        
        // Focus on first field with error
        const firstErrorField = Object.keys(fields).find(fieldName => {
            const field = fields[fieldName];
            return field && field.classList.contains('error');
        });
        
        if (firstErrorField && fields[firstErrorField]) {
            fields[firstErrorField].focus();
            fields[firstErrorField].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        
        // Show error notification
        showNotification('❌ Please fix the errors and try again');
    }

    /**
     * Reset form to initial state
     */
    function resetForm() {
        form.reset();
        
        // Clear all validation states
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (!field) return;
            
            field.classList.remove('success', 'error');
            
            const errorElement = document.getElementById(fieldName + 'Error');
            const successElement = document.getElementById(fieldName + 'Success');
            
            if (errorElement) errorElement.style.display = 'none';
            if (successElement) successElement.style.display = 'none';
        });
        
        // Hide success message
        const successMessage = document.getElementById('formSuccess');
        if (successMessage) {
            successMessage.style.display = 'none';
        }
        
        showNotification('🔄 Form has been reset');
    }
}

// =============================================================================
// UTILITY FUNCTIONS AND ERROR HANDLING
// =============================================================================

/**
 * Global error handler for the application
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    showNotification('⚠️ An error occurred. Check the console for details.');
});

/**
 * Performance monitoring
 */
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`%cPage fully loaded in ${loadTime.toFixed(2)}ms`, 
        'color: #667eea; font-weight: bold;');
    console.log('%cTry these keyboard shortcuts:', 'color: #38a169; font-weight: bold;');
    console.log('• Arrow Up/Down: Increment/Decrement counter');
    console.log('• Spacebar: Reset counter to zero');
});

/**
 * Smooth scroll utility function
 */
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =============================================================================
// END OF SCRIPT
// =============================================================================

console.log('%c✅ Interactive Web Assignment JavaScript Fully Loaded!', 
    'color: #38a169; font-size: 14px; font-weight: bold;');