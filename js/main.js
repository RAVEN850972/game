/**
 * Главный файл инициализации игры
 */

// Инициализация игры
function initGame() {
    // Инициализация стартового оверлея
    startGameBtn.addEventListener('click', () => {
        playTerminalOnSound();
        startOverlay.style.display = 'none';
        
        // Проверяем наличие сохраненного прогресса
        if (loadGameProgress() && playerName) {
            // Показываем меню продолжения игры
            showContinueMenu();
        } else {
            // Показываем ввод имени
            showNameInput();
        }
    });
    
    // Инициализация ввода имени
    nameSubmitBtn.addEventListener('click', handleNameSubmit);
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleNameSubmit();
        }
    });
}

// Запуск игры при загрузке страницы
window.addEventListener('DOMContentLoaded', initGame);
