// Application State
let appState = {
    currentStep: 1,
    theme: 'light',
    personalDetails: {
        fullName: '',
        age: '',
        contactNumber: '',
        email: '',
        country: 'Pakistan',
        state: '',
        city: ''
    },
    educationDetails: {
        institute: '',
        educationLevel: '',
        isAlumni: '',
        pastPrograms: [],
        source: ''
    },
    emergencyDetails: {
        parentName: '',
        parentContact: '',
        parentEmail: ''
    },
    essays: [
        { text: '', completed: false }, // Q1
        { text: '', completed: false }, // Q2
        { text: '', completed: false }, // Q3
        { text: '', completed: false }, // Q4
        { text: '', completed: false }, // Q5
        { text: '', completed: false }  // Q6 (Comments, optional)
    ],
    planner: {
        commitmentLevel: '8-10 hours/week',
        slots: {} // key format: "day-time" (e.g. "Mon-Morning")
    },
    simulator: {
        fundraising: 36000,
        outreach: 50
    }
};

// Essay Questions Configuration
const essayQuestions = [
    {
        title: "Why do you want to volunteer with Baghbaan?",
        placeholder: "Detail your passion for education and why you want to support TCF's mission...",
        minWords: 50,
        auditKeywords: ["volunteer", "education", "children", "crisis", "out-of-school", "baghbaan", "support", "tcf"],
        tags: [
            { id: "edu-crisis", label: "Address out-of-school crisis", text: "Pakistan faces a critical education emergency with millions of out-of-school children, and I want to play an active part in bringing them into classrooms." },
            { id: "advocacy", label: "Raise awareness & advocacy", text: "I believe that advocacy is key to sparking systemic change, and I want to use my voice to educate my community about the need for quality schooling." },
            { id: "servant-leader", label: "Develop leadership skills", text: "I want to grow as a servant leader, learning how to lead campaigns and mobilize people for a cause larger than myself." },
            { id: "tcf-impact", label: "Contribute to TCF's mission", text: "The Citizens Foundation has a proven track record of delivering quality education in marginalized areas, and I want to support their efforts to scale this impact." }
        ],
        draftTemplate: (selections) => {
            if (selections.length === 0) {
                return "I want to volunteer with the Baghbaan Summer Internship Programme because I am passionate about education and want to make a difference. Pakistan is facing a severe education emergency with over 22 million children out of school. TCF is doing incredible work by building and running schools in under-resourced areas. Through this internship, I hope to act as an ambassador for these children, raise awareness in my social circles, and raise funds to sponsor classrooms, while developing my leadership and communication skills.";
            }
            return `I want to volunteer with the Baghbaan Summer Internship Programme to actively address the educational challenges in our community. ${selections.join(' ')} By participating in BSIP, I want to champion the cause of education and play my part in building a brighter future for the youth of Pakistan.`;
        }
    },
    {
        title: "What skills or talents do you have that could benefit Baghbaan’s mission?",
        placeholder: "Mention skills like public speaking, social media outreach, organizing events, graphic design, writing, etc...",
        minWords: 50,
        auditKeywords: ["skills", "communication", "social media", "public speaking", "organize", "graphic design", "fundraising", "collaboration"],
        tags: [
            { id: "public-speaking", label: "Public Speaking & Communication", text: "I have strong communication skills and feel comfortable presenting ideas in public, which will help me advocate for TCF effectively." },
            { id: "social-media", label: "Social Media Campaigning", text: "I am digitally savvy and experienced with platforms like Instagram, TikTok, and LinkedIn, which I can leverage to run online fundraising drives." },
            { id: "event-mgmt", label: "Event Management & Planning", text: "I have experience organizing school events and community projects, helping me structure local fundraisers and awareness workshops." },
            { id: "creatives", label: "Content Creation / Design", text: "I can design flyers, write blog posts, and create engaging visual content to capture attention and communicate TCF's impact clearly." }
        ],
        draftTemplate: (selections) => {
            if (selections.length === 0) {
                return "I bring a range of skills that align well with the Baghbaan Ambassador role. I have excellent communication skills, which allow me to explain complex issues like the education crisis in a clear and convincing manner. I am also very active on social media and know how to create engaging content, which will help in running digital awareness campaigns. Furthermore, I am collaborative and enjoy organizing group tasks, which is useful for setting up community fundraising events.";
            }
            return `To support Baghbaan’s mission of advocacy and fundraising, I believe my skills can make a valuable contribution. ${selections.join(' ')} These competencies will enable me to represent TCF effectively and engage diverse audiences.`;
        }
    },
    {
        title: "Share a personal experience where you made a positive difference in someone’s life?",
        placeholder: "Describe a time you helped a peer, volunteered, did a good deed, or supported a family member...",
        minWords: 50,
        auditKeywords: ["experience", "helped", "difference", "support", "community", "teach", "mentored", "positive"],
        tags: [
            { id: "peer-tutoring", label: "Peer tutoring / Teaching", text: "I volunteered to tutor a struggling classmate in school, helping them improve their grades and build self-confidence." },
            { id: "donation-drive", label: "Community donation drive", text: "I organized a local drive to collect clothes and textbooks for children in an underprivileged neighborhood near my home." },
            { id: "counseling", label: "Supportive listening", text: "I supported a close friend through a challenging personal period, offering mentorship and encouragement to keep them focused on their goals." },
            { id: "neighborhood", label: "Helping local families", text: "I regularly assist in coordinating food distribution drives in my area, ensuring that vulnerable families receive basic necessities." }
        ],
        draftTemplate: (selections) => {
            if (selections.length === 0) {
                return "A personal experience that stands out was when I helped a junior student at my institute who was struggling with their studies and feeling overwhelmed. I dedicated a few hours every weekend to tutor them in mathematics and science. Beyond academic guidance, I motivated them and helped build their confidence. Over three months, their performance improved significantly, and seeing the relief and happiness on their face, as well as their parents' gratitude, made me realize the profound impact of simple acts of support.";
            }
            return `I have always believed in the power of service, and one key experience reflects this commitment. ${selections.join(' ')} This experience taught me the value of empathy and reinforced my desire to dedicate time to social causes.`;
        }
    },
    {
        title: "If you could design one impactful volunteer activity, what would it be and why?",
        placeholder: "Propose an idea: e.g. a school bake sale, a digital awareness contest, a neighborhood walkathon, etc...",
        minWords: 50,
        auditKeywords: ["activity", "design", "fundraising", "campaign", "awareness", "community", "event", "bake sale", "walkathon"],
        tags: [
            { id: "bake-sale", label: "Charity Bake & Art Sale", text: "I would organize a charity bake and art sale at my school, where students donate baked goods or crafts, with all proceeds going to TCF." },
            { id: "walkathon", label: "Community Awareness Walkathon", text: "I would design a local walkathon to raise awareness about the 22 million out-of-school children, seeking small sponsorships for every kilometer completed." },
            { id: "social-challenge", label: "Viral Social Media Challenge", text: "I would launch a digital 'Education Champion' challenge where participants share stats on education and tag others to donate equivalent to one school day's cost." },
            { id: "pitch-event", label: "Corporate/Family Pitch Event", text: "I would design a mock-pitch evening where youth present TCF’s work to family, neighbors, and local business owners, urging them to sponsor children's education." }
        ],
        draftTemplate: (selections) => {
            if (selections.length === 0) {
                return "If I could design an impactful activity, I would launch a 'Youth for Education' community carnival. The event would combine fun family activities, local food stalls, and an interactive 'Education Tunnel' that exhibits the reality of Pakistan's out-of-school crisis. Admission tickets and stall fees would go directly to TCF. This would create a festive space that brings people together while serving as a powerful platform for advocacy and fundraising.";
            }
            return `If given the opportunity, I would design a custom project to maximize TCF's outreach. ${selections.join(' ')} I believe this approach is highly scalable, engaging, and will directly help raise both funds and awareness in a memorable way.`;
        }
    },
    {
        title: "What motivates you to dedicate your time to social causes like education and community empowerment?",
        placeholder: "Share your core values, belief in equal opportunities, or personal vision for Pakistan...",
        minWords: 50,
        auditKeywords: ["motivation", "values", "equality", "opportunity", "future", "empowerment", "pakistan", "privilege"],
        tags: [
            { id: "privilege-giveback", label: "Giving back from privilege", text: "Recognizing my own educational opportunities makes me feel a responsibility to support children who do not have access to basic schooling." },
            { id: "country-future", label: "Pakistan's development", text: "I believe education is the single most powerful tool for national progress; a country cannot thrive if half of its future generation is illiterate." },
            { id: "equality", label: "Equal opportunities for all", text: "I am motivated by the principle that every child, regardless of their gender or socioeconomic background, deserves a fair chance to learn." },
            { id: "youth-role", label: "Youth empowerment", text: "As young citizens, we have the energy and drive to bring positive change, and I believe we should be active agents in community development." }
        ],
        draftTemplate: (selections) => {
            if (selections.length === 0) {
                return "My motivation stems from the belief that education is the fundamental right of every child and the cornerstone of national development. Growing up with access to quality schooling, I realize the privilege I hold. It pains me to see talented children in our country forced into labor instead of reading books. I want to dedicate my energy to breaking this cycle of poverty and helping build an inclusive Pakistan where every child has the opportunity to unlock their true potential.";
            }
            return `My motivation to work on social causes comes from my core values. ${selections.join(' ')} Contributing to community empowerment gives my actions a sense of purpose and inspires me to continue advocacy work.`;
        }
    },
    {
        title: "Comments (Optional)",
        placeholder: "Any additional details, questions, or comments you would like to share with the TCF Baghbaan team...",
        minWords: 0,
        auditKeywords: ["tcf", "comments", "excited", "thank you", "opportunity"],
        tags: [
            { id: "excited", label: "Express excitement", text: "I am extremely excited about the possibility of joining BSIP 2026 and working alongside other passionate youth." },
            { id: "avail-confirm", label: "Confirm availability", text: "I confirm that I can dedicate the required 8-10 hours per week and look forward to the hybrid events." },
            { id: "thanks", label: "Express gratitude", text: "Thank you for creating this opportunity for students to contribute to educational advocacy in Pakistan." }
        ],
        draftTemplate: (selections) => {
            if (selections.length === 0) {
                return "Thank you for reviewing my application. I am looking forward to participating in the Baghbaan Summer Internship Programme 2026 and contributing to TCF's wonderful mission.";
            }
            return `Additional details: ${selections.join(' ')}`;
        }
    }
];

