/* ==========================================================================
   THE FORGE V3 — MASTER INTERFACE CONTROLLER (forge.js)
   Core Systems: Adaptive Multi-Theme Mapping, Full Portability Data Ports
   ========================================================================== */

const STORAGE_KEY = "FORGE_MASTER_PERSISTENCE_MATRIX_V3";

// 1. FRESH UNALLOCATED ENGINE Blueprint STATE Blueprints
const FreshSystemStateBlueprint = {
    user: {
        name: "",
        completedTasks: 0
    },
    theme: "slate",
    matrixTasks: [
        { id: "tsk-1", text: "Map out secondary semester DBMS schemas", priority: "high", completed: false },
        { id: "tsk-2", text: "Calibrate Minimalist skincare layering order", priority: "low", completed: true }
    ],
    logsList: [
        { id: "log-1", timestamp: "09.06.2026 // 18:30", sector: "WORK", desc: "Engine infrastructure blueprints drafted successfully.", duration: 2.5, status: "completed" }
    ]
};

let LiveState = {};

const THEME_AVATAR_MAP = {
    slate: "👁️",
    mahoraga: "🎡",
    crimson: "🩸"
};

const EXP_RANK_HIERARCHY = [
    { tier: 1, min: 0 }, { tier: 2, min: 2 }, { tier: 3, min: 5 },
    { tier: 4, min: 10 }, { tier: 5, min: 17 }, { tier: 6, min: 25 },
    { tier: 7, min: 35 }, { tier: 8, min: 48 }, { tier: 9, min: 62 },
    { tier: 10, min: 80 }
];

// 2. LIFECYCLE INITIALIZATION DEPLOYMENT LOOP
document.addEventListener("DOMContentLoaded", () => {
    loadDatabaseState();
    verifyOperatorIdentity();
    applyActiveThemeProperties(LiveState.theme || "slate");
    injectBackupPortInterfaces();
    registerComponentInteractions();
    kickstartLiveClockTelemetry();
    renderCompleteWorkspaceLayouts();
});

function loadDatabaseState() {
    const localStoreCache = localStorage.getItem(STORAGE_KEY);
    if (!localStoreCache) {
        LiveState = JSON.parse(JSON.stringify(FreshSystemStateBlueprint));
    } else {
        try {
            LiveState = JSON.parse(localStoreCache);
            if (!LiveState.matrixTasks) LiveState.matrixTasks = [];
            if (!LiveState.logsList) LiveState.logsList = [];
        } catch (e) {
            LiveState = JSON.parse(JSON.stringify(FreshSystemStateBlueprint));
        }
    }
}

function commitDatabaseState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(LiveState));
}

function verifyOperatorIdentity() {
    if (!LiveState.user.name || LiveState.user.name.trim() === "") {
        let terminalPrompt = "";
        while (!terminalPrompt || terminalPrompt.trim() === "") {
            terminalPrompt = prompt("INITIALIZE ARCHITECTURE CORE:\nSpecify your structural identity handle below to sync settings metrics:");
        }
        LiveState.user.name = terminalPrompt.trim().toUpperCase();
        commitDatabaseState();
        triggerToastNotification("IDENTITY LOGGED", `System aligned to username string: ${LiveState.user.name}`, "success");
    }
}

