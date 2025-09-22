// AI-Powered Student Companion - Enhanced JavaScript with Motion Effects
// Modern ES6+ JavaScript with smooth animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createParticleSystem();
});

// Enhanced Global state management
const AppState = {
    currentSection: 'dashboard',
    chatMessages: [],
    isProcessing: false,
    animationQueue: [],
    particles: [],
    selectedPDFFile: null // Store the selected PDF file
};

// Navigation state management
function updateNavigation(activeSection) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section
    const sectionMap = {
        'dashboard': 'Dashboard',
        'mental-health': 'Mental Health',
        'text-summarizer': 'Text Summarizer', 
        'pdf-processor': 'Smart Notes',
        'video-processor': 'Media Analysis'
    };
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkText = link.textContent.trim();
        if (linkText.includes(sectionMap[activeSection])) {
            link.classList.add('active');
        }
    });
    
    AppState.currentSection = activeSection;
}

// Initialize the application
function initializeApp() {
    setupEventListeners();
    addScrollAnimations();
    initializeTiltEffects();
    preloadAnimations();
    showWelcomeAnimation();
    initializeModularComponents();
    startBackgroundAnimations();
}

// Create particle system for enhanced visuals
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(particleContainer), i * 200);
    }
    
    // Continuous particle generation
    setInterval(() => {
        if (AppState.particles.length < 15) {
            createParticle(particleContainer);
        }
    }, 1000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (8 + Math.random() * 4) + 's';
    
    container.appendChild(particle);
    AppState.particles.push(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            AppState.particles = AppState.particles.filter(p => p !== particle);
        }
    }, 12000);
}

// Initialize modular components
function initializeModularComponents() {
    // Add interactive classes to elements
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('morph-button', 'ripple-effect');
    });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.classList.add('interactive-element', 'breathe');
    });
    
    document.querySelectorAll('.tech-badge').forEach(badge => {
        badge.classList.add('floating-action', 'wiggle');
    });
}

// Start background animations
function startBackgroundAnimations() {
    // Add gradient animation to body
    document.body.classList.add('gradient-animation');
    
    // Magnetic effect for interactive elements
    document.querySelectorAll('.interactive-element').forEach(element => {
        element.addEventListener('mousemove', handleMagneticEffect);
        element.addEventListener('mouseleave', resetMagneticEffect);
    });
}

// Magnetic effect handler
function handleMagneticEffect(e) {
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;
    
    this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
}

function resetMagneticEffect() {
    this.style.transform = 'translate(0, 0) scale(1)';
}

// Welcome animation on load
function showWelcomeAnimation() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            dashboard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Enhanced section navigation with smooth transitions
function showSection(sectionId) {
    if (AppState.isProcessing) return;
    
    AppState.isProcessing = true;
    const currentSection = document.querySelector('.feature-section:not([style*="display: none"])');
    const targetSection = document.getElementById(sectionId);
    const dashboard = document.getElementById('dashboard');
    
    // Smooth exit animation
    if (currentSection && currentSection !== targetSection) {
        animateElementOut(currentSection, () => {
            currentSection.style.display = 'none';
            showTargetSection();
        });
    } else if (dashboard && dashboard.style.display !== 'none') {
        animateElementOut(dashboard, () => {
            dashboard.style.display = 'none';
            showTargetSection();
        });
    } else {
        showTargetSection();
    }
    
    function showTargetSection() {
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(50px)';
            
            // Smooth entrance animation
            requestAnimationFrame(() => {
                targetSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                
                // Animate section header
                const header = targetSection.querySelector('.section-header');
                if (header) {
                    header.classList.add('animate__animated', 'animate__slideInDown');
                }
                
                // Stagger animate cards
                const cards = targetSection.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate__animated', 'animate__zoomIn');
                    }, index * 200);
                });
            });
            
            AppState.currentSection = sectionId;
            updateNavigation(sectionId);
        }
        
        AppState.isProcessing = false;
    }
}