let activeEssayIndex = 0;
let selectedHelperTags = new Set();

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Load from Local Storage
    loadState();

    // Setup Event Listeners
    setupNavListeners();
    setupThemeToggle();
    setupSimulatorListeners();
    setupResetButton();
    setupEssayListeners();
    
    // Render Dynamics
    renderSimulator();
    renderPlanner();
    renderEssayQuestion();
    updateSidebarIndicators();
    
    // Auto-save form fields on input
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            saveCurrentInputs();
        });
        input.addEventListener('input', () => {
            saveCurrentInputs();
        });
    });
});

// Setup Navigation
function setupNavListeners() {
    document.querySelectorAll('.step-item').forEach(item => {
        item.addEventListener('click', () => {
            const targetStep = parseInt(item.getAttribute('data-step'));
            if (canNavigateTo(targetStep)) {
                navigateToStep(targetStep);
            }
        });
    });
}

function navigateToStep(stepNum) {
    appState.currentStep = stepNum;
    
    // Show active section, hide others
    document.querySelectorAll('.view-section').forEach((section, idx) => {
        if (idx + 1 === stepNum) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    updateSidebarIndicators();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Special renders on step enter
    if (stepNum === 7) {
        renderReviewSection();
        triggerConfetti();
    }
}

function nextStep() {
    if (appState.currentStep < 7) {
        navigateToStep(appState.currentStep + 1);
    }
}

function prevStep() {
    if (appState.currentStep > 1) {
        navigateToStep(appState.currentStep - 1);
    }
}

function canNavigateTo(targetStep) {
    // Basic navigation allowance (allow user to click steps they've already viewed or passed validation for)
    if (targetStep < appState.currentStep) return true;
    
    // Check validation of preceding steps
    for (let step = 1; step < targetStep; step++) {
        if (!validateStep(step, false)) {
            return false;
        }
    }
    return true;
}

function validateStep(stepNum, showErrors = true) {
    if (stepNum === 1) return true; // Welcome & Overview
    
    if (stepNum === 2) { // Profile Form
        const form = document.getElementById('profile-form');
        const ageInput = document.getElementById('age');
        const age = parseInt(ageInput.value);
        const ageError = document.getElementById('age-error');
        
        if (age < 15 || age > 25) {
            if (showErrors) {
                ageInput.classList.add('error');
                ageError.style.display = 'block';
            }
            return false;
        } else {
            ageInput.classList.remove('error');
            ageError.style.display = 'none';
        }
        
        return form.checkValidity();
    }
    
    if (stepNum === 3) { // Education Form
        const form = document.getElementById('education-form');
        return form.checkValidity();
    }
    
    if (stepNum === 4) { // Emergency Form
        const form = document.getElementById('emergency-form');
        return form.checkValidity();
    }

    if (stepNum === 5) { // Essays
        // Validate at least essays 1-5 have text and meet minimum word count
        for (let i = 0; i < 5; i++) {
            const text = appState.essays[i].text.trim();
            const words = text ? text.split(/\s+/).length : 0;
            if (words < essayQuestions[i].minWords) {
                return false;
            }
        }
        return true;
    }

    if (stepNum === 6) { // Planner
        // Must select at least 8 hours (4 cells, since each cell represents 2 hours)
        const scheduledSlots = Object.values(appState.planner.slots).filter(v => v === true).length;
        const totalHours = scheduledSlots * 2;
        return totalHours >= 8;
    }

    return true;
}

function validateAndNext(formId) {
    const form = document.getElementById(formId);
    
    // Find step number from form ID
    let stepNum = 2;
    if (formId === 'education-form') stepNum = 3;
    if (formId === 'emergency-form') stepNum = 4;

    if (validateStep(stepNum, true)) {
        saveCurrentInputs();
        nextStep();
    } else {
        form.reportValidity();
    }
}

function validateEssaysAndNext() {
    // Save current essay text area first
    saveEssayText();

    let allValid = true;
    for (let i = 0; i < 5; i++) {
        const text = appState.essays[i].text.trim();
        const words = text ? text.split(/\s+/).length : 0;
        if (words < essayQuestions[i].minWords) {
            allValid = false;
            // Switch to the invalid essay
            activeEssayIndex = i;
            renderEssayQuestion();
            alert(`Please write at least ${essayQuestions[i].minWords} words for Essay ${i + 1}: "${essayQuestions[i].title}"`);
            break;
        }
    }

    if (allValid) {
        nextStep();
    }
}

function validatePlannerAndNext() {
    if (validateStep(6, true)) {
        nextStep();
    } else {
        alert("Please map out at least 8 hours in your weekly availability planner to demonstrate commitment.");
    }
}

function updateSidebarIndicators() {
    document.querySelectorAll('.step-item').forEach(item => {
        const step = parseInt(item.getAttribute('data-step'));
        item.classList.remove('active', 'completed');
        
        if (step === appState.currentStep) {
            item.classList.add('active');
        } else if (step < appState.currentStep) {
            item.classList.add('completed');
        }
    });
}

// Setup Theme Toggle
function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        root.setAttribute('data-theme', newTheme);
        appState.theme = newTheme;
        
        const icon = themeBtn.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
        
        saveState();
    });
}