// 3. MULTI-THEME APPLICATION SCHEMATIC ENGINE
function applyActiveThemeProperties(chosenThemeID) {
    document.documentElement.setAttribute("data-theme", chosenThemeID);
    LiveState.theme = chosenThemeID;
    
    // Sync UI Header indicators and buttons
    const avatarNode = document.getElementById("theme-avatar-icon");
    if (avatarNode) avatarNode.innerText = THEME_AVATAR_MAP[chosenThemeID] || "👁️";

    const allThemeButtons = document.querySelectorAll("[data-set-theme]");
    allThemeButtons.forEach(btn => {
        if (btn.getAttribute("data-set-theme") === chosenThemeID) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    commitDatabaseState();
}

// 4. ROUTE SWITCHES AND FORM BINDINGS
function registerComponentInteractions() {
    // Sideways Tab Switch Anchors
    const navigationLinks = document.querySelectorAll(".nav-anchor");
    navigationLinks.forEach(link => {
        link.addEventListener("click", () => {
            const targetPanelID = link.getAttribute("data-panel");
            navigationLinks.forEach(l => l.classList.remove("active"));
            document.querySelectorAll(".control-panel").forEach(p => p.classList.remove("active"));
            
            link.classList.add("active");
            const targetElement = document.getElementById(targetPanelID);
            if (targetElement) targetElement.classList.add("active");
        });
    });

    // Theme Switch Selection Dock
    const themeButtons = document.querySelectorAll("[data-set-theme]");
    themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const themeTarget = btn.getAttribute("data-set-theme");
            applyActiveThemeProperties(themeTarget);
            triggerToastNotification("THEME ADAPTED", `Visual matrix switched to ${themeTarget.toUpperCase()}`, "success");
        });
    });

    // To-Do Task Matrix Injector Submit Form
    const taskForm = document.getElementById("form-matrix-task-injector");
    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const textInput = document.getElementById("matrix-task-text");
            const priorityInput = document.getElementById("matrix-task-priority");

            if (!textInput || textInput.value.trim() === "") return;

            const constructedTask = {
                id: "tsk-" + Date.now(),
                text: textInput.value.trim(),
                priority: priorityInput.value,
                completed: false
            };

            LiveState.matrixTasks.push(constructedTask);
            commitDatabaseState();
            textInput.value = "";
            
            renderTaskMatrixPipeline();
            triggerToastNotification("TARGET ACQUIRED", "New objective appended into your Task Matrix.", "success");
        });
    }

    // Quick Work Logger Form Commit
    const quickLogForm = document.getElementById("form-dashboard-quick-log");
    if (quickLogForm) {
        quickLogForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const desc = document.getElementById("quick-log-name");
            const sector = document.getElementById("quick-log-sector");
            const duration = document.getElementById("quick-log-duration");

            const isSuccess = Math.random() > 0.12; 
            const newLogNode = {
                id: "log-" + Date.now(),
                timestamp: generateLogTimestampString(),
                sector: sector.value,
                desc: desc.value.trim(),
                duration: parseFloat(duration.value) || 1.0,
                status: isSuccess ? "completed" : "denied"
            };

            LiveState.logsList.unshift(newLogNode);
            if (isSuccess) LiveState.user.completedTasks += 1;

            commitDatabaseState();
            desc.value = "";
            duration.value = "";

            renderCompleteWorkspaceLayouts();
            triggerToastNotification("LEDGER SYNCED", "Transaction registered in analytics index.", isSuccess ? "success" : "danger");
        });
    }

    // Profile Settings User Override
    const settingUserForm = document.getElementById("form-update-profile-identity");
    if (settingUserForm) {
        settingUserForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputField = document.getElementById("config-user-name");
            if (!inputField || inputField.value.trim() === "") return;

            LiveState.user.name = inputField.value.trim().toUpperCase();
            commitDatabaseState();
            inputField.value = "";
            renderCompleteWorkspaceLayouts();
            triggerToastNotification("CORE HANDLES MODIFIED", "Operator system profile refreshed.", "success");
        });
    }

    // Database Hard Wipe Button
    const purgeBtn = document.getElementById("btn-trigger-nuke-purge");
    if (purgeBtn) {
        purgeBtn.addEventListener("click", () => {
            if (confirm("CRITICAL PROTOCOL TRIGGER:\nWipe all localized operational history, scores, and username strings? This action is absolute.")) {
                localStorage.removeItem(STORAGE_KEY);
                location.reload();
            }
        });
    }

    // Floating Diagnostics Drawer Toggle Handles
    const aiTrigger = document.getElementById("btn-ai-diagnostic-trigger");
    const aiDrawer = document.getElementById("ai-diagnostics-drawer-overlay");
    const aiClose = document.getElementById("btn-close-ai-drawer");

    if (aiTrigger && aiDrawer) {
        aiTrigger.addEventListener("click", () => {
            aiDrawer.classList.toggle("hidden");
            if (!aiDrawer.classList.contains("hidden")) calculateAIDiagnosticsOutput();
        });
    }
    if (aiClose && aiDrawer) {
        aiClose.addEventListener("click", () => aiDrawer.classList.add("hidden"));
    }
}

