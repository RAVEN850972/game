/**
 * Управление аудио эффектами
 */

// Аудио элементы
const typingSound = document.getElementById('typing-sound');
const buttonSound = document.getElementById('button-sound');
const terminalOnSound = document.getElementById('terminal-on');
const anomalyFoundSound = document.getElementById('anomaly-found');
const chapterCompleteSound = document.getElementById('chapter-complete');

/**
 * Функция для проигрывания звука печати
 */
function playTypingSound() {
    if (typingSound.paused) {
        typingSound.currentTime = 0;
        typingSound.play().catch(error => console.log('Ошибка воспроизведения звука:', error));
    }
}

/**
 * Функция для остановки звука печати
 */
function stopTypingSound() {
    typingSound.pause();
    typingSound.currentTime = 0;
}

/**
 * Функция для проигрывания звука нажатия кнопки
 */
function playButtonSound() {
    buttonSound.currentTime = 0;
    buttonSound.play().catch(error => console.log('Ошибка воспроизведения звука:', error));
}

/**
 * Функция для проигрывания звука включения терминала
 */
function playTerminalOnSound() {
    terminalOnSound.currentTime = 0;
    terminalOnSound.play().catch(error => console.log('Ошибка воспроизведения звука:', error));
}

/**
 * Функция для проигрывания звука обнаружения аномалии
 */
function playAnomalySound() {
    anomalyFoundSound.currentTime = 0;
    anomalyFoundSound.play().catch(error => console.log('Ошибка воспроизведения звука:', error));
}

/**
 * Функция для проигрывания звука завершения главы
 */
function playChapterCompleteSound() {
    chapterCompleteSound.currentTime = 0;
    chapterCompleteSound.play().catch(error => console.log('Ошибка воспроизведения звука:', error));
}
