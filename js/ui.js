/**
 * Управление пользовательским интерфейсом
 */

/**
 * Показать стартовый оверлей
 */
function showStartOverlay() {
    startOverlay.style.display = 'flex';
    terminalOutput.innerHTML = '';
    voicesContainer.innerHTML = '';
    voicesContainer.style.display = 'none';
    choicesContainer.innerHTML = '';
    nameInputContainer.style.display = 'none';
}

/**
 * Показать ввод имени
 */
function showNameInput() {
    choicesContainer.innerHTML = '';
    nameInputContainer.style.display = 'flex';
    playerNameInput.focus();
}

/**
 * Обработка ввода имени
 */
function handleNameSubmit() {
    const inputName = playerNameInput.value.trim();
    playerName = inputName || 'АЛЕКС';
    nameInputContainer.style.display = 'none';
    saveGameProgress();
    startPrologue();
}

/**
 * Показать меню продолжения игры
 */
function showContinueMenu() {
    clearTerminal();
    
    printSystemText('СИСТЕМА ЗАГРУЖАЕТСЯ...', 80).then(() => {
        printSystemText('ТЕРМИНАЛ TimeSecurity ХРОНО v7.2.9', 50).then(() => {
            printSystemText(`ОБНАРУЖЕНО СОХРАНЕНИЕ ДЛЯ ПОЛЬЗОВАТЕЛЯ: ${playerName}`, 50).then(() => {
                choicesContainer.innerHTML = '';
                
                // Кнопка продолжения
                const continueButton = document.createElement('button');
                continueButton.classList.add('choice-button');
                continueButton.textContent = 'ПРОДОЛЖИТЬ ИГРУ';
                continueButton.addEventListener('click', () => {
                    playButtonSound();
                    continueGame();
                });
                choicesContainer.appendChild(continueButton);
                
                // Кнопка новой игры
                const newGameButton = document.createElement('button');
                newGameButton.classList.add('choice-button');
                newGameButton.textContent = 'НАЧАТЬ НОВУЮ ИГРУ';
                newGameButton.addEventListener('click', () => {
                    playButtonSound();
                    resetGameProgress();
                    showNameInput();
                });
                choicesContainer.appendChild(newGameButton);
            });
        });
    });
}

/**
 * Продолжить игру с последней точки
 */
function continueGame() {
    if (currentChapter === 'prologue') {
        startPrologue();
    } else if (currentChapter === 'chapter1') {
        startChapter1();
    } else if (currentChapter === 'chapter2') {
        startChapter2();
    } else if (currentChapter === 'chapter3') {
        startChapter3();
    } else if (currentChapter === 'chapter4') {
        startChapter4();
    } else if (currentChapter === 'chapter5') {
        startChapter5();
    } else {
        // По умолчанию начинаем с пролога
        startPrologue();
    }
}