// 5. RENDERING GRAPHICAL RENDERING METHODS
function renderCompleteWorkspaceLayouts() {
    const operatorLabel = document.getElementById("user-display-name");
    if (operatorLabel) operatorLabel.innerText = LiveState.user.name || "OPERATOR";

    calculateAnalyticsDashboardRatios();
    renderTaskMatrixPipeline();
    generate30DayGridBlocks();
    plotAnalyticsDurationBars();
    renderArchiveLogsLedgerTable("all");
    processClearanceRankTiers();
}

function calculateAnalyticsDashboardRatios() {
    const ratioLabel = document.getElementById("dash-consistency-score");
    const fillBar = document.getElementById("consistency-bar");
    const workloadsLabel = document.getElementById("dash-total-hours");

    if (!LiveState.logsList || LiveState.logsList.length === 0) {
        if (ratioLabel) ratioLabel.innerText = "100%";
        if (fillBar) fillBar.style.width = "100%";
        if (workloadsLabel) workloadsLabel.innerText = "0.0h";
        return;
    }

    const total = LiveState.logsList.length;
    const successes = LiveState.logsList.filter(l => l.status === "completed").length;
    const ratioPercentage = Math.round((successes / total) * 100);

    if (ratioLabel) ratioLabel.innerText = `${ratioPercentage}%`;
    if (fillBar) fillBar.style.width = `${ratioPercentage}%`;

    const totalAccumulatedHours = LiveState.logsList.reduce((sum, entry) => sum + entry.duration, 0);
    if (workloadsLabel) workloadsLabel.innerText = `${totalAccumulatedHours.toFixed(1)}h`;
}

// Full interactive Checkbox + Delete Task implementation rules
function renderTaskMatrixPipeline() {
    const listHolder = document.getElementById("matrix-todo-items-holder");
    const emptyMsg = document.getElementById("matrix-empty-placeholder");
    const activeFilter = document.querySelector("#task-matrix-filters .filter-toggle.active")?.getAttribute("data-task-filter") || "all";

    if (!listHolder) return;
    listHolder.innerHTML = "";

    let targetsToDisplay = LiveState.matrixTasks;
    if (activeFilter === "pending") targetsToDisplay = LiveState.matrixTasks.filter(t => !t.completed);
    if (activeFilter === "done") targetsToDisplay = LiveState.matrixTasks.filter(t => t.completed);

    if (targetsToDisplay.length === 0) {
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    }
    if (emptyMsg) emptyMsg.style.display = "none";

    targetsToDisplay.forEach(task => {
        const itemLi = document.createElement("li");
        itemLi.className = `todo-matrix-item-node ${task.completed ? "completed-state" : ""}`;
        itemLi.innerHTML = `
            <div class="task-left-core">
                <div class="custom-checkbox-trigger" title="Toggle Completion Status"></div>
                <span class="task-label-string">${task.text}</span>
                <span class="priority-tag-badge p-${task.priority}">${task.priority}</span>
            </div>
            <button type="button" class="delete-matrix-task-btn" title="Scrub Target Matrix Slot">×</button>
        `;

        // Checkbox status cycle dynamic attachment points
        itemLi.querySelector(".custom-checkbox-trigger").addEventListener("click", () => {
            task.completed = !task.completed;
            if (task.completed) LiveState.user.completedTasks += 1;
            else LiveState.user.completedTasks = Math.max(0, LiveState.user.completedTasks - 1);
            
            commitDatabaseState();
            renderCompleteWorkspaceLayouts();
            triggerToastNotification("MATRIX UPDATED", "Objective execution state changed.", "info");
        });

        // Removal attachment points
        itemLi.querySelector(".delete-matrix-task-btn").addEventListener("click", () => {
            LiveState.matrixTasks = LiveState.matrixTasks.filter(t => t.id !== task.id);
            commitDatabaseState();
            renderTaskMatrixPipeline();
            triggerToastNotification("TARGET DELETED", "Task cleared from memory tracks.", "info");
        });

        listHolder.appendChild(itemLi);
    });
}

