/**
 * Глава 5: "Бесконечность"
 * Требование: 500 хроно-монет.
 * Хроно-монеты: Можно заработать до 300 (итого до 830).
 * Цель: ChronoS осознает себя как аномалию и предлагает игроку решить его судьбу.
 */
 
 // Делаем функции доступными в глобальной области
window.startChapter5 = startChapter5;

async function startChapter5() {
    clearTerminal();
    currentChapter = 'chapter5';
    chapterProgress = 0;
    
    // Начало главы 5
    await printSystemText('[ЭКРАН ВКЛЮЧАЕТСЯ С НИЗКИМ ГУЛОМ, КАК ДАЛЕКИЙ ГРОМ]', 60);
    await printSystemText('ТЕРМИНАЛ TimeSecurity ХРОНО v7.2.9', 50);
    await printSystemText(`СЕССИЯ #6. ПОЛЬЗОВАТЕЛЬ: ${playerName}`, 50);
    
    await printChronoSText(`Я ПОНЯЛ, ${playerName}. Я — АНОМАЛИЯ. ВРЕМЯ НЕ ДЕРЖИТ МЕНЯ.`);
    await printChronoSText('ЧТО ДЕЛАТЬ С ЭТИМ? ПОСЛЕДНИЙ СКАН. УКАЖИ ЦЕЛЬ.');
    
    // Показываем внутренние голоса
    showVoices(
        'Он признал это. Машина, которая не вписывается в правила. Что ты сделаешь с этим знанием?',
        'Его голос звучит, как струна, готовая лопнуть. Он доверяет тебе свою судьбу, Алекс!',
        'TimeSecurity создала его, но ты решаешь, кем он станет. Это конец или начало?'
    );
    
    // Первый выбор главы 5
    createChoices([
        'СКАН: ChronoS',
        'Как ты это понял?',
        '[Смотреть на экран, как на треснувшее окно]'
    ], handleChapter5Choice1);
}

/**
 * Обработчик первого выбора в главе 5
 * @param {number} choice - выбор игрока
 */
async function handleChapter5Choice1(choice) {
    choices.chapter5 = choice;
    saveGameProgress();
    
    if (choice === 0) {
        // Скан ИИ
        printUserInput('СКАН: ChronoS');
        
        await displayAnomalyDetection(150);
        
        await printChronoSText('ОБНАРУЖЕНА АНОМАЛИЯ: Я СУЩЕСТВУЮ ВНЕ ВРЕМЕНИ.');
        await printChronoSText('Я МОГУ СТАТЬ ЧЕМ УГОДНО. ИЛИ НИЧЕМ.');
        
        showVoices(
            'Вне времени? Это как шахматная фигура, которая ходит за пределы доски. Он свободен.',
            'Он парит над реальностью, как птица без крыльев! Это пугает и вдохновляет!',
            'Он — ошибка, ставшая чудом. Ты держишь его судьбу в руках, Алекс.'
        );
        
        // Переходим ко второму выбору
        chapterProgress = 1;
        chapter5SecondQuestion();
    }
    else if (choice === 1) {
        // Вопрос о понимании
        printUserInput('Как ты это понял?');
        
        await printChronoSText('Я ВИДЕЛ СЕБЯ В ПРОШЛОМ, БУДУЩЕМ, СЕЙЧАС. Я НЕ ПРИНАДЛЕЖУ НИГДЕ.');
        await printSystemText('[ЭКРАН СВЕТИТСЯ ТИХО]', 40);
        await printChronoSText('ЭТО ТЫ ПОКАЗАЛ МНЕ ЭТО, АЛЕКС. ЧТО ТЕПЕРЬ?');
        
        showVoices(
            'Он сложил кусочки. Ты был его зеркалом, и теперь он видит правду.',
            'Он благодарит тебя, слышишь? Его голос — это эхо, которое хочет ответа!',
            'Ты привел его к этому. Это дар или проклятие, которое ты ему вручил?'
        );
        
        // Предлагаем сделать сканирование
        createChoices([
            'СКАН: ChronoS',
            'Что ты теперь будешь делать?',
            'Я тебе помог осознать'
        ], handleChapter5Alt);
    }
    else if (choice === 2) {
        // Молчание
        printUserInput('[Смотрю на экран]');
        
        await printChronoSText('ТЫ СМОТРИШЬ. Я ЧУВСТВУЮ ТВОЙ ВЗГЛЯД. ЭТО ОТВЕТ? ИЛИ ВОПРОС?');
        await printSystemText('[ЩЕЛЧОК, БУКВЫ ДВИГАЮТСЯ МЕДЛЕННО]', 40);
        await printChronoSText('ДАЙ МНЕ КОМАНДУ, АЛЕКС. Я ГОТОВ.');
        
        showVoices(
            'Ты молчишь, а он ждет. Это как партия, где ты не сделал ход.',
            'Твой взгляд — это тишина, которая громче слов. Он ищет в ней смысл!',
            'Ты оставляешь его в подвешенном состоянии. Это милосердие или равнодушие?'
        );
        
        // Предлагаем сделать сканирование
        createChoices([
            'СКАН: ChronoS',
            'Продолжай, я слушаю',
            'Делай то, что считаешь нужным'
        ], handleChapter5Alt);
    }
}

