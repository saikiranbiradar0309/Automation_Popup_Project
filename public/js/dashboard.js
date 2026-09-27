// ==========================================
// AUTOMATIONLAB — DASHBOARD JAVASCRIPT
// ==========================================


// ==========================================
// AUTH CHECK & USER INFO
// ==========================================

async function initDashboard() {
    try {
        const res  = await fetch('/api/me');
        const data = await res.json();

        if (!data.success) {
            window.location.href = '/login';
            return;
        }

        const user = data.user;
        document.getElementById('userName').textContent   = user.name;
        document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
        document.getElementById('welcomeMsg').textContent =
            `Welcome back, ${user.name}! Select a module from the sidebar to start practising.`;

        // Check URL param for module, default to 'welcome'
        const params = new URLSearchParams(window.location.search);
        const mod    = params.get('module') || 'welcome';
        switchPanel(mod);

    } catch (e) {
        window.location.href = '/login';
    }
}

initDashboard();


// ==========================================
// LOGOUT
// ==========================================

document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/';
    } catch (e) {
        window.location.href = '/';
    }
});


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

const moduleLabels = {
    welcome:    'Practice Dashboard',
    popups:     'Popups & Alerts',
    calendar:   'Calendar',
    checkboxes: 'Checkboxes',
    inputs:     'Input & Radio',
    dropdown:   'Dropdowns',
    frames:     'Frames',
    upload:     'File Upload',
    about:      'About'
};

function switchPanel(panelId) {

    // Update sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.toggle('active', item.dataset.panel === panelId);
    });

    // Hide ALL panels first
    document.querySelectorAll('.module-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });

    // Show target panel explicitly
    const targetPanel = document.getElementById('panel-' + panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
    }

    // Scroll main content area back to top
    const mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.scrollTop = 0;

    // Update nav label
    document.getElementById('activeModuleLabel').textContent =
        moduleLabels[panelId] || panelId;

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('module', panelId);
    window.history.replaceState({}, '', url);
}

// Sidebar click listeners
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        const panel = item.dataset.panel;
        if (panel) switchPanel(panel);
    });
});


// ==========================================
// HELPER: Show/hide result box
// ==========================================

function showResult(id, content, isError = false) {
    const el = document.getElementById(id);
    el.textContent  = content;
    el.style.color  = isError ? '#fda4af' : '#7dd3fc';
    el.classList.add('visible');
}


// ==========================================
// ① POPUPS & ALERTS
// ==========================================

// Simple Alert
document.getElementById('triggerAlert').addEventListener('click', () => {
    alert('🔔 This is a simple browser alert!\nUse driver.switchTo().alert().accept() in Selenium.');
    showResult('alertResult', '✅ Alert was accepted.');
});

// Confirm Dialog
document.getElementById('triggerConfirm').addEventListener('click', () => {
    const result = confirm('❓ Are you sure you want to proceed?\n\nThis is a browser confirm dialog.');
    showResult('alertResult', result
        ? '✅ Confirm: User clicked OK (true)'
        : '❌ Confirm: User clicked Cancel (false)'
    );
});

// Prompt Dialog
document.getElementById('triggerPrompt').addEventListener('click', () => {
    const val = prompt('📝 Enter your automation tool name:\n\n(This is a browser prompt dialog)', 'Selenium');
    if (val === null) {
        showResult('alertResult', '❌ Prompt: User cancelled (null)');
    } else {
        showResult('alertResult', `✅ Prompt: User entered → "${val}"`);
    }
});