// Bind click filters inside the To-Do element list toolbar
document.querySelectorAll("#task-matrix-filters .filter-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#task-matrix-filters .filter-toggle").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTaskMatrixPipeline();
    });
});

function generate30DayGridBlocks() {
    const frame = document.getElementById("dashboard-calendar-frame");
    if (!frame) return;
    frame.innerHTML = "";

    for (let i = 1; i <= 30; i++) {
        const block = document.createElement("div");
        block.className = "calendar-day-node";
        block.innerText = i.toString().padStart(2, "0");

        if (i % 9 === 0) block.classList.add("critical-violation");
        else if (i % 6 === 0) block.classList.add("drift-warn");
        else if (i % 2 === 0 || i < 5) block.classList.add("sync-perfect");

        frame.appendChild(block);
    }
}

function plotAnalyticsDurationBars() {
    const frame = document.getElementById("historical-trends-bar-frame");
    if (!frame) return;
    frame.innerHTML = "";

    const cleanHistorySlice = LiveState.logsList.slice(0, 7).reverse();
    if (cleanHistorySlice.length === 0) {
        frame.innerHTML = `<div class="empty-state-text" style='width:100%'>Awaiting entry streams...</div>`;
        return;
    }

    cleanHistorySlice.forEach(log => {
        const pillar = document.createElement("div");
        pillar.className = "chart-pillar-bar";
        const heightCalc = Math.min((log.duration / 10) * 100, 100);
        
        pillar.style.height = `${Math.max(heightCalc, 10)}%`;
        pillar.setAttribute("data-value", `${log.duration}h`);
        pillar.setAttribute("data-label", log.timestamp.split(" // ")[0]);
        frame.appendChild(pillar);
    });
}