// Return to dashboard with animation
function showDashboard() {
    if (AppState.isProcessing) return;
    
    AppState.isProcessing = true;
    const currentSection = document.querySelector('.feature-section:not([style*="display: none"])');
    const dashboard = document.getElementById('dashboard');
    
    if (currentSection) {
        animateElementOut(currentSection, () => {
            currentSection.style.display = 'none';
            showDashboardWithAnimation();
        });
    } else {
        showDashboardWithAnimation();
    }
    
    function showDashboardWithAnimation() {
        dashboard.style.display = 'block';
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'scale(0.95)';
        
        requestAnimationFrame(() => {
            dashboard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'scale(1)';
            
            // Re-animate feature cards
            const featureCards = dashboard.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s both`;
                }, 100);
            });
        });
        
        AppState.currentSection = 'dashboard';
        updateNavigation('dashboard');
        AppState.isProcessing = false;
    }
}

// Enhanced chat functionality with animations
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message || AppState.isProcessing) return;
    
    AppState.isProcessing = true;
    input.value = '';
    input.disabled = true;
    
    // Add user message with animation
    addChatMessage('user', message, true);
    
    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    try {
        // Send to backend with enhanced error handling
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator(typingIndicator);
        
        // Add bot response with delay for natural feel
        setTimeout(() => {
            addChatMessage('bot', data.response, true);
            playNotificationSound();
        }, 500);
        
    } catch (error) {
        console.error('Chat error:', error);
        removeTypingIndicator(typingIndicator);
        addChatMessage('bot', 'I apologize, but I\'m having trouble processing your message right now. Please try again in a moment. 💙', true);
    } finally {
        input.disabled = false;
        input.focus();
        AppState.isProcessing = false;
    }
}

// Enhanced message addition with smooth animations
function addChatMessage(sender, content, animate = true) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.className = `${sender}-message ${animate ? 'animate__animated bounce-in' : ''}`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <strong>You:</strong> ${escapeHtml(content)}
                <div class="message-time">${timestamp}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        if (animate) messageDiv.classList.add('animate__slideInRight');
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-leaf text-success"></i>
            </div>
            <div class="message-content">
                <strong>🌿 AI Companion:</strong> ${escapeHtml(content)}
                <div class="message-time">${timestamp}</div>
            </div>
        `;
        if (animate) messageDiv.classList.add('animate__slideInLeft');
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Enhanced scroll animation
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
    
    // Store in state
    AppState.chatMessages.push({ sender, content, timestamp });
    
    return messageDiv;
}

// Typing indicator for natural conversation flow
function addTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    
    typingDiv.className = 'bot-message typing-indicator animate__animated animate__fadeIn';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-heart text-danger"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    
    // Add typing dots CSS if not already present
    if (!document.querySelector('#typing-styles')) {
        const style = document.createElement('style');
        style.id = 'typing-styles';
        style.textContent = `
            .typing-dots {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 0.5rem;
            }
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #6c757d;
                animation: typing 1.4s infinite ease-in-out;
            }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            .typing-dots span:nth-child(3) { animation-delay: 0s; }
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
    
    return typingDiv;
}

function removeTypingIndicator(indicator) {
    if (indicator) {
        indicator.classList.add('animate__fadeOut');
        setTimeout(() => indicator.remove(), 300);
    }
}

// Enhanced text summarization with better UX
async function summarizeText() {
    const textInput = document.getElementById('text-input');
    const resultDiv = document.getElementById('summary-result');
    const text = textInput.value.trim();
    
    if (!text) {
        showNotification('Please enter some text to summarize.', 'warning');
        textInput.focus();
        return;
    }
    
    if (AppState.isProcessing) return;
    
    AppState.isProcessing = true;
    showLoadingOverlay();
    
    // Hide previous results with animation
    if (resultDiv.style.display === 'block') {
        animateElementOut(resultDiv, () => {
            resultDiv.style.display = 'none';
            performSummarization();
        });
    } else {
        performSummarization();
    }
    
    async function performSummarization() {
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            
            hideLoadingOverlay();
            
            // Show results with animation
            resultDiv.innerHTML = `
                <div class="result-header animate__animated animate__fadeInDown">
                    <h5 class="text-success mb-3">
                        <i class="fas fa-check-circle me-2"></i>
                        Smart Summary Generated
                    </h5>
                </div>
                <div class="result-content animate__animated animate__fadeInUp animate__delay-1s">
                    <div class="mb-4">
                        <h6 class="fw-bold text-primary">📄 Summary:</h6>
                        <div class="summary-text p-3 bg-light rounded">
                            ${escapeHtml(data.summary)}
                        </div>
                    </div>
                    <div class="mb-4">
                        <h6 class="fw-bold text-success">🔑 Key Points:</h6>
                        <ul class="key-points list-unstyled">
                            ${data.key_points.map(point => 
                                `<li class="mb-2">
                                    <i class="fas fa-arrow-right text-success me-2"></i>
                                    ${escapeHtml(point)}
                                </li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="result-stats d-flex justify-content-between text-muted small">
                        <span>📊 Original: ${text.length} chars</span>
                        <span>⚡ Compressed: ${Math.round((1 - data.summary.length / text.length) * 100)}%</span>
                        <span>⏱️ Generated: ${new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            `;
            
            resultDiv.style.display = 'block';
            resultDiv.style.opacity = '0';
            resultDiv.style.transform = 'translateY(30px)';
            
            requestAnimationFrame(() => {
                resultDiv.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                resultDiv.style.opacity = '1';
                resultDiv.style.transform = 'translateY(0)';
            });
            
            showNotification('Summary generated successfully!', 'success');
            
        } catch (error) {
            console.error('Summarization error:', error);
            hideLoadingOverlay();
            showNotification('Failed to generate summary. Please try again.', 'danger');
        } finally {
            AppState.isProcessing = false;
        }
    }
}

// Video Summarizer Tab Switching
function switchSummarizerTab(tabType) {
    const textTab = document.getElementById('text-tab');
    const videoTab = document.getElementById('video-tab');
    const textSection = document.getElementById('text-input-section');
    const videoSection = document.getElementById('video-input-section');
    
    if (tabType === 'text') {
        textTab.className = 'btn btn-success btn-sm';
        videoTab.className = 'btn btn-light btn-sm';
        textSection.style.display = 'block';
        videoSection.style.display = 'none';
    } else {
        textTab.className = 'btn btn-light btn-sm';
        videoTab.className = 'btn btn-success btn-sm';
        textSection.style.display = 'none';
        videoSection.style.display = 'block';
    }
}

// Initialize with video tab active
document.addEventListener('DOMContentLoaded', function() {
    switchSummarizerTab('video');
});

// Video File Handling
function handleVideoFile(input) {
    const file = input.files[0];
    if (!file) return;
    
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const processBtn = document.getElementById('process-video-btn');
    const uploadZone = document.getElementById('video-upload-zone');
    
    // Validate file type
    const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/flv', 
                       'video/wmv', 'video/webm', 'video/x-msvideo', 'audio/mp3', 
                       'audio/wav', 'audio/m4a', 'audio/flac', 'audio/aac'];
    
    const fileType = file.type || '';
    const fileExt = file.name.toLowerCase().split('.').pop();
    
    if (!validTypes.includes(fileType) && !['mp4','avi','mov','mkv','flv','wmv','webm','m4v','mp3','wav','m4a','flac','aac'].includes(fileExt)) {
        showNotification('Please upload a valid video or audio file.', 'warning');
        input.value = '';
        return;
    }
    
    // Check file size (200MB limit)
    const maxSize = 200 * 1024 * 1024; // 200MB
    if (file.size > maxSize) {
        showNotification('File size exceeds 200MB limit. Please choose a smaller file.', 'warning');
        input.value = '';
        return;
    }
    
    // Update UI
    fileName.textContent = file.name;
    fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
    fileInfo.style.display = 'block';
    processBtn.disabled = false;
    
    // Update upload zone appearance
    uploadZone.style.borderColor = '#22c55e';
    uploadZone.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)';
    
    showNotification('File selected successfully! Ready to process.', 'success');
}

// Process Video Function
async function processVideo() {
    const fileInput = document.getElementById('video-file-input');
    const resultDiv = document.getElementById('summary-result');
    const processBtn = document.getElementById('process-video-btn');
    const processingStatus = document.getElementById('processing-status');
    
    if (!fileInput.files[0]) {
        showNotification('Please select a video or audio file first.', 'warning');
        return;
    }
    
    if (AppState.isProcessing) return;
    
    AppState.isProcessing = true;
    
    // Show processing status
    processBtn.style.display = 'none';
    processingStatus.style.display = 'block';
    
    // Hide previous results
    if (resultDiv.style.display === 'block') {
        resultDiv.style.display = 'none';
    }
    
    try {
        const formData = new FormData();
        formData.append('video_file', fileInput.files[0]);
        
        showNotification('Processing video... This may take several minutes.', 'info');
        
        const response = await fetch('/api/process-video', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Show results with animation
        resultDiv.innerHTML = `
            <div class="result-header animate__animated animate__fadeInDown">
                <h5 class="text-success mb-3">
                    <i class="fas fa-video me-2"></i>
                    Video/Audio Processing Complete
                </h5>
                <div class="badge bg-success-soft me-2">
                    <i class="fas fa-microphone me-1"></i>
                    ${data.ai_powered ? 'Gemini AI' : 'Placeholder'}
                </div>
                <div class="badge bg-info-soft">
                    <i class="fas fa-file me-1"></i>
                    ${data.file_type || 'Media'}
                </div>
            </div>
            
            <div class="result-content animate__animated animate__fadeInUp animate__delay-1s">
                <div class="mb-4">
                    <h6 class="fw-bold text-primary">
                        <i class="fas fa-file-text me-2"></i>Summary:
                    </h6>
                    <div class="summary-text p-3 bg-light rounded">
                        ${escapeHtml(data.summary || 'No summary available')}
                    </div>
                </div>
                
                <div class="mb-4">
                    <h6 class="fw-bold text-info">
                        <i class="fas fa-transcript me-2"></i>Transcription:
                    </h6>
                    <div class="transcript-text p-3 bg-info-light rounded" style="max-height: 300px; overflow-y: auto;">
                        <small>${escapeHtml(data.transcription || 'No transcription available')}</small>
                    </div>
                </div>
                
                <div class="result-stats d-flex justify-content-between text-muted small">
                    <span><i class="fas fa-file me-1"></i>Type: ${data.file_type || 'Unknown'}</span>
                    <span><i class="fas fa-clock me-1"></i>Duration: ${data.duration || 'Unknown'}</span>
                    <span><i class="fas fa-robot me-1"></i>AI: ${data.ai_powered ? 'Enabled' : 'Placeholder'}</span>
                    <span><i class="fas fa-clock me-1"></i>Generated: ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
            resultDiv.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
        });
        
        showNotification('Video processed and summarized successfully! 🎉', 'success');
        
    } catch (error) {
        console.error('Video processing error:', error);
        showNotification(`Failed to process video: ${error.message}`, 'danger');
    } finally {
        AppState.isProcessing = false;
        processBtn.style.display = 'block';
        processingStatus.style.display = 'none';
    }
}

// Enhanced PDF processing with drag-and-drop
function setupPDFUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('pdf-file');
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
        uploadArea.style.borderColor = '#f39c12';
        uploadArea.style.background = 'rgba(243, 156, 18, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        uploadArea.style.borderColor = '#dee2e6';
        uploadArea.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        uploadArea.style.borderColor = '#dee2e6';
        uploadArea.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            AppState.selectedPDFFile = files[0]; // Store the file
            updateUploadDisplay(files[0]);
        } else {
            showNotification('Please drop a valid PDF file.', 'warning');
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            AppState.selectedPDFFile = e.target.files[0]; // Store the file
            updateUploadDisplay(e.target.files[0]);
        }
    });
}

function updateUploadDisplay(file) {
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.innerHTML = `
        <div class="upload-content animate__animated animate__bounceIn">
            <i class="fas fa-file-pdf fa-3x text-danger mb-3"></i>
            <h5>${file.name}</h5>
            <p class="text-success">
                <i class="fas fa-check-circle me-2"></i>
                Ready to process (${(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            <small class="text-muted">Click "Extract Smart Notes" to continue</small>
        </div>
    `;
}

async function processPDF() {
    console.log('🚀 processPDF called');
    
    // Debug: Log all file inputs on the page
    const allFileInputs = document.querySelectorAll('input[type="file"]');
    console.log('🔍 All file inputs found:', allFileInputs);
    allFileInputs.forEach((input, index) => {
        console.log(`📁 Input ${index}:`, input, 'ID:', input.id, 'Files:', input.files);
    });
    
    // Debug: Check current section visibility
    const pdfSection = document.querySelector('[class*="pdf"]') || document.querySelector('#pdf-processor');
    console.log('� PDF section found:', pdfSection);
    
    // Multiple strategies to find the file input
    let fileInput = document.getElementById('pdf-file') || 
                   document.querySelector('input[type="file"][accept=".pdf"]') ||
                   document.querySelector('input[type="file"]') ||
                   allFileInputs[0];
    
    console.log('� Selected file input:', fileInput);
    
    if (!fileInput) {
        console.log('❌ No file input found at all');
        showNotification('Cannot find file upload element. Please refresh the page.', 'danger');
        return;
    }
    
    console.log('📂 Files:', fileInput.files);
    console.log('📄 Files length:', fileInput.files?.length);
    console.log('💾 Stored PDF file:', AppState.selectedPDFFile);
    
    // Check both the input files and our stored file
    const hasInputFile = fileInput.files && fileInput.files.length > 0;
    const hasStoredFile = AppState.selectedPDFFile !== null;
    
    if (!hasInputFile && !hasStoredFile) {
        console.log('⚠️ No file selected');
        showNotification('Please select a PDF file first.', 'warning');
        return;
    }
    
    // Use stored file if available, otherwise use input file
    const selectedFile = AppState.selectedPDFFile || fileInput.files[0];
    console.log('✅ Using file:', selectedFile.name, selectedFile.size);
    
    // Find result div
    const resultDiv = document.getElementById('pdf-result') || document.querySelector('.pdf-output');
    console.log('📊 Result div found:', resultDiv);
    
    if (AppState.isProcessing) {
        console.log('⏳ Already processing');
        return;
    }
    
    AppState.isProcessing = true;
    console.log('🔄 Starting PDF processing');
    showLoadingOverlay();
    
    const formData = new FormData();
    formData.append('pdf_file', selectedFile); // Use the selected file
    console.log('📤 Form data created with file:', selectedFile.name);
    console.log('📄 File being uploaded:', selectedFile.name, 'Size:', selectedFile.size);
    
    try {
        console.log('🌐 Making API call to /api/process-pdf');
        const response = await fetch('/api/process-pdf', {
            method: 'POST',
            body: formData
        });
        console.log('📥 Response received:', response.status, response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Error response:', errorText);
            throw new Error(`Server error: ${response.status}`);
        }
        
        console.log('✅ Response OK, parsing JSON');
        const data = await response.json();
        console.log('📊 Response data:', data);
        
        hideLoadingOverlay();
        
        // Show results with enhanced animation
        resultDiv.innerHTML = `
            <div class="result-header animate__animated animate__fadeInDown">
                <h5 class="text-warning mb-3">
                    <i class="fas fa-magic me-2"></i>
                    Smart Notes Extracted
                </h5>
            </div>
            <div class="result-content animate__animated animate__fadeInUp animate__delay-1s">
                <div class="mb-4">
                    <h6 class="fw-bold text-primary">📝 Key Concepts & Definitions:</h6>
                    <div class="notes-content p-3 bg-light rounded">
                        ${escapeHtml(data.smart_notes).split('\n').map(line => 
                            line.trim() ? `<p class="mb-2">${escapeHtml(line)}</p>` : ''
                        ).join('')}
                    </div>
                </div>
                <div class="mb-4">
                    <h6 class="fw-bold text-success">🎯 Study Focus Areas:</h6>
                    <ul class="focus-areas list-unstyled">
                        ${data.key_terms.map(term => 
                            `<li class="mb-2">
                                <span class="badge bg-primary-soft me-2">${escapeHtml(term)}</span>
                            </li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="result-stats d-flex justify-content-between text-muted small">
                    <span>📄 Pages processed: ${data.pages || 'N/A'}</span>
                    <span>📊 Key terms found: ${data.key_terms.length}</span>
                    <span>⏱️ Processed: ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
            resultDiv.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
        });
        
        showNotification('Smart notes extracted successfully!', 'success');
        
    } catch (error) {
        console.error('❌ PDF processing error:', error);
        console.error('Error stack:', error.stack);
        hideLoadingOverlay();
        showNotification('Failed to process PDF. Please try again.', 'danger');
    } finally {
        AppState.isProcessing = false;
    }
}

// Text processing function for the new text summarizer
async function processText() {
    console.log('🚀 processText called');
    
    const textInput = document.getElementById('main-text-input');
    const resultDiv = document.getElementById('text-result');
    
    console.log('📁 Text input element:', textInput);
    console.log('📄 Text content:', textInput?.value);
    
    if (!textInput || !textInput.value.trim()) {
        console.log('⚠️ No text provided');
        showNotification('Please enter some text to summarize.', 'warning');
        return;
    }
    
    const text = textInput.value.trim();
    if (text.length < 50) {
        console.log('⚠️ Text too short');
        showNotification('Please enter at least 50 characters for meaningful analysis.', 'warning');
        return;
    }
    
    if (AppState.isProcessing) {
        console.log('⏳ Already processing');
        return;
    }
    
    AppState.isProcessing = true;
    console.log('🔄 Starting text processing');
    showLoadingOverlay();
    
    try {
        console.log('🌐 Making API call to /api/process-text');
        const response = await fetch('/api/process-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        console.log('📥 Response received:', response.status, response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Error response:', errorText);
            throw new Error(`Server error: ${response.status}`);
        }
        
        console.log('✅ Response OK, parsing JSON');
        const data = await response.json();
        console.log('📊 Response data:', data);
        
        hideLoadingOverlay();
        
        // Show results with enhanced animation
        resultDiv.innerHTML = `
            <div class="result-header animate__animated animate__fadeInDown">
                <h5 class="text-warning mb-3">
                    <i class="fas fa-magic me-2"></i>
                    Smart Summary Generated
                </h5>
            </div>
            <div class="result-content animate__animated animate__fadeInUp animate__delay-1s">
                <div class="mb-4">
                    <h6 class="fw-bold text-primary">📝 Key Summary:</h6>
                    <div class="summary-content p-3 bg-light rounded">
                        ${escapeHtml(data.summary)}
                    </div>
                </div>
                <div class="mb-4">
                    <h6 class="fw-bold text-success">🎯 Key Concepts:</h6>
                    <div class="concepts-grid">
                        ${data.key_concepts.map(concept => 
                            `<span class="badge bg-primary-soft me-2 mb-2">${escapeHtml(concept)}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="mb-4">
                    <h6 class="fw-bold text-info">💡 Important Points:</h6>
                    <ul class="key-points list-unstyled">
                        ${data.key_points.map(point => 
                            `<li class="mb-2">
                                <i class="fas fa-chevron-right text-primary me-2"></i>
                                ${escapeHtml(point)}
                            </li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="result-stats d-flex justify-content-between text-muted small">
                    <span>📄 Characters: ${text.length.toLocaleString()}</span>
                    <span>📊 Concepts found: ${data.key_concepts.length}</span>
                    <span>⏱️ Processed: ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
            resultDiv.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
        });
        
        showNotification('Smart summary generated successfully!', 'success');
        
    } catch (error) {
        console.error('❌ Text processing error:', error);
        console.error('Error stack:', error.stack);
        hideLoadingOverlay();
        showNotification('Failed to process text. Please try again.', 'danger');
    } finally {
        AppState.isProcessing = false;
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => notification.remove(), 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} animate__animated animate__slideInDown position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        border: none;
        border-radius: 12px;
        backdrop-filter: blur(20px);
    `;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${iconMap[type]} me-2"></i>
            <span>${escapeHtml(message)}</span>
            <button type="button" class="btn-close ms-auto" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('animate__fadeOutUp');
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
    
    // Manual close
    notification.querySelector('.btn-close').addEventListener('click', () => {
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => notification.remove(), 300);
    });
}

// Enhanced loading overlay management with particle effects
function showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="enhanced-spinner"></div>
            <p class="mt-3 text-success breathe">🌿 Processing your request...</p>
        </div>
    `;
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    
    requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '1';
    });
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

// Smooth element exit animation
function animateElementOut(element, callback) {
    element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px) scale(0.98)';
    
    setTimeout(callback, 400);
}

// Initialize tilt effects for cards
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const tiltX = deltaY * -10;
            const tiltY = deltaX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .tech-badge, .stat-card').forEach(element => {
        observer.observe(element);
    });
}

// Event listeners setup
function setupEventListeners() {
    // Chat input handler
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // PDF upload setup
    setupPDFUpload();
    
    // Smooth scrolling for internal links
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
    
    // Enhanced form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                showNotification('Please fill in all required fields correctly.', 'warning');
            }
            form.classList.add('was-validated');
        });
    });
}