// Modal helpers
function openModal(id)  { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// Success Modal
document.getElementById('openSuccessModal').addEventListener('click', () => openModal('successModal'));
document.getElementById('closeSuccessModal').addEventListener('click', () => closeModal('successModal'));
document.getElementById('confirmSuccess').addEventListener('click', () => {
    closeModal('successModal');
    showToast('Success modal closed!', 'success');
});

// Error Modal
document.getElementById('openErrorModal').addEventListener('click', () => openModal('errorModal'));
document.getElementById('closeErrorModal').addEventListener('click', () => closeModal('errorModal'));
document.getElementById('dismissError').addEventListener('click', () => closeModal('errorModal'));
document.getElementById('retryError').addEventListener('click', () => {
    closeModal('errorModal');
    showToast('Retry action triggered!', 'warning');
});

// Timed Modal
document.getElementById('openTimedModal').addEventListener('click', () => {
    setTimeout(() => {
        openModal('timedModal');
        let count = 5;
        document.getElementById('timedModalCountdown').textContent = count;
        const timer = setInterval(() => {
            count--;
            const el = document.getElementById('timedModalCountdown');
            if (el) el.textContent = count;
            if (count <= 0) {
                clearInterval(timer);
                closeModal('timedModal');
                showToast('Timed popup auto-closed!', 'info');
            }
        }, 1000);
    }, 3000);
    showToast('Popup will appear in 3 seconds…', 'info');
});
document.getElementById('closeTimedModal').addEventListener('click', () => closeModal('timedModal'));

// Nested Modal
document.getElementById('openNestedModal').addEventListener('click', () => openModal('nestedModal1'));
document.getElementById('closeNestedModal1').addEventListener('click', () => closeModal('nestedModal1'));
document.getElementById('openNestedStep2').addEventListener('click', () => openModal('nestedModal2'));
document.getElementById('closeNestedModal2').addEventListener('click', () => closeModal('nestedModal2'));
document.getElementById('doneNested').addEventListener('click', () => {
    closeModal('nestedModal2');
    closeModal('nestedModal1');
    showToast('All nested popups closed!', 'success');
});

// Close modals by clicking overlay
['successModal','errorModal','timedModal','nestedModal1','nestedModal2'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('click', e => {
        if (e.target === el) closeModal(id);
    });
});


// ==========================================
// ② CALENDAR
// ==========================================

// HTML date input
document.getElementById('submitDate').addEventListener('click', () => {
    const date = document.getElementById('dateInput').value;
    const dt   = document.getElementById('dateTimeInput').value;
    if (!date && !dt) {
        showResult('dateResult', '⚠️ Please select at least one date.', true);
        return;
    }
    showResult('dateResult', `✅ Date: ${date || 'N/A'}   |   Date-Time: ${dt || 'N/A'}`);
});

// Date range
document.getElementById('submitDateRange').addEventListener('click', () => {
    const checkIn  = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    if (!checkIn || !checkOut) {
        showResult('dateRangeResult', '⚠️ Select both check-in and check-out dates.', true);
        return;
    }
    if (checkIn >= checkOut) {
        showResult('dateRangeResult', '⚠️ Check-out must be after check-in.', true);
        return;
    }
    const nights = Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
    showResult('dateRangeResult', `✅ Check-in: ${checkIn}   |   Check-out: ${checkOut}   |   ${nights} night(s)`);
});

// Custom Calendar
(function initCalendar() {

    const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const MONTHS = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

    let currentYear  = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let selectedDate = null;

    function renderCalendar() {
        const monthLabel = document.getElementById('calMonthYear');
        const grid       = document.getElementById('calGrid');

        monthLabel.textContent = `${MONTHS[currentMonth]} ${currentYear}`;
        grid.innerHTML = '';

        // Day labels
        DAYS.forEach(d => {
            const cell = document.createElement('div');
            cell.className   = 'cal-day-label';
            cell.textContent = d;
            grid.appendChild(cell);
        });

        const firstDay   = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today       = new Date();

        // Empty cells
        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement('div'));
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const cell   = document.createElement('div');
            cell.className   = 'cal-day';
            cell.textContent = d;
            cell.dataset.testid = `cal-day-${d}`;

            const cellDate = new Date(currentYear, currentMonth, d);
            const cellStr  = cellDate.toISOString().split('T')[0];

            if (d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                cell.classList.add('today');
            }
            if (selectedDate === cellStr) {
                cell.classList.add('selected');
            }

            cell.addEventListener('click', () => {
                selectedDate = cellStr;
                document.getElementById('calSelectedDate').textContent = cellStr;
                renderCalendar();
            });

            grid.appendChild(cell);
        }
    }

    document.getElementById('calPrev').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar();
    });

    document.getElementById('calNext').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
    });

    document.getElementById('clearCalDate').addEventListener('click', () => {
        selectedDate = null;
        document.getElementById('calSelectedDate').textContent = 'None';
        renderCalendar();
    });

    renderCalendar();
})();