function renderArchiveLogsLedgerTable(filterCode = "all") {
    const tbody = document.getElementById("table-body-historical-logs");
    if (!tbody) return;
    tbody.innerHTML = "";

    let finalViewList = LiveState.logsList;
    if (filterCode === "completed") finalViewList = LiveState.logsList.filter(l => l.status === "completed");
    if (filterCode === "denied") finalViewList = LiveState.logsList.filter(l => l.status === "denied");

    if (finalViewList.length === 0) {
        tbody.innerHTML = `<tr><td colspan='5' class='empty-state-text' style='text-align:center;'>No matching archive tracks.</td></tr>`;
        return;
    }

    finalViewList.forEach(log => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="font-family:'JetBrains Mono'; font-size:11px; color:var(--text-muted);">${log.timestamp}</td>
            <td style="font-weight:700; font-size:11px; color:var(--accent-prime);">${log.sector}</td>
            <td style="font-weight:600;">${log.desc}</td>
            <td style="font-family:'JetBrains Mono'; font-weight:700;">${log.duration.toFixed(1)}h</td>
            <td><span class="status-tag ${log.status === 'completed' ? 'complete' : 'denied'}">${log.status.toUpperCase()}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function processClearanceRankTiers() {
    const completedCount = LiveState.user.completedTasks || 0;
    let verifiedActiveTierID = 1;

    for (let idx = EXP_RANK_HIERARCHY.length - 1; idx >= 0; idx--) {
        if (completedCount >= EXP_RANK_HIERARCHY[idx].min) {
            verifiedActiveTierID = EXP_RANK_HIERARCHY[idx].tier;
            break;
        }
    }

    const rankNodes = document.querySelectorAll(".rank-tier-node");
    rankNodes.forEach((node, index) => {
        if ((index + 1) === verifiedActiveTierID) {
            node.classList.add("active");
            const badgeLabel = node.querySelector("h5")?.innerText || "TIER UNKNOWN";
            const badgeIcon = node.querySelector(".rank-sym")?.innerText || "⚪";
            const uiBadge = document.getElementById("sidebar-rank-badge");
            if (uiBadge) uiBadge.innerText = `${badgeIcon} ${badgeLabel}`;
        } else {
            node.classList.remove("active");
        }
    });

    // Milestone Unlock Checks
    if (LiveState.logsList.length >= 1) document.getElementById("ach-first-log")?.classList.remove("locked");
    if (LiveState.logsList.length >= 3 && LiveState.logsList.every(l => l.status === "completed")) document.getElementById("ach-perfect-sync")?.classList.remove("locked");
    if (LiveState.matrixTasks.length >= 5) document.getElementById("ach-goal-crusher")?.classList.remove("locked");
    if (LiveState.logsList.some(l => l.duration >= 10)) document.getElementById("ach-overtime-shield")?.classList.remove("locked");
}

// 6. EXPORT PORTS COMPILER METHODS INJECTION (PORTABILITY INTEGRATION)
function injectBackupPortInterfaces() {
    const settingsGrid = document.querySelector("#panel-settings .settings-grid-layout");
    if (!settingsGrid) return;

    const moduleBox = document.createElement("div");
    moduleBox.className = "workspace-card patterning-card-surface";
    moduleBox.style.gridColumn = "1 / -1";
    moduleBox.innerHTML = `
        <h3>Data Stream Transfer Ports</h3>
        <p class="section-context-text">Move your entire system profile across hardware frames cleanly without losing progress tracking configurations.</p>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:14px;">
            <button type="button" class="prime-action-btn" id="btn-export-payload" style="background-color:var(--status-perfect); border-color:var(--status-perfect);">Compile Export JSON</button>
            <label class="prime-action-btn" style="background-color:var(--bg-surface-elevated); border:1px solid var(--text-subtle); cursor:pointer;">
                Inject Backup Snapshot
                <input type="file" id="btn-import-payload" accept=".json" style="display:none;">
            </label>
        </div>
    `;
    settingsGrid.appendChild(moduleBox);

    document.getElementById("btn-export-payload").addEventListener("click", () => {
        const rawString = JSON.stringify(LiveState, null, 2);
        const fileBlob = new Blob([rawString], { type: "application/json" });
        const temporaryLink = document.createElement("a");
        temporaryLink.href = URL.createObjectURL(fileBlob);
        temporaryLink.download = `FORGE_SYSTEM_BACKUP_${Date.now()}.json`;
        temporaryLink.click();
        triggerToastNotification("EXPORTED", "JSON system snapshot generated.", "success");
    });

    document.getElementById("btn-import-payload").addEventListener("change", (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const incomingObject = JSON.parse(event.target.result);
                if (incomingObject.user && incomingObject.matrixTasks && incomingObject.logsList) {
                    LiveState = incomingObject;
                    commitDatabaseState();
                    applyActiveThemeProperties(LiveState.theme || "slate");
                    renderCompleteWorkspaceLayouts();
                    triggerToastNotification("BACKUP MERGED", "System memory tracks overwritten cleanly.", "success");
                } else {
                    alert("STRUCTURAL INJECT FAILURE: Upload file has incorrect schema maps.");
                }
            } catch (err) {
                alert("FILE CORRUPTION EXCEPTION: JSON string parse failure.");
            }
        };
        reader.readAsText(selectedFile);
    });
}

