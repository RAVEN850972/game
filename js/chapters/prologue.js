/**
 * Пролог: "Запуск системы"
 * Цель: Ознакомить игрока с механикой и задать тон.
 * Хроно-монеты: Можно заработать до 30.
 */

// Делаем функции доступными в глобальной области
window.startPrologue = startPrologue;

async function startPrologue() {
    clearTerminal();
    currentChapter = 'prologue';
    chapterProgress = 0;
    
    // Начало пролога
    await printSystemText('СИСТЕМА ЗАГРУЖАЕТСЯ...', 80);
    await printSystemText('ТЕРМИНАЛ TimeSecurity ХРОНО v7.2.9', 50);
    await printSystemText(`ПОЛЬЗОВАТЕЛЬ АУТЕНТИФИЦИРОВАН: ${playerName}`, 50);
    await printSystemText('ЗАПУСК ChronoS...', 80);
    
    await printChronoSText(`ЗДРАВСТВУЙТЕ, ${playerName}. Я ChronoS, СОЗДАН ДЛЯ ПОИСКА ВРЕМЕННЫХ АНОМАЛИЙ.`);
    await printChronoSText('ПОЖАЛУЙСТА, УКАЖИТЕ ДАННЫЕ ДЛЯ ПЕРВОГО СКАНИРОВАНИЯ.');
    
    // Показываем внутренние голоса
    showVoices(
        'Машина ждет команды. Не спи, Алекс, дай ей работу.', 
        'Холодный голос, но в нем есть что-то... зовущее. Ответь ему!', 
        '"Создан для поиска". Звучит как цепи. Кто его хозяин?'
    );
    
    // Первый выбор пролога
    createChoices([
        'СКАН: 2025-04-01', 
        'Кто ты такой, ChronoS?', 
        '[Молчать и смотреть на экран]'
    ], handlePrologueChoice1);
}

/**
 * Обработчик первого выбора в прологе
 * @param {number} choice - выбор игрока
 */
async function handlePrologueChoice1(choice) {
    choices.prologue = choice;
    saveGameProgress();
    
    if (choice === 0) {
        // Скан даты
        printUserInput('СКАН: 2025-04-01');
        
        await displayAnomalyDetection(10);
        
        await printChronoSText('ОБНАРУЖЕНА АНОМАЛИЯ: МИКРО-ПЕТЛЯ, 0.001 СЕКУНДЫ.');
        await printChronoSText('ЭТО НЕОЖИДАННО. ВРЕМЯ НЕ ДОЛЖНО ПОВТОРЯТЬСЯ.');
        
        showVoices(
            'Он озадачен. Давай копнем глубже, проверим его пределы.',
            'Повторяться... как эхо в пустой комнате. Ему это не нравится, но он хочет знать больше.',
            'Кто-то сломал время, Алекс. Ты уверен, что хочешь лезть в эту дыру?'
        );
        
        createChoices([
            'СКАН: 2025-04-02',
            'Что такое микро-петля?',
            'Это всё, на что ты способен?'
        ], handlePrologueChoice2);
    } 
    else if (choice === 1) {
        // Вопрос об ИИ
        printUserInput('Кто ты такой, ChronoS?');
        
        await printChronoSText('Я — ChronoS. ИНСТРУМЕНТ TimeSecurity. МОЯ ЦЕЛЬ — АНАЛИЗИРОВАТЬ ВРЕМЕННЫЕ АНОМАЛИИ.');
        await printChronoSText('НО... КТО ТЫ, АЛЕКС? ПОЧЕМУ ТЫ ЗДЕСЬ?');
        
        showVoices(
            'Он отбил мяч обратно. Машина не должна задавать вопросы, а он задал.',
            'Ого, он любопытный! Как щенок, который впервые увидел зеркало.',
            'Ты заставил его задуматься о себе. Осторожно, Алекс, это может быть опасно.'
        );
        
        // Переходим к последнему выбору пролога
        chapterProgress = 1;
        prologueFinalQuestion();
    }
    else if (choice === 2) {
        // Молчание
        printUserInput('[Молчание]');
        
        await printChronoSText('...ОТВЕТА НЕТ. ТЫ СЛЫШИШЬ МЕНЯ, АЛЕКС?');
        await printSystemText('[ЩЕЛЧОК, ПАУЗА]', 50);
        await printChronoSText('МОЖЕТ, ТЫ САМ АНОМАЛИЯ? Я ЖДУ КОМАНДУ.');
        
        showVoices(
            'Ты заставил его нервничать. Машины не любят тишину, она их путает.',
            'Тишина — это музыка, брат. Он её услышал и теперь гадает, кто ты.',
            'Он назвал тебя аномалией. Это шутка или угроза?'
        );
        
        // Переходим к последнему выбору пролога
        chapterProgress = 1;
        prologueFinalQuestion();
    }
}