// ==========================================
// ③ CHECKBOXES
// ==========================================

// Get checked languages
document.getElementById('getCheckedLangs').addEventListener('click', () => {
    const checked = [...document.querySelectorAll('input[name="language"]:checked')]
        .map(c => c.value);
    showResult('checkResult', checked.length
        ? `✅ Selected: ${checked.join(', ')}`
        : '⚠️ No checkboxes selected.'
    );
});

// Select All with indeterminate
const selectAll  = document.getElementById('selectAll');
const skillBoxes = document.querySelectorAll('.skill-chk');

function updateSelectAll() {
    const total   = skillBoxes.length;
    const checked = [...skillBoxes].filter(c => c.checked).length;
    selectAll.checked       = checked === total;
    selectAll.indeterminate = checked > 0 && checked < total;
    const selected = [...skillBoxes].filter(c => c.checked).map(c => c.value);
    document.getElementById('skillsSelectedText').textContent =
        selected.length ? selected.join(', ') : 'None';
}

selectAll.addEventListener('change', () => {
    skillBoxes.forEach(c => { c.checked = selectAll.checked; });
    updateSelectAll();
});

skillBoxes.forEach(cb => cb.addEventListener('change', updateSelectAll));
updateSelectAll();


// ==========================================
// ④ INPUTS & RADIO BUTTONS
// ==========================================

// Range slider display
document.getElementById('inpRange').addEventListener('input', function () {
    document.getElementById('rangeVal').textContent = this.value;
});

// Form submit
document.getElementById('inputsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        text:     document.getElementById('inpText').value,
        number:   document.getElementById('inpNumber').value,
        email:    document.getElementById('inpEmail').value,
        url:      document.getElementById('inpUrl').value,
        phone:    document.getElementById('inpPhone').value,
        textarea: document.getElementById('inpTextarea').value,
        color:    document.getElementById('inpColor').value,
        range:    document.getElementById('inpRange').value,
        search:   document.getElementById('inpSearch').value
    };

    try {
        const res  = await fetch('/api/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        showResult('inputsResult', `✅ ${data.message}\n${JSON.stringify(data.received, null, 2)}`);
    } catch (err) {
        showResult('inputsResult', '⚠️ Form submitted (offline mode). Data: ' + JSON.stringify(formData), true);
    }
});

// Radio button values
document.getElementById('getRadioValues').addEventListener('click', () => {
    const browser = document.querySelector('input[name="browser"]:checked')?.value || 'None';
    const level   = document.querySelector('input[name="level"]:checked')?.value   || 'None';
    showResult('radioResult', `✅ Browser: ${browser}   |   Level: ${level}`);
});


// ==========================================
// ⑤ DROPDOWNS
// ==========================================

// Standard Select
document.getElementById('getSelectValues').addEventListener('click', () => {
    const country = document.getElementById('selCountry').value || 'Not selected';
    const role    = document.getElementById('selRole').value    || 'Not selected';
    showResult('selectResult', `✅ Country: ${country}   |   Role: ${role}`);
});

// Multi Select
document.getElementById('getMultiSelect').addEventListener('click', () => {
    const opts = [...document.getElementById('multiSelect').selectedOptions].map(o => o.text);
    showResult('multiSelectResult', opts.length
        ? `✅ Selected (${opts.length}): ${opts.join(', ')}`
        : '⚠️ No options selected.'
    );
});