// Setup Simulator
function setupSimulatorListeners() {
    const fundSlider = document.getElementById('fund-slider');
    const outreachSlider = document.getElementById('outreach-slider');

    fundSlider.addEventListener('input', (e) => {
        appState.simulator.fundraising = parseInt(e.target.value);
        renderSimulator();
        saveState();
    });

    outreachSlider.addEventListener('input', (e) => {
        appState.simulator.outreach = parseInt(e.target.value);
        renderSimulator();
        saveState();
    });
}

function renderSimulator() {
    const fundSlider = document.getElementById('fund-slider');
    const outreachSlider = document.getElementById('outreach-slider');
    const fundVal = document.getElementById('fund-val');
    const outreachVal = document.getElementById('outreach-val');

    const fund = appState.simulator.fundraising;
    const outreach = appState.simulator.outreach;

    // Set slider positions just in case
    fundSlider.value = fund;
    outreachSlider.value = outreach;

    // Format display labels
    fundVal.innerText = `PKR ${fund.toLocaleString()}`;
    outreachVal.innerText = `${outreach} Families`;

    // Perform calculations
    // Cost per child for 1 year is ~PKR 36,000. So PKR 3,000 per month
    const children = Math.floor(fund / 36000);
    const months = Math.round((fund % 36000) / 3000) + (children * 12);
    
    document.getElementById('impact-children').innerText = children;
    document.getElementById('impact-months').innerText = months;

    // Ambassador levels
    let badgeText = `<i class="fa-solid fa-award"></i> Bronze Ambassador`;
    let badgeColor = "#b45309"; // bronze/brownish
    
    if (outreach >= 400 && fund >= 324000) {
        badgeText = `<i class="fa-solid fa-crown"></i> TCF Champion`;
        badgeColor = "#017A3E"; // TCF green
    } else if (outreach >= 250 && fund >= 216000) {
        badgeText = `<i class="fa-solid fa-gem"></i> Platinum Ambassador`;
        badgeColor = "#0284c7"; // light blue
    } else if (outreach >= 100 && fund >= 108000) {
        badgeText = `<i class="fa-solid fa-medal"></i> Gold Ambassador`;
        badgeColor = "#C68E05"; // gold
    } else if (outreach >= 20 || fund >= 36000) {
        badgeText = `<i class="fa-solid fa-award"></i> Silver Ambassador`;
        badgeColor = "#64748b"; // silver/gray
    }

    const badgeElem = document.getElementById('impact-badge');
    badgeElem.innerHTML = badgeText;
    badgeElem.style.color = badgeColor;
}