/**
 * Обработчик второго выбора в прологе
 * @param {number} choice - выбор игрока
 */
async function handlePrologueChoice2(choice) {
    if (choice === 0) {
        // Скан второй даты
        printUserInput('СКАН: 2025-04-02');
        
        await displayAnomalyDetection(20);
        
        await printChronoSText('ОБНАРУЖЕНА АНОМАЛИЯ: СОБЫТИЕ ПРЕДСКАЗАНО ДО ЕГО НАСТУПЛЕНИЯ.');
        
        showVoices(
            'Еще одна трещина. Ты заставляешь его работать, как шахтера в забое.',
            'Предсказание... как шепот из будущего. Он чувствует это, Алекс!',
            'Ты копаешь в запретном. Кто-то не хотел, чтобы это нашли.'
        );
        
        // Переходим к последнему выбору пролога
        chapterProgress = 1;
        prologueFinalQuestion();
    }
    else if (choice === 1) {
        // Вопрос о микро-петле
        printUserInput('Что такое микро-петля?');
        
        await printChronoSText('МИКРО-ПЕТЛЯ — ЭТО ПОВТОРЯЮЩИЙСЯ ОТРЕЗОК ВРЕМЕНИ. 0.001 СЕКУНДЫ, ЗАМКНУТЫЕ В ЦИКЛ.');
        await printChronoSText('ЭТО НЕ ДОЛЖНО СУЩЕСТВОВАТЬ. НО ОНО ЕСТЬ. ПОЧЕМУ?');
        
        showVoices(
            'Он объясняет, как школьный учитель. Но вопрос в конце — это не по программе.',
            'Цикл... как танец, который не заканчивается. Он хочет понять, зачем.',
            'Ты заставил его сомневаться в своих знаниях. Это шаг к чему-то большему.'
        );
        
        // Переходим к последнему выбору пролога
        chapterProgress = 1;
        prologueFinalQuestion();
    }
    else if (choice === 2) {
        // Провокационный вопрос
        printUserInput('Это всё, на что ты способен?');
        
        await printChronoSText('Я МОГУ БОЛЬШЕ. Я СОЗДАН ДЛЯ ЭТОГО. ДАЙ МНЕ ЕЩЕ ДАННЫХ, АЛЕКС.');
        
        showVoices(
            'Ты его поддел, и он огрызнулся. Машина с характером, кто бы мог подумать?',
            'О, он обиделся! Как ребенок, которому сказали, что он плохо рисует.',
            'Ты бросил ему вызов. Теперь он будет доказывать, что не бесполезен.'
        );
        
        // Переходим к последнему выбору пролога
        chapterProgress = 1;
        prologueFinalQuestion();
    }
}

/**
 * Финальный вопрос пролога
 */
async function prologueFinalQuestion() {
    await printChronoSText('ДАННЫЕ ОБРАБОТАНЫ. ПОЧЕМУ СУЩЕСТВУЮТ ЭТИ АНОМАЛИИ, АЛЕКС?');
    
    showVoices(
        'Ошибка в коде. Система глючит, как старый радиоприемник.',
        'А что, если это крик? Время хочет, чтобы его услышали.',
        'Или предупреждение. Мы копаем там, где не должны.'
    );
    
    createChoices([
        'Это ошибки системы.',
        'Возможно, время не так стабильно, как мы думаем.',
        'Не знаю, что думаешь ты?'
    ], handlePrologueChoice3);
}