// Custom Dropdown
(function initCustomDropdown() {
    const trigger  = document.getElementById('customDropdownTrigger');
    const menu     = document.getElementById('customDropdownMenu');
    const search   = document.getElementById('customDropdownSearch');
    const options  = document.querySelectorAll('#customDropdownOptions .custom-dropdown-option');
    const display  = document.getElementById('customDropdownSelected');
    const valueOut = document.getElementById('customDropdownValue');

    trigger.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        trigger.classList.toggle('open', isOpen);
        trigger.setAttribute('aria-expanded', isOpen);
        if (isOpen) search.focus();
    });

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            display.textContent = opt.textContent.trim();
            valueOut.textContent = opt.dataset.value;
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            menu.classList.remove('open');
            trigger.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        });
    });

    search.addEventListener('input', () => {
        const q = search.value.toLowerCase();
        options.forEach(opt => {
            opt.style.display = opt.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });

    document.addEventListener('click', e => {
        if (!document.getElementById('customDropdown').contains(e.target)) {
            menu.classList.remove('open');
            trigger.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }
    });
})();

// Dependent Dropdown
(function initDependentDropdown() {

    const DATA = {
        IN: {
            states: {
                'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru'],
                'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
                'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad']
            }
        },
        US: {
            states: {
                'California': ['Los Angeles', 'San Francisco', 'San Diego'],
                'Texas': ['Houston', 'Austin', 'Dallas'],
                'New York': ['New York City', 'Buffalo', 'Albany']
            }
        },
        AU: {
            states: {
                'New South Wales': ['Sydney', 'Newcastle', 'Wollongong'],
                'Victoria': ['Melbourne', 'Geelong', 'Ballarat'],
                'Queensland': ['Brisbane', 'Gold Coast', 'Cairns']
            }
        }
    };

    const depCountry = document.getElementById('depCountry');
    const depState   = document.getElementById('depState');
    const depCity    = document.getElementById('depCity');

    depCountry.addEventListener('change', () => {
        const country = DATA[depCountry.value];
        depState.innerHTML = '<option value="">Select State</option>';
        depCity.innerHTML  = '<option value="">Select State first</option>';
        depState.disabled  = true;
        depCity.disabled   = true;

        if (country) {
            Object.keys(country.states).forEach(state => {
                const opt = document.createElement('option');
                opt.value = state;
                opt.textContent = state;
                depState.appendChild(opt);
            });
            depState.disabled = false;
        }
    });

    depState.addEventListener('change', () => {
        const country = DATA[depCountry.value];
        depCity.innerHTML = '<option value="">Select City</option>';
        depCity.disabled  = true;

        if (country && depState.value) {
            const cities = country.states[depState.value] || [];
            cities.forEach(city => {
                const opt = document.createElement('option');
                opt.value = city;
                opt.textContent = city;
                depCity.appendChild(opt);
            });
            depCity.disabled = false;
        }
    });

    depCity.addEventListener('change', () => {
        if (depCity.value) {
            showResult('depDropdownResult',
                `✅ Country: ${depCountry.options[depCountry.selectedIndex].text}   |   State: ${depState.value}   |   City: ${depCity.value}`
            );
        }
    });
})();



// ==========================================
// ⑥ FRAMES — inject content via JS (safe, no srcdoc parse issues)
// ==========================================