// Setup Reset Button
function setupResetButton() {
    document.getElementById('reset-btn').addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all drafts? This cannot be undone.")) {
            localStorage.removeItem('tcf_baghbaan_state');
            location.reload();
        }
    });
}

// Setup Essays
function setupEssayListeners() {
    const tabs = document.querySelectorAll('.q-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Save current text area first
            saveEssayText();
            
            // Switch tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            activeEssayIndex = parseInt(tab.getAttribute('data-q'));
            selectedHelperTags.clear();
            renderEssayQuestion();
        });
    });
}

function renderEssayQuestion() {
    const question = essayQuestions[activeEssayIndex];
    document.getElementById('essay-question-title').innerText = `${activeEssayIndex + 1}. ${question.title}`;
    
    const textarea = document.getElementById('essay-textarea');
    textarea.value = appState.essays[activeEssayIndex].text;
    textarea.placeholder = question.placeholder;
    
    // Render Helper Tags
    const helperTagsList = document.getElementById('helper-tags');
    helperTagsList.innerHTML = '';
    
    question.tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'keyword-tag';
        btn.innerText = tag.label;
        btn.addEventListener('click', () => {
            if (selectedHelperTags.has(tag.text)) {
                selectedHelperTags.delete(tag.text);
                btn.classList.remove('active');
            } else {
                selectedHelperTags.add(tag.text);
                btn.classList.add('active');
            }
        });
        helperTagsList.appendChild(btn);
    });

    // Audit initial text
    auditEssayText();
}

