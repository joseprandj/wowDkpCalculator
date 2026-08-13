let total = 0;
let raidSize = 25;

const state = {};
const raids = {
    icc: [
        "Lord Marrowgar",
        "Lady Deathwhisper",
        "Gunship Battle",
        "Deathbringer Saurfang",
        "Festergut",
        "Rotface",
        "Professor Putricide",
        "Blood Prince Council",
        "Blood-Queen Lana'thel",
        "Valithria Dreamwalker",
        "Sindragosa",
        "The Lich King"
    ],
    ruby: [
        "Baltharus the Warborn",
        "Saviana Ragefire",
        "General Zarithrian",
        "Halion"
    ],
    toc: [
        "The Beasts of Northrend",
        "Lord Jaraxxus",
        "Faction Champions",
        "Twin Val'kyr",
        "Anub'arak"
    ]
};
const defaultConfigs = {
    icc: {
        10: {
            "icc-0": { normal: 5, heroic: 10, bonus: 0 },
            "icc-1": { normal: 5, heroic: 10, bonus: 0 },
            "icc-2": { normal: 5, heroic: 10, bonus: 0 },
            "icc-3": { normal: 5, heroic: 10, bonus: 0 },
            "icc-4": { normal: 5, heroic: 10, bonus: 0 },
            "icc-5": { normal: 5, heroic: 10, bonus: 0 },
            "icc-6": { normal: 5, heroic: 10, bonus: 0 },
            "icc-7": { normal: 5, heroic: 10, bonus: 0 },
            "icc-8": { normal: 5, heroic: 10, bonus: 0 },
            "icc-9": { normal: 5, heroic: 10, bonus: 0 },
            "icc-10": { normal: 5, heroic: 10, bonus: 0 },
            "icc-11": { normal: 5, heroic: 10, bonus: 0 }
        },
        25: {
            "icc-0": { normal: 10, heroic: 20, bonus: 0 },
            "icc-1": { normal: 10, heroic: 20, bonus: 0 },
            "icc-2": { normal: 10, heroic: 20, bonus: 0 },
            "icc-3": { normal: 10, heroic: 20, bonus: 0 },
            "icc-4": { normal: 10, heroic: 20, bonus: 0 },
            "icc-5": { normal: 10, heroic: 20, bonus: 0 },
            "icc-6": { normal: 10, heroic: 20, bonus: 0 },
            "icc-7": { normal: 10, heroic: 20, bonus: 0 },
            "icc-8": { normal: 10, heroic: 20, bonus: 0 },
            "icc-9": { normal: 10, heroic: 20, bonus: 0 },
            "icc-10": { normal: 10, heroic: 20, bonus: 0 },
            "icc-11": { normal: 10, heroic: 20, bonus: 0 }
        }
    },
    ruby: {
        10: {
            "ruby-0": { normal: 0, heroic: 0, bonus: 0 },
            "ruby-1": { normal: 0, heroic: 0, bonus: 0 },
            "ruby-2": { normal: 0, heroic: 0, bonus: 0 },
            "ruby-3": { normal: 0, heroic: 200, bonus: 0 }
        },
        25: {
            "ruby-0": { normal: 0, heroic: 0, bonus: 0 },
            "ruby-1": { normal: 0, heroic: 0, bonus: 0 },
            "ruby-2": { normal: 0, heroic: 0, bonus: 0 },
            "ruby-3": { normal: 100, heroic: 400, bonus: 0 }
        }
    },
    toc: {
        10: {
            "toc-0": { normal: 0, heroic: 0, bonus: 0 },
            "toc-1": { normal: 0, heroic: 0, bonus: 0 },
            "toc-2": { normal: 0, heroic: 0, bonus: 0 },
            "toc-3": { normal: 0, heroic: 0, bonus: 0 },
            "toc-4": { normal: 0, heroic: 50, bonus: 0 }
        },
        25: {
            "toc-0": { normal: 10, heroic: 40, bonus: 0 },
            "toc-1": { normal: 10, heroic: 40, bonus: 0 },
            "toc-2": { normal: 10, heroic: 40, bonus: 0 },
            "toc-3": { normal: 10, heroic: 40, bonus: 0 },
            "toc-4": { normal: 10, heroic: 40, bonus: 0 }
        }
    }
};