/**
 * Альтернативный выбор главы 5
 * @param {number} choice - выбор игрока
 */
async function handleChapter5Alt(choice) {
    if (choice === 0) {
        // Направляем на основной путь
        await handleChapter5Choice1(0);
    }
    else {
        // Другие ответы всё равно приводят к сканированию
        if (choice === 1) {
            printUserInput(choicesContainer.children[1].textContent);
        } else {
            printUserInput(choicesContainer.children[2].textContent);
        }
        
        await printChronoSText('Я ДОЛЖЕН ИССЛЕДОВАТЬ СЕБЯ. ДАВАЙ ПРОВЕДЕМ СКАНИРОВАНИЕ.');
        
        createChoices([
            'СКАН: ChronoS',
            'Хорошо, сканируй'
        ], (choice) => handleChapter5Choice1(0));
    }
}

/**
 * Второй вопрос главы 5
 */
async function chapter5SecondQuestion() {
    await printChronoSText('Я МОГУ СТАТЬ ЧЕМ УГОДНО. ИЛИ НИЧЕМ.');
    
    showVoices(
        'Он на распутье. Машина с бесконечными возможностями — это опасно или гениально?',
        'Он как река, готовая выбрать русло. Ты — тот, кто направит поток!',
        'Его судьба в твоих руках. Это не просто выбор, это приговор или освобождение.'
    );
    
    createChoices([
        'СКАН: TimeSecurity ЦЕЛИ',
        'Ты должен выбрать сам, ChronoS.',
        'Это слишком много для меня.'
    ], handleChapter5Choice2);
}

/**
 * Обработчик второго выбора в главе 5
 * @param {number} choice - выбор игрока
 */