// 7. REALTIME SUPER-EGO DIAGNOSTICS GENERATION ENGINE (GEN Z PERSONA ACCENTS)
function calculateAIDiagnosticsOutput() {
    const compLbl = document.getElementById("ai-diag-compliance-lbl");
    const driftLbl = document.getElementById("ai-diag-drift-lbl");
    const textHolder = document.getElementById("ai-dynamic-narrative-output-feed");

    const totalLogs = LiveState.logsList.length;
    const successes = LiveState.logsList.filter(l => l.status === "completed").length;
    const score = totalLogs > 0 ? Math.round((successes / totalLogs) * 100) : 100;
    const deviationsValue = totalLogs > 0 ? (( (totalLogs - successes) / totalLogs ) * 100).toFixed(1) : "0.0";

    driftLbl.innerText = `${deviationsValue}%`;

    let intelligenceString = "";
    
    // Theme-adjusted specific tone triggers
    if (LiveState.theme === "mahoraga") {
        if (score >= 85) {
            compLbl.innerText = "ADAPTATION COMPLETE"; compLbl.style.color = "var(--accent-prime)";
            intelligenceString = `// Wheel spun. Adaptation complete, ${LiveState.user.name}. You are shrugging off workload friction like a literal Divine General. ${score}% efficiency means you're matching any curriculum requirement easily. Keep swinging.`;
        } else {
            compLbl.innerText = "UNADAPTED FRICTION"; compLbl.style.color = "var(--status-critical)";
            intelligenceString = `// Critical breach, ${LiveState.user.name}. The wheel isn't spinning because you aren't doing anything. A ${score}% compliance tracking score means you're getting knocked out by simple tasks. Adapt or get eliminated from the sector.`;
        }
    } else if (LiveState.theme === "crimson") {
        if (score >= 80) {
            compLbl.innerText = "STRATEGIC SUPREMACY"; compLbl.style.color = "var(--accent-prime)";
            intelligenceString = `// *O kawaii koto...* Look at you actually executing plans cleanly, ${LiveState.user.name}. A ${score}% compliance metric implies actual intellect. Don't slip up now, or the entire student profile drops back down to zero.`;
        } else {
            compLbl.innerText = "INTELLECTUAL DEFICIT"; compLbl.style.color = "var(--status-critical)";
            intelligenceString = `// Seriously, ${LiveState.user.name}? This execution rate is tragic. You're losing the psychological warfare against your own laziness. Pull yourself together, scrub those lagging targets, and match your requirements before I completely lock you out.`;
        }
    } else {
        // Default Slate
        if (score >= 80) {
            compLbl.innerText = "OPTIMAL SYSTEM SYNC"; compLbl.style.color = "var(--status-perfect)";
            intelligenceString = `// Working cleanly, Operator ${LiveState.user.name}. Your metric index is standing strong at ${score}%. Balanced profile parameters verified. Don't get lazy on me now.`;
        } else {
            compLbl.innerText = "DEVIANT DRIFT DETECTED"; compLbl.style.color = "var(--status-critical)";
            intelligenceString = `// System anomaly alert, ${LiveState.user.name}. You are failing logs and skipping objectives. Your drift threshold is way too high. Clear out the backlog and lock back in.`;
        }
    }

    textHolder.innerHTML = `<p style="font-family:'JetBrains Mono'; font-size:12px;">${intelligenceString}</p>`;
}

// 8. INFRASTRUCTURE HUD SYSTEM CLOCKS & ALERTS
function kickstartLiveClockTelemetry() {
    setInterval(() => {
        const cNode = document.getElementById("nav-clock");
        const dNode = document.getElementById("nav-date");
        const now = new Date();
        
        if (cNode) cNode.innerText = now.toTimeString().split(" ")[0];
        if (dNode) {
            const day = now.getDate().toString().padStart(2, "0");
            const mo = (now.getMonth() + 1).toString().padStart(2, "0");
            dNode.innerText = `${day}.${mo}.${now.getFullYear()}`;
        }
    }, 1000);
}

function generateLogTimestampString() {
    const d = new Date();
    const day = d.getDate().toString().padStart(2, "0");
    const mo = (d.getMonth() + 1).toString().padStart(2, "0");
    const hr = d.getHours().toString().padStart(2, "0");
    const min = d.getMinutes().toString().padStart(2, "0");
    return `${day}.${mo}.${d.getFullYear()} // ${hr}:${min}`;
}

function triggerToastNotification(title, msg, visualStyle = "info") {
    const anchor = document.getElementById("toast-alerts-anchor-host");
    if (!anchor) return;

    const toast = document.createElement("div");
    toast.className = `hud-alert-toast toast-${visualStyle}`;
    toast.innerHTML = `
        <span class="toast-header">// ${title.toUpperCase()}</span>
        <span class="toast-msg">${msg}</span>
    `;
    anchor.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(20px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}