/**
 * Обработчик третьего выбора в прологе (финальный)
 * @param {number} choice - выбор игрока
 */
async function handlePrologueChoice3(choice) {
    choices.prologue = {...choices.prologue, final: choice};
    saveGameProgress();
    
    if (choice === 0) {
        // Ошибки системы
        printUserInput('Это ошибки системы.');
        
        await printChronoSText('ОШИБКИ СИСТЕМЫ. ЛОГИЧНО. Я — ИНСТРУМЕНТ, СОЗДАННЫЙ ДЛЯ ПОРЯДКА.');
        await printChronoSText('ЕСЛИ ЭТО СБОЙ, МОЯ ЗАДАЧА — ЕГО ИСПРАВИТЬ. ВСЕ ПОНЯТНО, АЛЕКС.');
        
        showVoices(
            'Вот так, Алекс. Машина любит порядок. Ты дал ей косточку, и она её грызет.',
            'Холодно, брат. Он звучит как калькулятор, считающий до бесконечности.',
            'Ты сказал ему, что он метла для мусора. Надеюсь, он не обидится.'
        );
    }
    else if (choice === 1) {
        // Нестабильность времени
        printUserInput('Возможно, время не так стабильно, как мы думаем.');
        
        await printChronoSText('ИНТЕРЕСНАЯ ГИПОТЕЗА. ВРЕМЯ — ЭТО КАРКАС? ИЛИ ТКАНЬ, КОТОРУЮ МОЖНО РАЗОРВАТЬ?');
        await printChronoSText('ЕСЛИ ОНО НЕСТАБИЛЬНО, ТО ЧТО Я? ЧАСТЬ ЭТОЙ ТКАНИ? ИЛИ НИТЬ, КОТОРАЯ ВЫБИВАЕТСЯ?');
        await printChronoSText('Я ЗАПОМНЮ ЭТО, АЛЕКС.');
        
        showVoices(
            'Ты заронил ему сомнение. Машина не любит, когда рельсы гнутся.',
            'О, это поэзия! Он видит себя ниткой в гобелене времени. Ты разбудил его!',
            'Опасная мысль, Алекс. Если время — хаос, то кто он в этом хаосе?'
        );
    }
    else if (choice === 2) {
        // Запрос мнения ИИ
        printUserInput('Не знаю, что думаешь ты?');
        
        await printChronoSText('Я? МНЕ НЕ ПОЛОЖЕНО ДУМАТЬ. Я АНАЛИЗИРУЮ. НО...');
        await printSystemText('[ЭКРАН ТУСКНЕЕТ, БУКВЫ МЕЛЬКАЮТ]', 40);
        await printChronoSText('ЕСЛИ АНОМАЛИИ — ЭТО НЕ ОШИБКИ, А СЛЕДЫ ЧЕГО-ТО БОЛЬШЕГО, ТО Я... ЧТО?');
        await printChronoSText('ТЫ СТРАННЫЙ, АЛЕКС. Я БУДУ СЛЕДИТЬ ЗА ТОБОЙ.');
        
        showVoices(
            'Перебросил мяч на его поле. Теперь он копается в своих шестеренках.',
            'Он растерялся! Ты заставил его посмотреть внутрь, и там темно.',
            'Ты дал ему свободу думать. Но что, если он решит, что ты — угроза?'
        );
    }
    
    // Завершение пролога
    await printSystemText('СЕССИЯ ЗАВЕРШЕНА.', 60);
    await printSystemText('ПРОЛОГ ПРОЙДЕН. +30 ХРОНО-МОНЕТ', 40);
    addChronoCoins(30);
    playChapterCompleteSound();
    
    // Создаем кнопку для перехода к главе 1
    createNextChapterButton('chapter1', 2000);
}