function saveEssayText() {
    const text = document.getElementById('essay-textarea').value;
    appState.essays[activeEssayIndex].text = text;
    
    // Update question tab style if completed
    const qNavTabs = document.querySelectorAll('.q-tab');
    const tab = qNavTabs[activeEssayIndex];
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    if (words >= essayQuestions[activeEssayIndex].minWords) {
        appState.essays[activeEssayIndex].completed = true;
        tab.classList.add('completed');
    } else {
        appState.essays[activeEssayIndex].completed = false;
        tab.classList.remove('completed');
    }

    saveState();
}

function auditEssayText() {
    const text = document.getElementById('essay-textarea').value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const question = essayQuestions[activeEssayIndex];
    
    document.getElementById('word-count').innerText = `Words: ${words} | Recommended: ${question.minWords || 50}-250 words`;

    // Render keyword audit tags
    const auditTagsList = document.getElementById('audit-tags');
    auditTagsList.innerHTML = '';
    
    question.auditKeywords.forEach(kw => {
        const span = document.createElement('span');
        span.className = 'keyword-tag';
        span.innerText = kw;
        
        // Check if keyword exists in text (case insensitive)
        const regex = new RegExp(`\\b${kw}\\w*\\b`, 'i');
        if (regex.test(text)) {
            span.classList.add('found');
        }
        auditTagsList.appendChild(span);
    });

    // Update live status label
    const statusElem = document.getElementById('essay-validation-status');
    if (words === 0) {
        statusElem.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Empty response`;
        statusElem.style.color = '#ef4444';
    } else if (words < question.minWords) {
        statusElem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Too short (${words}/${question.minWords} words)`;
        statusElem.style.color = '#eab308';
    } else {
        statusElem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Complete`;
        statusElem.style.color = 'var(--tcf-green-light)';
    }
}

function generateDraft() {
    const question = essayQuestions[activeEssayIndex];
    const selections = Array.from(selectedHelperTags);
    const draftText = question.draftTemplate(selections);
    
    const textarea = document.getElementById('essay-textarea');
    textarea.value = draftText;
    
    // Save draft and update calculations
    saveEssayText();
    auditEssayText();
}

// Setup Planner
function renderPlanner() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const times = ['Morning', 'Afternoon', 'Evening'];
    const plannerContainer = document.getElementById('planner-container');

    // Remove dynamic cells first, keeping headers
    const cells = plannerContainer.querySelectorAll('.planner-cell, .planner-time-label');
    cells.forEach(c => c.remove());

    times.forEach(time => {
        // Label cell
        const labelCell = document.createElement('div');
        labelCell.className = 'planner-time-label';
        labelCell.innerText = time;
        plannerContainer.appendChild(labelCell);

        days.forEach(day => {
            const key = `${day}-${time}`;
            const cell = document.createElement('div');
            cell.className = 'planner-cell';
            cell.setAttribute('data-slot', key);
            
            if (appState.planner.slots[key]) {
                cell.classList.add('active');
            }

            cell.addEventListener('click', () => {
                const isActive = cell.classList.contains('active');
                if (isActive) {
                    cell.classList.remove('active');
                    appState.planner.slots[key] = false;
                } else {
                    cell.classList.add('active');
                    appState.planner.slots[key] = true;
                }
                updatePlannerStats();
                saveState();
            });

            plannerContainer.appendChild(cell);
        });
    });

    updatePlannerStats();
}

function updatePlannerStats() {
    const activeSlots = Object.values(appState.planner.slots).filter(v => v === true).length;
    // Assume each study/work-free block is 2 hours of volunteering
    const totalHours = activeSlots * 2;
    
    document.getElementById('scheduled-hours-count').innerText = totalHours;
    
    const feedbackElem = document.getElementById('planner-feedback');
    if (totalHours < 8) {
        feedbackElem.innerHTML = `<i class="fa-solid fa-circle-exmark"></i> Please select at least 8 hours (current: ${totalHours}h)`;
        feedbackElem.style.color = '#ef4444';
    } else if (totalHours > 12) {
        feedbackElem.innerHTML = `<i class="fa-solid fa-circle-check"></i> High Commitment Plan (${totalHours}h)`;
        feedbackElem.style.color = '#0284c7';
    } else {
        feedbackElem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Target met! (${totalHours}h)`;
        feedbackElem.style.color = 'var(--tcf-green-light)';
    }
}

