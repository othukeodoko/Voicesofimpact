// VOI Landing Page JavaScript with Supabase Integration

// ===================================
// Supabase Configuration
// ===================================
// IMPORTANT: Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://eukcscjfsvthfjqqynlv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1a2NzY2pmc3Z0aGZqcXF5bmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMTM0OTIsImV4cCI6MjA4Mzg4OTQ5Mn0.u4WuLqKhYr87plLJygvXezeq6ACtvlICcfqmnHZFC9M';

// Initialize Supabase client
let supabaseClient;
try
{
    // The global 'supabase' object comes from the CDN script
    // We create our client instance
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error)
{
    console.error('Supabase initialization error:', error);
}

// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener('scroll', () =>
{
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50)
    {
        navbar.classList.add('scrolled');
    } else
    {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () =>
{
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link =>
{
    link.addEventListener('click', () =>
    {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000)
{
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() =>
    {
        start += increment;
        if (start >= target)
        {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else
        {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) =>
{
    entries.forEach(entry =>
    {
        if (entry.isIntersecting)
        {
            const statNumber = entry.target;
            const target = parseInt(statNumber.getAttribute('data-count'));
            animateCounter(statNumber, target);
            statsObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat =>
{
    statsObserver.observe(stat);
});

// ===================================
// Multiplication Tree Generation
// ===================================
function createMultiplicationTree()
{
    const container = document.getElementById('multiplicationTree');
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Generation 1 (base)
    createNode(container, width / 2, height - 50, 40, 1);

    // Generation 2 (3 nodes)
    const gen2Y = height - 150;
    for (let i = 0; i < 3; i++)
    {
        const x = (width / 4) + (i * width / 4);
        createNode(container, x, gen2Y, 35, 2);
        createLine(container, width / 2, height - 50, x, gen2Y);
    }

    // Generation 3 (9 nodes)
    const gen3Y = height - 250;
    for (let i = 0; i < 9; i++)
    {
        const x = (width / 10) + (i * width / 10);
        createNode(container, x, gen3Y, 28, 3);
        const parentX = (width / 4) + (Math.floor(i / 3) * width / 4);
        createLine(container, parentX, gen2Y, x, gen3Y);
    }

    // Generation 4 (fade nodes)
    const gen4Y = height - 350;
    for (let i = 0; i < 15; i++)
    {
        const x = (width / 16) + (i * width / 16);
        createNode(container, x, gen4Y, 20, 4);
    }
}

function createNode(container, x, y, size, generation)
{
    const node = document.createElement('div');
    node.className = 'tree-node';
    node.style.left = `${x - size / 2}px`;
    node.style.top = `${y - size / 2}px`;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.animationDelay = `${generation * 0.2}s`;
    node.style.opacity = generation === 4 ? '0.4' : '1';
    container.appendChild(node);
}

function createLine(container, x1, y1, x2, y2)
{
    const line = document.createElement('div');
    line.className = 'tree-line';

    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;

    container.appendChild(line);
}

// Initialize tree on load and resize
window.addEventListener('load', createMultiplicationTree);
window.addEventListener('resize', () =>
{
    const container = document.getElementById('multiplicationTree');
    if (container)
    {
        container.innerHTML = '';
        createMultiplicationTree();
    }
});

// ===================================
// FAQ Accordion
// ===================================
document.querySelectorAll('.faq-item').forEach(item =>
{
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () =>
    {
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem =>
        {
            otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive)
        {
            item.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll with Offset
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor =>
{
    anchor.addEventListener('click', function (e)
    {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target)
        {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Timeline Animation on Scroll
// ===================================
const timelineObserver = new IntersectionObserver((entries) =>
{
    entries.forEach(entry =>
    {
        if (entry.isIntersecting)
        {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.timeline-item').forEach((item, index) =>
{
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    timelineObserver.observe(item);
});

// ===================================
// Form Handling with Supabase
// ===================================
const applicationForm = document.getElementById('applicationForm');

applicationForm.addEventListener('submit', async (e) =>
{
    e.preventDefault();

    // Get form data
    const formData = new FormData(applicationForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        why: formData.get('why'),
        commitment: formData.get('commitment'),
        agree: formData.get('agree') ? true : false,
        submitted_at: new Date().toISOString()
    };

    // Validate
    if (!data.name || !data.email || !data.phone || !data.why || !data.commitment)
    {
        alert('Please fill in all required fields.');
        return;
    }

    if (!data.agree)
    {
        alert('Please agree to the commitment statement.');
        return;
    }

    // Show loading state
    const submitBtn = applicationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try
    {
        // Check if Supabase is configured
        if (!supabaseClient || SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL')
        {
            throw new Error('Supabase not configured. Please add your credentials in script.js');
        }

        // Insert data into Supabase
        const { data: insertedData, error } = await supabaseClient
            .from('voi_applications')
            .insert([data])
            .select();

        if (error)
        {
            throw error;
        }

        console.log('Application submitted successfully:', insertedData);

        // Show success modal
        showModal();

        // Reset form
        applicationForm.reset();

        // Optional: Send confirmation email via Supabase Edge Function
        // await sendConfirmationEmail(data.email, data.name);

    } catch (error)
    {
        console.error('Form submission error:', error);

        // User-friendly error messages
        let errorMessage = 'There was an error submitting your application. ';

        if (error.message.includes('not configured'))
        {
            errorMessage += 'The database is not configured yet. Please contact the administrator.';
        } else if (error.message.includes('duplicate'))
        {
            errorMessage += 'You have already submitted an application with this email.';
        } else
        {
            errorMessage += 'Please try again or contact us directly at hello@voiceofimpact.org';
        }

        alert(errorMessage);
    } finally
    {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ===================================
// Modal Functions
// ===================================
function showModal()
{
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal()
{
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', (e) =>
{
    if (e.target.id === 'successModal')
    {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) =>
{
    if (e.key === 'Escape')
    {
        closeModal();
    }
});

// ===================================
// Parallax Effect for Hero Background
// ===================================
window.addEventListener('scroll', () =>
{
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground)
    {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Lazy Loading for Performance
// ===================================
if ('IntersectionObserver' in window)
{
    const lazyObserver = new IntersectionObserver((entries) =>
    {
        entries.forEach(entry =>
        {
            if (entry.isIntersecting)
            {
                entry.target.classList.add('visible');
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.problem-card, .testimonial-card, .feature').forEach(el =>
    {
        lazyObserver.observe(el);
    });
}

// ===================================
// Add Animation Classes on Scroll
// ===================================
const animateOnScroll = new IntersectionObserver((entries) =>
{
    entries.forEach(entry =>
    {
        if (entry.isIntersecting)
        {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.section-header, .math-visual, .pcs-model').forEach(el =>
{
    animateOnScroll.observe(el);
});

// ===================================
// Confetti Effect for Modal
// ===================================
function createConfetti()
{
    const colors = ['#f4c542', '#ffd966', '#c9a335', '#ffffff'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++)
    {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '3000';

        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 100;

        confetti.animate([
            { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Trigger confetti when modal opens
const originalShowModal = showModal;
showModal = function ()
{
    originalShowModal();
    createConfetti();
};

// ===================================
// Email Validation
// ===================================
function validateEmail(email)
{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('email').addEventListener('blur', function ()
{
    if (this.value && !validateEmail(this.value))
    {
        this.style.borderColor = '#e74c3c';
        this.setCustomValidity('Please enter a valid email address');
    } else
    {
        this.style.borderColor = '#ddd';
        this.setCustomValidity('');
    }
});

// ===================================
// Phone Number Formatting
// ===================================
document.getElementById('phone').addEventListener('input', function (e)
{
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('234') && value.length > 0)
    {
        if (value.startsWith('0'))
        {
            value = '234' + value.substring(1);
        } else
        {
            value = '234' + value;
        }
    }
    e.target.value = '+' + value;
});

// ===================================
// Progress Indicator
// ===================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #f4c542, #ffd966);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () =>
{
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ===================================
// Testimonial Card Hover Effect
// ===================================
document.querySelectorAll('.testimonial-card').forEach(card =>
{
    card.addEventListener('mouseenter', function ()
    {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function ()
    {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Copy URL to Clipboard
// ===================================
function copyToClipboard(text)
{
    if (navigator.clipboard)
    {
        navigator.clipboard.writeText(text).then(() =>
        {
            showNotification('Link copied to clipboard!');
        });
    }
}

function showNotification(message)
{
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #f4c542;
        color: #1a1f3a;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() =>
    {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🌟 VOI - Voice of Impact 🌟', 'font-size: 24px; color: #f4c542; font-weight: bold;');
console.log('%cFrom one voice to 10,000 lives', 'font-size: 16px; color: #1a1f3a;');
console.log('%cInterested in the code? We love developers! Apply to VOI and multiply your impact! 🚀', 'font-size: 12px; color: #666;');

// ===================================
// Performance Monitoring
// ===================================
window.addEventListener('load', () =>
{
    if ('performance' in window)
    {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ===================================
// Prevent Form Resubmission on Refresh
// ===================================
if (window.history.replaceState)
{
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () =>
{
    console.log('VOI Landing Page Initialized with Supabase');

    // Check Supabase configuration
    if (!supabaseClient || SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL')
    {
        console.warn('⚠️ Supabase not configured. Please add your credentials in script.js');
    } else
    {
        console.log('✅ Supabase connected successfully');
    }

    // Add any initialization code here
    createMultiplicationTree();

    // Smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #f4c542;
        color: #1a1f3a;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () =>
    {
        if (window.pageYOffset > 300)
        {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else
        {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () =>
    {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});