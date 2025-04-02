/**
 * Утилиты для работы с игрой
 */

// DOM элементы
const terminalOutput = document.getElementById('terminal-output');
const voicesContainer = document.getElementById('voices-container');
const choicesContainer = document.getElementById('choices-container');
const nameInputContainer = document.getElementById('name-input-container');
const playerNameInput = document.getElementById('player-name');
const nameSubmitBtn = document.getElementById('name-submit');
const coinsValueDisplay = document.getElementById('coins-value');
const startOverlay = document.getElementById('start-overlay');
const startGameBtn = document.getElementById('start-game');

/**
 * Функция для очистки терминала
 */
function clearTerminal() {
    terminalOutput.innerHTML = '';
    voicesContainer.innerHTML = '';
    voicesContainer.style.display = 'none';
}

/**
 * Функция для типизированного вывода системного текста
 * @param {string} text - текст для вывода
 * @param {number} delay - задержка между символами
 * @returns {Promise} промис, который завершается когда текст напечатан
 */
function printSystemText(text, delay = 20) {
    return new Promise(resolve => {
        const element = document.createElement('div');
        element.classList.add('terminal-line', 'system-text');
        terminalOutput.appendChild(element);
        
        let i = 0;
        const typeInterval = setInterval(() => {
            playTypingSound();
            element.textContent = text.substring(0, i);
            i++;
            
            if (i > text.length) {
                clearInterval(typeInterval);
                stopTypingSound();
                
                // Прокрутка вниз
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                resolve();
            }
        }, delay);
    });
}

/**
 * Функция для типизированного вывода текста ИИ
 * @param {string} text - текст для вывода
 * @param {number} delay - задержка между символами
 * @returns {Promise} промис, который завершается когда текст напечатан
 */
function printChronoSText(text, delay = 40) {
    return new Promise(resolve => {
        const element = document.createElement('div');
        element.classList.add('terminal-line', 'chronos-text');
        terminalOutput.appendChild(element);
        
        let i = 0;
        const typeInterval = setInterval(() => {
            playTypingSound();
            element.textContent = '> ' + text.substring(0, i);
            i++;
            
            if (i > text.length) {
                clearInterval(typeInterval);
                stopTypingSound();
                
                // Прокрутка вниз
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                resolve();
            }
        }, delay);
    });
}

/**
 * Функция для вывода ввода пользователя
 * @param {string} text - текст для вывода
 */
function printUserInput(text) {
    const element = document.createElement('div');
    element.classList.add('terminal-line', 'user-input');
    element.textContent = `> ${playerName}: ${text}`;
    terminalOutput.appendChild(element);
    
    // Прокрутка вниз
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

/**
 * Функция для вывода внутренних голосов
 * @param {string} logic - текст логики
 * @param {string} emotion - текст эмоции
 * @param {string} ethics - текст этики
 */
function showVoices(logic, emotion, ethics) {
    voicesContainer.innerHTML = '';
    voicesContainer.style.display = 'block';
    
    if (logic) {
        const logicElement = document.createElement('div');
        logicElement.classList.add('voice', 'voice-logic');
        logicElement.textContent = '[ЛОГИКА] — ' + logic;
        voicesContainer.appendChild(logicElement);
    }
    
    if (emotion) {
        const emotionElement = document.createElement('div');
        emotionElement.classList.add('voice', 'voice-emotion');
        emotionElement.textContent = '[ЭМОЦИЯ] — ' + emotion;
        voicesContainer.appendChild(emotionElement);
    }
    
    if (ethics) {
        const ethicsElement = document.createElement('div');
        ethicsElement.classList.add('voice', 'voice-ethics');
        ethicsElement.textContent = '[ЭТИКА] — ' + ethics;
        voicesContainer.appendChild(ethicsElement);
    }
    
    // Прокрутка вниз
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

/**
 * Функция для создания кнопок выбора
 * @param {Array<string>} options - массив опций
 * @param {Function} callback - функция обратного вызова при выборе
 */
function createChoices(options, callback) {
    choicesContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.textContent = option;
        button.addEventListener('click', () => {
            playButtonSound();
            button.classList.add('anomaly-detected');
            setTimeout(() => {
                callback(index);
            }, 500);
        });
        choicesContainer.appendChild(button);
    });
}

/**
 * Функция для анимации обнаружения аномалии
 * @param {number} coins - количество монет
 * @returns {Promise} промис, который завершается когда анимация завершена
 */
function displayAnomalyDetection(coins) {
    return new Promise(async resolve => {
        playAnomalySound();
        
        // Анимация терминала
        terminalOutput.classList.add('anomaly-detected');
        
        await printSystemText('АНАЛИЗ...', 80);
        await printSystemText('[ЭКРАН МИГАЕТ, СИМВОЛЫ ПЛЫВУТ]', 40);
        await printSystemText('ОБНАРУЖЕНА АНОМАЛИЯ!', 60);
        
        // Добавляем монеты
        if (coins > 0) {
            await printSystemText(`+${coins} ХРОНО-МОНЕТ. ВСЕГО: ${chronoCoins + coins}`, 40);
            addChronoCoins(coins);
        }
        
        // Убираем анимацию
        setTimeout(() => {
            terminalOutput.classList.remove('anomaly-detected');
            resolve();
        }, 1000);
    });
}