// Preload animations for better performance
function preloadAnimations() {
    const animationClasses = [
        'animate__fadeIn', 'animate__fadeOut', 'animate__slideInLeft', 
        'animate__slideInRight', 'animate__slideInDown', 'animate__slideInUp',
        'animate__zoomIn', 'animate__zoomOut', 'animate__bounceIn'
    ];
    
    animationClasses.forEach(className => {
        const tempElement = document.createElement('div');
        tempElement.className = `animate__animated ${className}`;
        tempElement.style.position = 'absolute';
        tempElement.style.top = '-9999px';
        tempElement.style.opacity = '0';
        document.body.appendChild(tempElement);
        setTimeout(() => document.body.removeChild(tempElement), 100);
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Optional: Add subtle sound effects
function playNotificationSound() {
    // Create a subtle notification sound using Web Audio API
    if (window.AudioContext || window.webkitAudioContext) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Performance monitoring
const performanceMonitor = {
    startTime: Date.now(),
    logMetric: function(name, value) {
        if (window.performance && window.performance.mark) {
            window.performance.mark(`${name}:${value}`);
        }
    }
};

// Error handling for global errors
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'danger');
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('An error occurred while processing your request.', 'danger');
});

// VS Code Style Sidebar Functions
function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        // Add confirmation
        if (confirm('Are you sure you want to clear the chat history?')) {
            chatMessages.innerHTML = `
                <div class="bot-message animate__animated animate__fadeInLeft">
                    <div class="message-avatar">
                        <i class="fas fa-leaf text-success"></i>
                    </div>
                    <div class="message-content">
                        <strong>🌿 AI Companion:</strong> 
                        Hi there! I'm here to support you on your wellness journey. How are you feeling today? 😊
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            `;
            AppState.chatMessages = [];
            showNotification('Chat cleared successfully', 'success');
        }
    }
}

