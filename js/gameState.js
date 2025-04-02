/**
 * Управление состоянием игры
 */

// Игровые переменные
let playerName = '';
let chronoCoins = 0;
let currentChapter = 'prologue';
let chapterProgress = 0;
let choices = {
    prologue: null,
    chapter1: null,
    chapter2: null,
    chapter3: null,
    chapter4: null,
    chapter5: null
};

// Объявления функций запуска глав (будут определены в соответствующих файлах)
// Этот блок решает проблему с ошибкой ReferenceError
window.startPrologue = window.startPrologue || function() {};
window.startChapter1 = window.startChapter1 || function() {};
window.startChapter2 = window.startChapter2 || function() {};
window.startChapter3 = window.startChapter3 || function() {};
window.startChapter4 = window.startChapter4 || function() {};
window.startChapter5 = window.startChapter5 || function() {};

// Стоимость открытия глав
const chapterRequirements = {
    prologue: 0,
    chapter1: 0,
    chapter2: 50,
    chapter3: 150,
    chapter4: 300,
    chapter5: 500
};

/**
 * Функция для обновления отображения монет
 */
function updateCoinsDisplay() {
    coinsValueDisplay.textContent = chronoCoins;
}

/**
 * Функция для добавления монет с анимацией
 * @param {number} amount - количество монет
 */
function addChronoCoins(amount) {
    chronoCoins += amount;
    updateCoinsDisplay();
    
    // Анимация получения монет
    coinsValueDisplay.classList.add('anomaly-detected');
    setTimeout(() => {
        coinsValueDisplay.classList.remove('anomaly-detected');
    }, 1000);
    
    saveGameProgress();
}

/**
 * Функция для сохранения игрового прогресса
 */
function saveGameProgress() {
    const gameState = {
        playerName,
        chronoCoins,
        currentChapter,
        chapterProgress,
        choices
    };
    localStorage.setItem('chronoSyncGame', JSON.stringify(gameState));
}

/**
 * Функция для загрузки игрового прогресса
 * @returns {boolean} есть ли сохраненный прогресс
 */
function loadGameProgress() {
    const savedState = localStorage.getItem('chronoSyncGame');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        playerName = gameState.playerName;
        chronoCoins = gameState.chronoCoins;
        currentChapter = gameState.currentChapter;
        chapterProgress = gameState.chapterProgress;
        choices = gameState.choices;
        
        // Обновляем отображение монет
        updateCoinsDisplay();
        return true;
    }
    return false;
}

/**
 * Функция для сброса прогресса
 */
function resetGameProgress() {
    localStorage.removeItem('chronoSyncGame');
    playerName = '';
    chronoCoins = 0;
    currentChapter = 'prologue';
    chapterProgress = 0;
    choices = {
        prologue: null,
        chapter1: null,
        chapter2: null,
        chapter3: null,
        chapter4: null,
        chapter5: null
    };
    updateCoinsDisplay();
}

/**
 * Проверяет, доступна ли следующая глава
 * @param {string} chapter - название главы
 * @returns {boolean} доступна ли глава
 */
function isChapterAvailable(chapter) {
    return chronoCoins >= chapterRequirements[chapter];
}

/**
 * Создает кнопку для перехода к следующей главе
 * @param {string} nextChapter - название следующей главы
 * @param {number} delay - задержка перед отображением кнопки
 */
function createNextChapterButton(nextChapter, delay = 2000) {
    const chapters = {
        'chapter1': { title: 'НАЧАТЬ ГЛАВУ 1: "СИГНАЛЫ"', fn: window.startChapter1 },
        'chapter2': { title: 'НАЧАТЬ ГЛАВУ 2: "ЭХО ПРОШЛОГО"', fn: window.startChapter2 },
        'chapter3': { title: 'НАЧАТЬ ГЛАВУ 3: "РАЗЛОМ"', fn: window.startChapter3 },
        'chapter4': { title: 'НАЧАТЬ ГЛАВУ 4: "СИНХРОНИЗАЦИЯ"', fn: window.startChapter4 },
        'chapter5': { title: 'НАЧАТЬ ГЛАВУ 5: "БЕСКОНЕЧНОСТЬ"', fn: window.startChapter5 }
    };
    
    setTimeout(() => {
        choicesContainer.innerHTML = '';
        
        if (isChapterAvailable(True)) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('choice-button');
            nextButton.textContent = chapters[nextChapter].title;
            nextButton.addEventListener('click', () => {
                playButtonSound();
                chapters[nextChapter].fn();
            });
            choicesContainer.appendChild(nextButton);
        } else {
            // Сообщаем о необходимости набрать больше монет
            const notEnoughCoinsMessage = document.createElement('div');
            notEnoughCoinsMessage.classList.add('terminal-line', 'system-text');
            notEnoughCoinsMessage.textContent = `НЕДОСТАТОЧНО ХРОНО-МОНЕТ. ТРЕБУЕТСЯ: ${chapterRequirements[nextChapter]}. У ВАС: ${chronoCoins}`;
            notEnoughCoinsMessage.style.color = '#ff5555';
            terminalOutput.appendChild(notEnoughCoinsMessage);
            
            // Кнопка для перезапуска текущей главы
            const currentChapterName = currentChapter.charAt(0).toUpperCase() + currentChapter.slice(1);
            const retryButton = document.createElement('button');
            retryButton.classList.add('choice-button');
            retryButton.textContent = `ПОВТОРИТЬ ГЛАВУ ${currentChapterName === 'Prologue' ? 'ПРОЛОГ' : currentChapterName.split('chapter')[1]}`;
            retryButton.addEventListener('click', () => {
                playButtonSound();
                // Запускаем соответствующую главу заново
                const chapterFunctions = {
                    'prologue': window.startPrologue,
                    'chapter1': window.startChapter1,
                    'chapter2': window.startChapter2,
                    'chapter3': window.startChapter3,
                    'chapter4': window.startChapter4,
                    'chapter5': window.startChapter5
                };
                
                if (chapterFunctions[currentChapter]) {
                    chapterFunctions[currentChapter]();
                }
            });
            choicesContainer.appendChild(retryButton);
        }
    }, delay);
}