function loadBosses(type) {
    const container = document.getElementById("bossContainer");
    container.innerHTML = "";

    const configBar = document.createElement("div");
    configBar.className = "config-bar";

    configBar.innerHTML = `
        <div class="right-buttons">
            <button onclick="setAll('normal')">Todos Normal</button>
            <button class="heroic" onclick="setAll('heroic')">Todos Heroico</button>
        </div>
        
        <button class="config-btn" onclick="openConfig('${type}')">⚙️ Configurações</button>
    `;

    container.appendChild(configBar);

    raids[type].forEach((boss, index) => {
        const id = `${type}-${index}`;
        const config = getConfig(type, id);

        state[id] = {
            normal: config.normal,
            heroic: config.heroic,
            bonus: config.bonus,
            active: null
        };

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3 class="boss-title">${boss}</h3>

            <div class="boss-points" id="points-${id}">0</div>

            <div class="actions">
                <button id="btn-normal-${id}" onclick="selectMode('${id}', 'normal')">Normal</button>
                <button id="btn-heroic-${id}" onclick="selectMode('${id}', 'heroic')">Heroico</button>
            </div>

            <input 
                type="number" 
                placeholder="Bônus"
                class="bonus-input"
                id="bonus-${id}"
                value="${config.bonus === 0 ? '' : config.bonus}"
                oninput="updateBonus('${id}', this.value)"
            >
        `;

        container.appendChild(card);
    });
}

function selectMode(id, type) {
    const boss = state[id];

    const btnNormal = document.getElementById(`btn-normal-${id}`);
    const btnHeroic = document.getElementById(`btn-heroic-${id}`);
    const pointsEl = document.getElementById(`points-${id}`);

    if (boss.active) {
        let prevValue = boss[boss.active] + boss.bonus;
        total -= prevValue;
    }

    if (boss.active === type) {
        boss.active = null;
        pointsEl.innerText = 0;

        btnNormal.classList.remove("active");
        btnHeroic.classList.remove("active");

        updateTotal();
        return;
    }

    boss.active = type;
    let value = boss[type] + boss.bonus;

    total += value;
    pointsEl.innerText = value;

    btnNormal.classList.remove("active");
    btnHeroic.classList.remove("active");

    if (type === "normal") {
        btnNormal.classList.add("active");
    } else {
        btnHeroic.classList.add("active");
    }

    updateTotal();
}

function updateTotal() {
    document.getElementById("total").innerText = total;
}

function resetTotal() {
    total = 0;

    for (let id in state) {
        state[id].active = null;
        state[id].bonus = 0;

        const btnNormal = document.getElementById(`btn-normal-${id}`);
        const btnHeroic = document.getElementById(`btn-heroic-${id}`);
        const pointsEl = document.getElementById(`points-${id}`);
        const input = document.querySelector(`input[oninput*="${id}"]`);

        if (btnNormal) btnNormal.classList.remove("active");
        if (btnHeroic) btnHeroic.classList.remove("active");
        if (pointsEl) pointsEl.innerText = 0;

        if (input) input.value = "";
    }

    updateTotal();
}

function setAll(type) {
    for (let id in state) {
        selectMode(id, type);
    }
}

function updateBonus(id, value) {
    const boss = state[id];

    if (boss.active) {
        total -= (boss[boss.active] + boss.bonus);
    }

    boss.bonus = parseInt(value) || 0;

    if (boss.active) {
        const newValue = boss[boss.active] + boss.bonus;
        total += newValue;

        document.getElementById(`points-${id}`).innerText = newValue;
    }

    updateTotal();
}

function getStorageKey(type) {
    return `dkp-config-${type}-${raidSize}`;
}

function openConfig(type) {
    const modal = document.getElementById("configModal");
    const list = document.getElementById("configList");

    modal.classList.remove("hidden");

    const saved = JSON.parse(localStorage.getItem(getStorageKey(type))) || {};

    list.innerHTML = `
        <div class="config-dual">

            <!-- COLUNA 10 -->
            <div class="config-column">
                <h3 class="config-title">10</h3>

                <div class="config-header-row">
                    <span></span>
                    <span>Normal</span>
                    <span>Heroico</span>
                    <span>Bônus</span>
                </div>

                <div class="config-grid" id="config-10"></div>
            </div>

            <!-- DIVISOR -->
            <div class="config-divider"></div>

            <!-- COLUNA 25 -->
            <div class="config-column">
                <h3 class="config-title">25</h3>

                <div class="config-header-row">
                    <span></span>
                    <span>Normal</span>
                    <span>Heroico</span>
                    <span>Bônus</span>
                </div>

                <div class="config-grid" id="config-25"></div>
            </div>

        </div>
    `;

    const grid = list.querySelector(".config-grid");

    const grid10 = document.getElementById("config-10");
    const grid25 = document.getElementById("config-25");

    raids[type].forEach((boss, index) => {
        const id = `${type}-${index}`;

        const stored10 = getStoredConfigBySize(type, 10);
        const stored25 = getStoredConfigBySize(type, 25);

        const config10 = stored10[id] || defaultConfigs[type][10][id];
        const config25 = stored25[id] || defaultConfigs[type][25][id];

        const row10 = document.createElement("div");
        row10.className = "config-row-item";

        row10.innerHTML = `
            <span class="boss-name">${boss}</span>
            <input type="number" value="${config10.normal}" onchange="saveConfig('${type}', 10, '${id}', 'normal', this.value)">
            <input type="number" value="${config10.heroic}" onchange="saveConfig('${type}', 10, '${id}', 'heroic', this.value)">
            <input type="number" value="${config10.bonus}" onchange="saveConfig('${type}', 10, '${id}', 'bonus', this.value)">
        `;

        const row25 = document.createElement("div");
        row25.className = "config-row-item";

        row25.innerHTML = `
            <span class="boss-name">${boss}</span>
            <input type="number" value="${config25.normal}" onchange="saveConfig('${type}', 25, '${id}', 'normal', this.value)">
            <input type="number" value="${config25.heroic}" onchange="saveConfig('${type}', 25, '${id}', 'heroic', this.value)">
            <input type="number" value="${config25.bonus}" onchange="saveConfig('${type}', 25, '${id}', 'bonus', this.value)">
        `;

        grid10.appendChild(row10);
        grid25.appendChild(row25);
    });
}

function saveConfig(type, size, id, field, value) {
    const key = `dkp-config-${type}-${size}`;
    let data = JSON.parse(localStorage.getItem(key)) || {};

    if (!data[id]) {
        data[id] = { normal: 0, heroic: 0, bonus: 0 };
    }

    data[id][field] = parseInt(value) || 0;

    localStorage.setItem(key, JSON.stringify(data));
}

function closeConfig() {
    document.getElementById("configModal").classList.add("hidden");
}

function clearConfig() {
    const type = getPageType();

    const confirmClear = confirm("Tem certeza que deseja limpar todas as configurações?");
    if (!confirmClear) return;

    localStorage.removeItem(`dkp-config-${type}-10`);
    localStorage.removeItem(`dkp-config-${type}-25`);

    for (let id in state) {
        state[id].normal = 1;
        state[id].heroic = 1;
        state[id].bonus = 0;
        state[id].active = null;

        const pointsEl = document.getElementById(`points-${id}`);
        const input = document.getElementById(`bonus-${id}`);
        const btnNormal = document.getElementById(`btn-normal-${id}`);
        const btnHeroic = document.getElementById(`btn-heroic-${id}`);

        if (pointsEl) pointsEl.innerText = 0;
        if (input) input.value = 0;
        if (btnNormal) btnNormal.classList.remove("active");
        if (btnHeroic) btnHeroic.classList.remove("active");
    }

    total = 0;
    updateTotal();

    openConfig(type);
}

function getConfig(type, id) {
    const saved = JSON.parse(localStorage.getItem(getStorageKey(type))) || {};

    return saved[id] || { normal: 0, heroic: 0, bonus: 0 };
}

function setRaidSize(size, el) {
    raidSize = size;
    localStorage.setItem("raidSize", size);

    document.querySelectorAll(".raid-size-buttons button").forEach(btn => {
        btn.classList.remove("active");
    });

    el.classList.add("active");

    const type = getPageType();

    initDefaultStorage(type);

    resetTotal();
    loadBosses(type);
}

function initDefaultStorage(type) {
    [10, 25].forEach(size => {
        const key = `dkp-config-${type}-${size}`;
        const existing = localStorage.getItem(key);

        if (!existing) {
            const defaults = defaultConfigs[type]?.[size];
            if (defaults) {
                localStorage.setItem(key, JSON.stringify(defaults));
            }
        }
    });
}

function getStoredConfigBySize(type, size) {
    return JSON.parse(localStorage.getItem(`dkp-config-${type}-${size}`)) || {};
}

function getPageType() {
    let path = window.location.pathname.toLowerCase();

    // remove barra final
    if (path.endsWith("/")) {
        path = path.slice(0, -1);
    }

    const file = path.split("/").pop();

    // homepage (GitHub Pages)
    if (!file || file === "" || file === "index.html") {
        return "icc";
    }

    if (file.includes("ruby")) return "ruby";
    if (file.includes("toc")) return "toc";

    return "icc";
}

document.getElementById("configModal").addEventListener("click", function(e) {
    if (e.target.id === "configModal") {
        closeConfig();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("raidSize");
    raidSize = saved ? parseInt(saved) : 25;

    const path = window.location.pathname;
    const type = getPageType();

    initDefaultStorage(type);

    const buttons = document.querySelectorAll(".raid-size-buttons button");
    buttons.forEach(btn => btn.classList.remove("active"));

    const btn = raidSize === 10 ? buttons[0] : buttons[1];
    if (btn) btn.classList.add("active");

    loadBosses(type);
});