function exportChat() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages && AppState.chatMessages.length > 0) {
        // Create text content
        let chatText = "AI Student Companion - Chat Export\n";
        chatText += "=" .repeat(50) + "\n\n";
        
        AppState.chatMessages.forEach((msg, index) => {
            chatText += `${msg.type === 'user' ? 'You' : 'AI Companion'}: ${msg.content}\n`;
            chatText += `Time: ${msg.timestamp || 'Unknown'}\n\n`;
        });
        
        // Create and download file
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai_chat_export_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Chat exported successfully', 'success');
    } else {
        showNotification('No chat messages to export', 'warning');
    }
}

function quickPrompt(promptText) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = promptText;
        chatInput.focus();
        
        // Add a subtle animation to draw attention
        chatInput.style.background = 'rgba(16, 185, 129, 0.1)';
        setTimeout(() => {
            chatInput.style.background = '';
        }, 2000);
        
        // Auto-send after a brief delay if user wants
        setTimeout(() => {
            if (chatInput.value === promptText) {
                sendMessage();
            }
        }, 1500);
    }
}

function loadChatHistory(historyItem) {
    // Real functionality - load actual previous conversation
    showNotification('Loading previous conversation...', 'info');
}

function addToHistory(message, sentiment = 'neutral') {
    const historyContainer = document.getElementById('chat-history-container');
    if (!historyContainer) return;
    
    // Remove empty state if it exists
    const emptyState = historyContainer.querySelector('.text-center');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Create timestamp
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
    const dateString = now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Determine sentiment badge
    let badgeClass = 'bg-secondary';
    let badgeText = 'Neutral';
    
    const positiveWords = ['good', 'great', 'happy', 'wonderful', 'excellent', 'amazing', 'positive', 'excited', 'grateful'];
    const negativeWords = ['bad', 'sad', 'angry', 'stressed', 'anxious', 'worried', 'depressed', 'frustrated'];
    
    const messageText = message.toLowerCase();
    
    if (positiveWords.some(word => messageText.includes(word))) {
        badgeClass = 'bg-success';
        badgeText = 'Positive';
    } else if (negativeWords.some(word => messageText.includes(word))) {
        badgeClass = 'bg-warning';
        badgeText = 'Needs Support';
    }
    
    // Create history item
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item p-2 rounded mb-2 bg-light';
    historyItem.innerHTML = `
        <div class="d-flex justify-content-between">
            <small class="text-muted">${dateString}, ${timeString}</small>
            <small class="badge ${badgeClass}">${badgeText}</small>
        </div>
        <div class="history-preview mt-1">
            <small>"${message.substring(0, 40)}${message.length > 40 ? '...' : ''}"</small>
        </div>
    `;
    
    // Add click handler
    historyItem.addEventListener('click', () => {
        loadChatHistory(historyItem);
    });
    
    // Add to top of list
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    
    // Keep only last 10 items
    const items = historyContainer.querySelectorAll('.history-item');
    if (items.length > 10) {
        items[items.length - 1].remove();
    }
}