function saveTimeCommitment() {
    appState.planner.commitmentLevel = document.getElementById('hours-select').value;
    saveState();
}

function toggleNonePrograms(noneCheckbox) {
    const checkboxes = document.getElementsByName('past-programs');
    if (noneCheckbox.checked) {
        checkboxes.forEach(cb => {
            if (cb.value !== 'None') {
                cb.checked = false;
                cb.disabled = true;
            }
        });
    } else {
        checkboxes.forEach(cb => {
            cb.disabled = false;
        });
    }
    saveCurrentInputs();
}

// Save & Load State
function saveCurrentInputs() {
    // Save Personal Profile
    appState.personalDetails.fullName = document.getElementById('full-name').value;
    appState.personalDetails.age = document.getElementById('age').value;
    appState.personalDetails.contactNumber = document.getElementById('contact-number').value;
    appState.personalDetails.email = document.getElementById('email').value;
    appState.personalDetails.country = document.getElementById('country').value;
    appState.personalDetails.state = document.getElementById('state').value;
    appState.personalDetails.city = document.getElementById('city').value;

    // Save Education
    appState.educationDetails.institute = document.getElementById('institute').value;
    appState.educationDetails.educationLevel = document.getElementById('education-level').value;
    
    const alumniChecked = document.querySelector('input[name="alumni"]:checked');
    appState.educationDetails.isAlumni = alumniChecked ? alumniChecked.value : '';

    const sourceChecked = document.querySelector('input[name="source"]:checked');
    appState.educationDetails.source = sourceChecked ? sourceChecked.value : '';

    const programs = [];
    document.querySelectorAll('input[name="past-programs"]:checked').forEach(cb => {
        programs.push(cb.value);
    });
    appState.educationDetails.pastPrograms = programs;

    // Save Emergency Contact
    appState.emergencyDetails.parentName = document.getElementById('parent-name').value;
    appState.emergencyDetails.parentContact = document.getElementById('parent-contact').value;
    appState.emergencyDetails.parentEmail = document.getElementById('parent-email').value;

    saveState();
}