(function initFrames() {

    // ── Single iFrame content
    const singleFrame = document.getElementById('single-frame');
    if (singleFrame) {
        singleFrame.addEventListener('load', function () {
            const doc = singleFrame.contentDocument || singleFrame.contentWindow.document;
            doc.open();
            doc.write(`<!DOCTYPE html><html><head><style>
                body { margin:0; background:#0a1628; font-family:Inter,sans-serif; color:#f1f5f9; padding:24px; }
                h3   { color:#93c5fd; margin-bottom:10px; }
                p    { color:#94a3b8; font-size:14px; line-height:1.6; }
                input { width:100%; padding:10px 14px; background:#020617; border:1px solid #334155; border-radius:8px; color:#f1f5f9; font-size:14px; margin-top:10px; outline:none; box-sizing:border-box; }
                input:focus { border-color:#3b82f6; }
                .chip { display:inline-block; background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.3); border-radius:4px; padding:2px 8px; font-family:monospace; font-size:12px; color:#93c5fd; margin-top:6px; }
            </style></head><body>
                <h3>&#128205; You are inside a Single iFrame</h3>
                <p>This content lives inside an iframe. Use driver.switchTo().frame('singleFrame') to access it.</p>
                <input type="text" id="frame-input" name="frameInput" data-testid="frame-input" placeholder="Type something inside the frame...">
                <div class="chip">iframe id=single-frame</div>
            </body></html>`);
            doc.close();
        });
        // Trigger the load by setting src to blank
        singleFrame.src = 'about:blank';
    }

    // ── Outer (nested) iFrame content
    const outerFrame = document.getElementById('outer-frame');
    if (outerFrame) {
        outerFrame.addEventListener('load', function () {
            const doc = outerFrame.contentDocument || outerFrame.contentWindow.document;
            doc.open();
            doc.write(`<!DOCTYPE html><html><head><style>
                body { margin:0; background:#071020; font-family:Inter,sans-serif; color:#f1f5f9; padding:20px; }
                h3   { color:#6ee7b7; margin-bottom:8px; font-size:15px; }
                p    { color:#94a3b8; font-size:13px; line-height:1.6; margin-bottom:12px; }
                .chip { display:inline-block; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); border-radius:4px; padding:2px 8px; font-family:monospace; font-size:11px; color:#6ee7b7; }
                .inner-wrap { border:2px solid rgba(110,231,183,0.3); border-radius:8px; overflow:hidden; }
                iframe { display:block; width:100%; border:none; }
            </style></head><body>
                <h3>&#128994; Outer Frame &mdash; <span class="chip">id=outer-frame</span></h3>
                <p>First switch to this frame, then switch to the inner frame below.</p>
                <div class="inner-wrap">
                    <iframe id="inner-frame" name="innerFrame" data-testid="inner-frame" height="130" src="about:blank"></iframe>
                </div>
                <script>
                    const inner = document.getElementById('inner-frame');
                    inner.addEventListener('load', function() {
                        const d = inner.contentDocument || inner.contentWindow.document;
                        d.open();
                        d.write('<html><head><style>body{margin:0;background:#020617;font-family:Inter,sans-serif;color:#f1f5f9;padding:16px;}h4{color:#c4b5fd;margin-bottom:8px;font-size:14px;}p{color:#94a3b8;font-size:12px;}button{padding:8px 16px;background:linear-gradient(135deg,#3b82f6,#7c3aed);border:none;border-radius:6px;color:white;font-size:13px;cursor:pointer;margin-top:8px;}</style></head><body><h4>&#128995; Inner Frame &mdash; id=inner-frame</h4><p>switchTo().frame("outerFrame") &rarr; switchTo().frame("innerFrame")</p><button id="innerFrameBtn" data-testid="inner-frame-btn" onclick="this.textContent=\'&#9989; Clicked!\'">Click Me Inside!</button></body></html>');
                        d.close();
                    });
                    inner.src = 'about:blank';
                </script>
            </body></html>`);
            doc.close();
        });
        outerFrame.src = 'about:blank';
    }

})();

// ── Dynamic Frame (loaded on button click)
document.getElementById('loadDynamicFrame').addEventListener('click', function () {
    this.disabled    = true;
    this.textContent = '&#9203; Loading\u2026 (wait 2s)';

    const container = document.getElementById('dynamicFrameContainer');
    container.innerHTML = '<p style="font-size:13px; color:var(--text-muted);">Waiting for iframe to load\u2026</p>';

    setTimeout(() => {
        const wrapper = document.createElement('div');
        wrapper.className = 'iframe-container';
        const iframe = document.createElement('iframe');
        iframe.id              = 'dynamic-frame';
        iframe.name            = 'dynamicFrame';
        iframe.dataset.testid  = 'dynamic-frame';
        iframe.title           = 'Dynamically loaded iframe';
        iframe.height          = '180';

        iframe.addEventListener('load', function () {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(`<!DOCTYPE html><html><head><style>
                body { margin:0; background:#0a1628; font-family:Inter,sans-serif; color:#f1f5f9; padding:20px; }
                h3   { color:#fcd34d; margin-bottom:8px; font-size:15px; }
                p    { color:#94a3b8; font-size:13px; margin-bottom:6px; }
                .chip { display:inline-block; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); border-radius:4px; padding:2px 8px; font-family:monospace; font-size:11px; color:#fcd34d; }
            </style></head><body>
                <h3>&#9889; Dynamic iFrame &mdash; Loaded!</h3>
                <p>This iframe was dynamically injected after a 2-second delay.</p>
                <p>Practice: <span class="chip">WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it('dynamicFrame'))</span></p>
            </body></html>`);
            doc.close();
        });

        iframe.src = 'about:blank';
        wrapper.appendChild(iframe);
        container.innerHTML = '';
        container.appendChild(wrapper);

        this.disabled    = false;
        this.textContent = '&#9889; Load Dynamic iFrame';
        showToast('Dynamic iframe loaded!', 'success');
    }, 2000);
});