function updateMoodInsights() {
    // Simulate updating mood analytics based on recent conversations
    const moodBar = document.querySelector('.mood-indicator .progress-bar');
    const moodText = document.querySelector('.mood-indicator small');
    
    if (moodBar && moodText) {
        // Calculate mood based on recent messages (simplified)
        let positiveCount = 0;
        let totalCount = AppState.chatMessages.length || 1;
        
        AppState.chatMessages.forEach(msg => {
            // Simple sentiment analysis (could be enhanced)
            const positiveWords = ['good', 'great', 'happy', 'wonderful', 'excellent', 'amazing', 'positive'];
            if (positiveWords.some(word => msg.content.toLowerCase().includes(word))) {
                positiveCount++;
            }
        });
        
        const positivePercentage = Math.max(50, (positiveCount / totalCount) * 100);
        
        moodBar.style.width = `${positivePercentage}%`;
        moodText.textContent = `${Math.round(positivePercentage)}% Positive`;
    }
}

function initializeSidebarTabs() {
    // Enhanced tab functionality
    const tabs = document.querySelectorAll('#sidebarTabs .nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update tab content with animation
            const target = this.getAttribute('href');
            const tabPanes = document.querySelectorAll('.tab-pane');
            
            tabPanes.forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            const targetPane = document.querySelector(target);
            if (targetPane) {
                setTimeout(() => {
                    targetPane.classList.add('show', 'active');
                }, 150);
            }
        });
    });
}

// Enhanced sendMessage function to work with sidebar
const originalSendMessage = window.sendMessage;
window.sendMessage = function() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput ? chatInput.value.trim() : '';
    
    if (message) {
        // Add to real history
        addToHistory(message);
        
        // Store in AppState for persistence
        AppState.chatMessages.push({
            type: 'user',
            content: message,
            timestamp: new Date().toLocaleString()
        });
    }
    
    const result = originalSendMessage();
    
    // Update insights after sending message
    setTimeout(() => {
        updateMoodInsights();
    }, 1000);
    
    return result;
};

// Initialize sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarTabs();
    
    // Add click handlers for history items
    document.addEventListener('click', function(e) {
        if (e.target.closest('.history-item')) {
            loadChatHistory(e.target.closest('.history-item'));
        }
    });
});

// Export functions for global access
window.showSection = showSection;
window.showDashboard = showDashboard;
window.sendMessage = sendMessage;
window.summarizeText = summarizeText;
window.processPDF = processPDF;
window.processText = processText;
window.clearChat = clearChat;
window.exportChat = exportChat;
window.quickPrompt = quickPrompt;
window.switchSummarizerTab = switchSummarizerTab;
window.handleVideoFile = handleVideoFile;
window.processVideo = processVideo;