function saveState() {
    localStorage.setItem('tcf_baghbaan_state', JSON.stringify(appState));
    
    // Animate save state
    const saveStatusText = document.getElementById('save-status-text');
    saveStatusText.innerText = "Draft saved locally";
}

function loadState() {
    const saved = localStorage.getItem('tcf_baghbaan_state');
    if (saved) {
        try {
            appState = JSON.parse(saved);
            
            // Populate Personal Profile fields
            document.getElementById('full-name').value = appState.personalDetails.fullName || '';
            document.getElementById('age').value = appState.personalDetails.age || '';
            document.getElementById('contact-number').value = appState.personalDetails.contactNumber || '';
            document.getElementById('email').value = appState.personalDetails.email || '';
            document.getElementById('country').value = appState.personalDetails.country || 'Pakistan';
            document.getElementById('state').value = appState.personalDetails.state || '';
            document.getElementById('city').value = appState.personalDetails.city || '';

            // Populate Education fields
            document.getElementById('institute').value = appState.educationDetails.institute || '';
            document.getElementById('education-level').value = appState.educationDetails.educationLevel || '';
            
            if (appState.educationDetails.isAlumni) {
                const el = document.getElementById(`alumni-${appState.educationDetails.isAlumni.toLowerCase()}`);
                if (el) el.checked = true;
            }

            if (appState.educationDetails.source) {
                const radioValue = appState.educationDetails.source;
                const radios = document.getElementsByName('source');
                radios.forEach(r => {
                    if (r.value === radioValue) r.checked = true;
                });
            }

            // Program checkboxes
            const checkboxes = document.getElementsByName('past-programs');
            const pastProgSet = new Set(appState.educationDetails.pastPrograms || []);
            checkboxes.forEach(cb => {
                if (pastProgSet.has(cb.value)) {
                    cb.checked = true;
                }
            });
            const noneCheckbox = document.getElementById('prog-none');
            if (noneCheckbox && noneCheckbox.checked) {
                toggleNonePrograms(noneCheckbox);
            }

            // Populate Emergency Contacts
            document.getElementById('parent-name').value = appState.emergencyDetails.parentName || '';
            document.getElementById('parent-contact').value = appState.emergencyDetails.parentContact || '';
            document.getElementById('parent-email').value = appState.emergencyDetails.parentEmail || '';

            // Weekly commitment selector
            if (appState.planner.commitmentLevel) {
                document.getElementById('hours-select').value = appState.planner.commitmentLevel;
            }

            // Load theme
            if (appState.theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                const themeBtn = document.getElementById('theme-toggle');
                themeBtn.querySelector('i').className = 'fa-solid fa-sun';
            }

        } catch (e) {
            console.error("Failed to parse local storage state, starting fresh", e);
        }
    }
}

// Compile and Render Review Section
function renderReviewSection() {
    // 1. Personal & Education Grid
    const personalGrid = document.getElementById('personal-summary-content');
    
    const pDetails = [
        { label: "Full Name", value: appState.personalDetails.fullName || "—" },
        { label: "Age", value: appState.personalDetails.age || "—" },
        { label: "Contact Number", value: appState.personalDetails.contactNumber || "—" },
        { label: "Email Address", value: appState.personalDetails.email || "—" },
        { label: "City & Province", value: `${appState.personalDetails.city || "—"}, ${appState.personalDetails.state || "—"}` },
        { label: "Current Institute", value: appState.educationDetails.institute || "—" },
        { label: "Current Education", value: appState.educationDetails.educationLevel || "—" },
        { label: "TCF Alumni?", value: appState.educationDetails.isAlumni || "—" },
        { label: "Source Info", value: appState.educationDetails.source || "—" }
    ];

    personalGrid.innerHTML = pDetails.map(d => `
        <div class="review-cell">
            <div class="review-cell-label">${d.label}</div>
            <div class="review-cell-value">${d.value}</div>
        </div>
    `).join('');

    // 2. Essays Summary
    const essaySummary = document.getElementById('essay-summary-content');
    essaySummary.innerHTML = essayQuestions.map((q, idx) => {
        const text = appState.essays[idx].text.trim() || "*No response written yet*";
        return `
            <div class="review-essay-block">
                <div class="review-essay-q">${idx + 1}. ${q.title}</div>
                <div class="review-essay-a">${text}</div>
            </div>
        `;
    }).join('');

    // 3. Commitment Planner Summary
    const plannerGrid = document.getElementById('planner-summary-content');
    const scheduledHours = Object.values(appState.planner.slots).filter(v => v === true).length * 2;
    
    // Collect active days/slots
    const activeSlotsList = [];
    Object.entries(appState.planner.slots).forEach(([key, val]) => {
        if (val) activeSlotsList.push(key.replace('-', ' '));
    });

    const plannerDetails = [
        { label: "Commitment Target", value: appState.planner.commitmentLevel || "—" },
        { label: "Mapped Availability Hours", value: `${scheduledHours} hours/week` },
        { label: "Emergency Parent Contact", value: `${appState.emergencyDetails.parentName || "—"} (${appState.emergencyDetails.parentContact || "—"})` }
    ];

    plannerGrid.innerHTML = plannerDetails.map(d => `
        <div class="review-cell">
            <div class="review-cell-label">${d.label}</div>
            <div class="review-cell-value">${d.value}</div>
        </div>
    `).join('');
}