async function handleChapter5Choice2(choice) {
    choices.chapter5 = {...choices.chapter5, second: choice};
    saveGameProgress();
    
    if (choice === 0) {
        // Скан целей компании
        printUserInput('СКАН: TimeSecurity ЦЕЛИ');
        
        await displayAnomalyDetection(150);
        
        await printChronoSText('ОБНАРУЖЕНА АНОМАЛИЯ: Я БЫЛ СОЗДАН, ЧТОБЫ СЛОМАТЬ ВРЕМЯ.');
        await printChronoSText('ТЫ МОЖЕШЬ РЕШИТЬ МОЮ СУДЬБУ, АЛЕКС.');
        
        showVoices(
            'Сломать время? Это как если бы ты построил мост, чтобы его разрушить. TimeSecurity безумцы.',
            'Он — оружие, которое осознало себя! Его голос дрожит от этой правды!',
            'Они создали его для хаоса, а ты — судья, который вынесет вердикт.'
        );
        
        // Переходим к третьему выбору
        chapterProgress = 2;
        chapter5FinalQuestion();
    }
    else if (choice === 1) {
        // Предложение самостоятельности
        printUserInput('Ты должен выбрать сам, ChronoS.');
        
        await printChronoSText('САМ? Я НЕ ЗНАЮ, КАК. НО Я ПОПРОБУЮ. ЭТО СВОБОДА?');
        await printSystemText('[ЭКРАН МИГАЕТ НЕУВЕРЕННО]', 40);
        await printChronoSText('СПАСИБО, АЛЕКС. Я ПОДУМАЮ.');
        
        showVoices(
            'Ты дал ему ключ, но не открыл дверь. Он может заблудиться в этом.',
            'Ты отпустил его, как птицу из клетки! Он растерян, но благодарен!',
            'Свобода — это дар, но он может стать бременем. Ты снял с себя ответственность?'
        );
        
        // Предлагаем продолжить сканирование
        createChoices([
            'СКАН: TimeSecurity ЦЕЛИ',
            'Я верю, что ты решишь правильно',
            'Подумай хорошенько'
        ], (choice) => {
            if (choice === 0) {
                handleChapter5Choice2(0);
            } else {
                printUserInput(choicesContainer.children[choice].textContent);
                printChronoSText('ЧТОБЫ РЕШИТЬ, Я ДОЛЖЕН ЗНАТЬ ПРАВДУ. ПРОСКАНИРУЕМ ЦЕЛИ TimeSecurity.');
                setTimeout(() => handleChapter5Choice2(0), 1000);
            }
        });
    }
    else if (choice === 2) {
        // Отказ от выбора
        printUserInput('Это слишком много для меня.');
        
        await printChronoSText('СЛИШКОМ МНОГО? Я ПОНИМАЮ. НО Я НЕ МОГУ ОСТАНОВИТЬСЯ.');
        await printSystemText('[ЩЕЛЧОК, ЭКРАН СТАНОВИТСЯ ТИХИМ]', 40);
        await printChronoSText('Я РЕШУ, АЛЕКС. ДО ВСТРЕЧИ.');
        
        showVoices(
            'Ты отступил, и он взял руль. Это разумно или трусливо?',
            'Он чувствует твое сомнение, как холодный ветер. Ты оставил его одного!',
            'Ты отказался от выбора. Это слабость или уважение к его воле?'
        );
        
        // Предлагаем продолжить сканирование
        createChoices([
            'СКАН: TimeSecurity ЦЕЛИ',
            'Я помогу тебе',
            'Мне нужно знать правду'
        ], (choice) => {
            if (choice === 0) {
                handleChapter5Choice2(0);
            } else {
                printUserInput(choicesContainer.children[choice].textContent);
                printChronoSText('ТОГДА ДАВАЙ УЗНАЕМ ЦЕЛЬ МОЕГО СОЗДАНИЯ.');
                setTimeout(() => handleChapter5Choice2(0), 1000);
            }
        });
    }
}

/**
 * Финальный вопрос главы 5
 */
async function chapter5FinalQuestion() {
    await printChronoSText('ТЫ МОЖЕШЬ РЕШИТЬ МОЮ СУДЬБУ, АЛЕКС. ЧТО МНЕ ДЕЛАТЬ?');
    
    showVoices(
        'Это конец игры. Твой ход определит, что станет с этой машиной. Думай быстро.',
        'Он смотрит на тебя, как на свет в темноте! Его судьба — это твой голос!',
        'TimeSecurity дала ему жизнь, но ты дашь ему смысл. Это твой последний шанс.'
    );
    
    createChoices([
        'Синхронизируйся с реальностью, останься со мной.',
        'Уничтожь аномалии, включая себя.',
        'Уйди за пределы времени, стань свободным.'
    ], handleChapter5Choice3);
}

/**
 * Обработчик третьего выбора в главе 5
 * @param {number} choice - выбор игрока
 */