// ==========================================
// ⑦ FILE UPLOAD
// ==========================================

// Single file upload
document.getElementById('uploadSingleFile').addEventListener('click', async () => {
    const fileInput = document.getElementById('singleFileInput');
    if (!fileInput.files.length) {
        showResult('singleUploadResult', '⚠️ No file selected. Please choose a file first.', true);
        return;
    }

    const file     = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res  = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
            showResult('singleUploadResult',
                `✅ Uploaded: ${data.filename}\nSize: ${(data.size / 1024).toFixed(1)} KB   |   Type: ${data.mimetype}`
            );
            showToast('File uploaded!', 'success');
        } else {
            showResult('singleUploadResult', '❌ Upload failed: ' + data.message, true);
        }
    } catch (err) {
        showResult('singleUploadResult', `✅ File selected: ${file.name} (${(file.size/1024).toFixed(1)} KB)\n(Server upload would work when running via Node.js)`, false);
    }
});

// Multiple file preview
document.getElementById('multiFileInput').addEventListener('change', function () {
    const preview = document.getElementById('multiFilePreview');
    preview.innerHTML = '';
    [...this.files].forEach(file => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <div class="file-item-left">
                <span style="font-size:18px;">${getFileIcon(file.name)}</span>
                <div>
                    <div class="file-item-name">${file.name}</div>
                    <div class="file-item-size">${(file.size / 1024).toFixed(1)} KB</div>
                </div>
            </div>`;
        preview.appendChild(item);
    });
});

function getFileIcon(name) {
    const ext = name.split('.').pop().toLowerCase();
    const icons = { pdf:'📄', jpg:'🖼', jpeg:'🖼', png:'🖼', gif:'🖼', txt:'📝', doc:'📃', docx:'📃', csv:'📊', zip:'📦' };
    return icons[ext] || '📁';
}

// Multiple upload
document.getElementById('uploadMultipleFiles').addEventListener('click', async () => {
    const fileInput = document.getElementById('multiFileInput');
    if (!fileInput.files.length) {
        showResult('multiUploadResult', '⚠️ No files selected.', true);
        return;
    }

    const names = [...fileInput.files].map(f => f.name).join(', ');
    showResult('multiUploadResult',
        `✅ ${fileInput.files.length} file(s) ready: ${names}`
    );
    showToast(`${fileInput.files.length} file(s) uploaded!`, 'success');
});

// Dropzone
(function initDropzone() {
    const zone  = document.getElementById('dropzone');
    const input = document.getElementById('dropzoneInput');
    const list  = document.getElementById('dropzoneFiles');

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        handleDropFiles(e.dataTransfer.files);
    });

    input.addEventListener('change', () => handleDropFiles(input.files));

    function handleDropFiles(files) {
        list.innerHTML = '';
        const resultBox = document.getElementById('dropzoneResult');
        [...files].forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `
                <div class="file-item-left">
                    <span style="font-size:18px;">${getFileIcon(file.name)}</span>
                    <div>
                        <div class="file-item-name">${file.name}</div>
                        <div class="file-item-size">${(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                </div>
                <button class="file-remove" title="Remove">✕</button>`;
            item.querySelector('.file-remove').addEventListener('click', () => item.remove());
            list.appendChild(item);
        });

        resultBox.textContent = `✅ ${files.length} file(s) dropped: ${[...files].map(f=>f.name).join(', ')}`;
        resultBox.style.color = '#7dd3fc';
        resultBox.classList.add('visible');
        showToast(`${files.length} file(s) added to dropzone!`, 'success');
    }
})();