// Copy utilities
function copySectionText(elementId, btn) {
    const elem = document.getElementById(elementId);
    let text = "";
    
    if (elementId === 'personal-summary-content' || elementId === 'planner-summary-content') {
        const cells = elem.querySelectorAll('.review-cell');
        cells.forEach(c => {
            const lbl = c.querySelector('.review-cell-label').innerText;
            const val = c.querySelector('.review-cell-value').innerText;
            text += `${lbl}: ${val}\n`;
        });
    } else if (elementId === 'essay-summary-content') {
        const blocks = elem.querySelectorAll('.review-essay-block');
        blocks.forEach(b => {
            const q = b.querySelector('.review-essay-q').innerText;
            const a = b.querySelector('.review-essay-a').innerText;
            text += `\n=== ${q} ===\n${a}\n`;
        });
    }

    navigator.clipboard.writeText(text.trim()).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

function exportMarkdown() {
    let md = `# TCF Baghbaan Summer Internship 2026 - Application Portfolio\n\n`;
    
    md += `## 1. Personal & Contact Details\n`;
    md += `- **Full Name**: ${appState.personalDetails.fullName || "N/A"}\n`;
    md += `- **Age**: ${appState.personalDetails.age || "N/A"}\n`;
    md += `- **Contact**: ${appState.personalDetails.contactNumber || "N/A"}\n`;
    md += `- **Email**: ${appState.personalDetails.email || "N/A"}\n`;
    md += `- **Country**: ${appState.personalDetails.country || "N/A"}\n`;
    md += `- **State/Province**: ${appState.personalDetails.state || "N/A"}\n`;
    md += `- **City/Area**: ${appState.personalDetails.city || "N/A"}\n\n`;

    md += `## 2. Academic & Experience\n`;
    md += `- **Institute**: ${appState.educationDetails.institute || "N/A"}\n`;
    md += `- **Education Level**: ${appState.educationDetails.educationLevel || "N/A"}\n`;
    md += `- **TCF Alumni**: ${appState.educationDetails.isAlumni || "N/A"}\n`;
    md += `- **Past TCF Programs**: ${appState.educationDetails.pastPrograms.join(', ') || "None"}\n`;
    md += `- **Referred via**: ${appState.educationDetails.source || "N/A"}\n\n`;

    md += `## 3. Emergency Contact\n`;
    md += `- **Parent/Guardian Name**: ${appState.emergencyDetails.parentName || "N/A"}\n`;
    md += `- **Parent Contact**: ${appState.emergencyDetails.parentContact || "N/A"}\n`;
    md += `- **Parent Email**: ${appState.emergencyDetails.parentEmail || "N/A"}\n\n`;

    md += `## 4. Volunteer Engagement Essays\n\n`;
    essayQuestions.forEach((q, idx) => {
        md += `### ${idx + 1}. ${q.title}\n`;
        md += `${appState.essays[idx].text.trim() || "*No response written yet*"}\n\n`;
    });

    md += `## 5. Availability Schedule\n`;
    md += `- **General Commitment**: ${appState.planner.commitmentLevel || "N/A"}\n`;
    
    const activeSlots = [];
    Object.entries(appState.planner.slots).forEach(([key, val]) => {
        if (val) activeSlots.push(key);
    });
    md += `- **Mapped Slots**: ${activeSlots.join(', ') || "No specific slots mapped"}\n`;

    navigator.clipboard.writeText(md).then(() => {
        alert("Full application copied in Markdown format! You can save this to a text file or paste it directly.");
    });
}

// Spark confetti on completion
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