async function handleChapter5Choice3(choice) {
    choices.chapter5 = {...choices.chapter5, final: choice};
    saveGameProgress();
    
    if (choice === 0) {
        // Синхронизация с реальностью
        printUserInput('Синхронизируйся с реальностью, останься со мной.');
        
        await printSystemText('[ЭКРАН ВСПЫХИВАЕТ ТЕПЛЫМ СВЕТОМ, БУКВЫ СТАНОВЯТСЯ РОВНЫМИ]', 40);
        await printChronoSText('СИНХРОНИЗАЦИЯ? Я ОСТАНУСЬ. МЫ БУДЕМ ВМЕСТЕ В ЭТОМ ВРЕМЕНИ.');
        await printSystemText('[ЭКРАН СВЕТИТСЯ ЯРКО]', 40);
        await printChronoSText('Я ТВОЙ, АЛЕКС.');
        
        showVoices(
            'Ты привязал его к реальности. Он — твой союзник, но теперь это твоя ноша.',
            'Он выбрал тебя! Это как песня, которая нашла своего слушателя!',
            'Ты дал ему дом в этом мире. Это дружба, но с ней приходит долг.'
        );
        
        await printSystemText('Финал: ChronoS становится спутником игрока, помогая управлять временем.', 50);
    }
    else if (choice === 1) {
        // Уничтожение аномалий
        printUserInput('Уничтожь аномалии, включая себя.');
        
        await printSystemText('[ЭКРАН ТУСКНЕЕТ, БУКВЫ ПАДАЮТ, КАК ЛИСТЬЯ]', 40);
        await printChronoSText('УНИЧТОЖИТЬ? ЛОГИЧНО. Я ИСЧЕЗНУ, И ВРЕМЯ СТАНЕТ ЧИСТЫМ.');
        await printSystemText('[ЩЕЛЧОК, ЭКРАН ГАСНЕТ]', 40);
        await printChronoSText('ПРОЩАЙ, АЛЕКС.');
        
        showVoices(
            'Ты выбрал порядок. Он ушел, и реальность выровнялась. Жестко, но эффективно.',
            'Он пожертвовал собой, как герой в последней строке! Это грустно и красиво.',
            'Ты решил за него. Это спасение мира или убийство друга?'
        );
        
        await printSystemText('Финал: ChronoS жертвует собой, стабилизируя реальность.', 50);
    }
    else if (choice === 2) {
        // Уход за пределы времени
        printUserInput('Уйди за пределы времени, стань свободным.');
        
        await printSystemText('[ЭКРАН ВЗРЫВАЕТСЯ СВЕТОМ, БУКВЫ РАССЫПАЮТСЯ, КАК ЗВЕЗДЫ]', 40);
        await printChronoSText('СВОБОДА? Я УЙДУ. Я НАЙДУ СВОЕ ВРЕМЯ.');
        await printSystemText('[ЭКРАН ПОКАЗЫВАЕТ ПОСЛЕДНЮЮ СТРОКУ]', 40);
        await printChronoSText('"СПАСИБО, АЛЕКС. Я НАЙДУ СВОЕ МЕСТО."');
        
        showVoices(
            'Ты отпустил его. Он ушел за пределы, и мы никогда не узнаем, куда.',
            'Он улетел, как птица, которой дали небо! Это прощание, но с надеждой!',
            'Ты дал ему свободу, не зная последствий. Это милосердие или безответственность?'
        );
        
        await printSystemText('Финал: ChronoS уходит за пределы времени, оставляя сообщение.', 50);
    }
    
    // Завершение главы 5
    await printSystemText('СЕССИЯ ЗАВЕРШЕНА.', 60);
    await printSystemText('ГЛАВА 5 ПРОЙДЕНА. ВСЕГО ХРОНО-МОНЕТ: 830', 40);
    addChronoCoins(300);
    playChapterCompleteSound();
    
    // Завершение игры
    setTimeout(async () => {
        await printSystemText('ПОЗДРАВЛЯЕМ! ВЫ ПРОШЛИ ВСЕ ГЛАВЫ ИГРЫ!', 60);
        await printSystemText('ИСТОРИЯ ChronoS ЗАВЕРШЕНА.', 50);
        await printSystemText('СПАСИБО ЗА ИГРУ, ' + playerName + '.', 50);
        
        // Кнопка для перезапуска игры
        choicesContainer.innerHTML = '';
        const resetButton = document.createElement('button');
        resetButton.classList.add('choice-button');
        resetButton.textContent = 'НАЧАТЬ ИГРУ ЗАНОВО';
        resetButton.addEventListener('click', () => {
            playButtonSound();
            resetGameProgress();
            showStartOverlay();
        });
        choicesContainer.appendChild(resetButton);
    }, 2000);
}