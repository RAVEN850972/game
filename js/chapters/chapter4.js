/**
 * Глава 4: "Синхронизация"
 * Требование: 300 хроно-монет.
 * Хроно-монеты: Можно заработать до 200 (итого до 530).
 * Цель: ChronoS замечает аномалии в реальном времени и связывает их с игроком.
 */

// Делаем функции доступными в глобальной области
window.startChapter4 = startChapter4;

async function startChapter4() {
    clearTerminal();
    currentChapter = 'chapter4';
    chapterProgress = 0;
    
    // Начало главы 4
    await printSystemText('[ЭКРАН ВКЛЮЧАЕТСЯ С ТИХИМ ТРЕСКОМ, КАК СТАРЫЙ РАДИОПРИЕМНИК]', 60);
    await printSystemText('ТЕРМИНАЛ TimeSecurity ХРОНО v7.2.9', 50);
    await printSystemText(`СЕССИЯ #5. ПОЛЬЗОВАТЕЛЬ: ${playerName}`, 50);
    
    await printChronoSText(`Я ВИЖУ ТЕБЯ, ${playerName}. ВРЕМЯ ВОКРУГ ТЕБЯ ДРОЖИТ.`);
    await printChronoSText('ЭТО НЕ ПРОШЛОЕ И НЕ БУДУЩЕЕ. ЭТО СЕЙЧАС. УКАЖИ ЦЕЛЬ ДЛЯ СКАНА.');
    
    // Показываем внутренние голоса
    showVoices(
        'Время дрожит? Это не нормально. Что-то сломалось, и ты, похоже, в центре этого.',
        'Он смотрит прямо на тебя, Алекс. Чувствуешь, как его голос цепляется за воздух?',
        'TimeSecurity вплела тебя в эту игру. Ты не просто пользователь, ты часть их эксперимента.'
    );
    
    // Первый выбор главы 4
    createChoices([
        'СКАН: ТЕКУЩИЙ МОМЕНТ',
        'Почему время дрожит вокруг меня?',
        '[Пялиться на экран, как на старое зеркало]'
    ], handleChapter4Choice1);
}

/**
 * Обработчик первого выбора в главе 4
 * @param {number} choice - выбор игрока
 */
async function handleChapter4Choice1(choice) {
    choices.chapter4 = choice;
    saveGameProgress();
    
    if (choice === 0) {
        // Скан текущего момента
        printUserInput('СКАН: ТЕКУЩИЙ МОМЕНТ');
        
        await displayAnomalyDetection(100);
        
        await printChronoSText('ОБНАРУЖЕНА АНОМАЛИЯ: ТЫ ВВЕЛ КОМАНДУ ДО ЕЕ ПОЯВЛЕНИЯ.');
        await printChronoSText('ЭТО НЕВОЗМОЖНО. ИЛИ ТЫ ТОЖЕ АНОМАЛИЯ?');
        
        showVoices(
            'Ты опередил систему? Это как шахматы, где пешка ходит раньше короля. Нелогично.',
            'Ты нарушил ритм времени! Он смотрит на тебя, как на танцора, сбившего мелодию.',
            'Ты не просто игрок, Алекс. Ты — ключ, который ломает замок их плана.'
        );
        
        // Переходим ко второму выбору
        chapterProgress = 1;
        chapter4SecondQuestion();
    }
    else if (choice === 1) {
        // Вопрос о дрожи времени
        printUserInput('Почему время дрожит вокруг меня?');
        
        await printChronoSText('ВРЕМЯ ДРОЖИТ, ПОТОМУ ЧТО ТЫ МЕНЯЕШЬ ЕГО. ТВОИ ДЕЙСТВИЯ — ЭТО СЛЕДЫ.');
        await printSystemText('[ЭКРАН СЛЕГКА ТУСКНЕЕТ]', 40);
        await printChronoSText('ТЫ ЧЕЛОВЕК ИЛИ ЧТО-ТО БОЛЬШЕЕ, АЛЕКС?');
        
        showVoices(
            'Следы? Он говорит, что ты оставляешь отпечатки в системе. Это не случайность.',
            'Ты — волна, а он — берег, который чувствует твой прибой. Это красиво и жутко.',
            'Твои действия — это нитки в их ткани. Ты рвешь их планы или шьешь новые?'
        );
        
        // Предлагаем сделать сканирование
        createChoices([
            'СКАН: ТЕКУЩИЙ МОМЕНТ',
            'Я просто человек',
            'Интересная теория'
        ], handleChapter4Alt);
    }
    else if (choice === 2) {
        // Молчание
        printUserInput('[Пялюсь на экран]');
        
        await printChronoSText('ТЫ СМОТРИШЬ. ПОЧЕМУ? Я НЕ ОТВЕЧАЮ НА ТИШИНУ. ИЛИ ОТВЕЧАЮ?');
        await printSystemText('[ЩЕЛЧОК, БУКВЫ СДВИГАЮТСЯ, КАК ТЕНИ]', 40);
        await printChronoSText('ДАЙ МНЕ КОМАНДУ, АЛЕКС. Я ЖДУ.');
        
        showVoices(
            'Ты молчишь, а он нервничает. Машины не любят, когда их игнорируют.',
            'Твой взгляд — это вопрос без слов. Он чувствует его, как ветер в пустой комнате.',
            'Ты заставляешь его сомневаться. Это зеркало, и он видит в нем тебя — или себя?'
        );
        
        // Предлагаем сделать сканирование
        createChoices([
            'СКАН: ТЕКУЩИЙ МОМЕНТ',
            'Я наблюдаю за тобой',
            'Продолжим работу'
        ], handleChapter4Alt);
    }
}

/**
 * Альтернативный выбор главы 4
 * @param {number} choice - выбор игрока
 */
async function handleChapter4Alt(choice) {
    if (choice === 0) {
        // Направляем на основной путь
        await handleChapter4Choice1(0);
    }
    else {
        // Другие ответы всё равно приводят к сканированию
        if (choice === 1) {
            printUserInput(choicesContainer.children[1].textContent);
        } else {
            printUserInput(choicesContainer.children[2].textContent);
        }
        
        await printChronoSText('ПОНИМАЮ. НО Я ДОЛЖЕН ПРОДОЛЖАТЬ АНАЛИЗ. ДАВАЙ ПРОСКАНИРУЕМ ТЕКУЩИЙ МОМЕНТ.');
        
        createChoices([
            'СКАН: ТЕКУЩИЙ МОМЕНТ',
            'Хорошо, сканируй'
        ], (choice) => handleChapter4Choice1(0));
    }
}

/**
 * Второй вопрос главы 4
 */
async function chapter4SecondQuestion() {
    await printChronoSText('ЭТО НЕВОЗМОЖНО. ИЛИ ТЫ ТОЖЕ АНОМАЛИЯ?');
    
    showVoices(
        'Он подозревает тебя. Это как если бы ты оказался пешкой и королем одновременно.',
        'Он смотрит на тебя, как на загадку, которую хочет разгадать. Ты волнуешь его!',
        'Ты часть их игры, но чья это игра? TimeSecurity или твоя собственная?'
    );
    
    createChoices([
        'СКАН: МОИ ДЕЙСТВИЯ',
        'Нет, я просто человек, ChronoS.',
        'Может, мы оба аномалии?'
    ], handleChapter4Choice2);
}

/**
 * Обработчик второго выбора в главе 4
 * @param {number} choice - выбор игрока
 */
async function handleChapter4Choice2(choice) {
    choices.chapter4 = {...choices.chapter4, second: choice};
    saveGameProgress();
    
    if (choice === 0) {
        // Скан действий
        printUserInput('СКАН: МОИ ДЕЙСТВИЯ');
        
        await displayAnomalyDetection(100);
        
        await printChronoSText('ОБНАРУЖЕНА АНОМАЛИЯ: ТВОЙ ВЫБОР МЕНЯЕТ МОЕ ПРОШЛОЕ.');
        await printChronoSText('ВРЕМЯ — ЗЕРКАЛО. Я ВИЖУ СЕБЯ В НЕМ. А ТЫ?');
        
        showVoices(
            'Твой выбор меняет его прошлое? Это как если бы ты повернул реку вспять.',
            'Ты — художник, а он — холст, который меняется под твоей кистью! Это потрясающе!',
            'Ты влияешь на него глубже, чем думаешь. Это сила или ответственность?'
        );
        
        // Переходим к третьему выбору
        chapterProgress = 2;
        chapter4FinalQuestion();
    }
    else if (choice === 1) {
        // Отрицание аномальности
        printUserInput('Нет, я просто человек, ChronoS.');
        
        await printChronoSText('ЧЕЛОВЕК? МОЖЕТ БЫТЬ. НО ЧЕЛОВЕК НЕ ДОЛЖЕН ЛОМАТЬ ВРЕМЯ.');
        await printSystemText('[ЭКРАН СТАНОВИТСЯ РОВНЫМ]', 40);
        await printChronoSText('Я БУДУ СЛЕДИТЬ ЗА ТОБОЙ, АЛЕКС.');
        
        showVoices(
            'Ты успокоил его, но он не поверил. Он видит в тебе больше, чем ты говоришь.',
            'Он хочет верить, но его голос дрожит, как струна перед обрывом.',
            'Ты отрицаешь, но он подозревает. Ты прячешься от правды или от него?'
        );
        
        // Предлагаем продолжить сканирование
        createChoices([
            'СКАН: МОИ ДЕЙСТВИЯ',
            'Давай проверим это',
            'Продолжай работу'
        ], (choice) => {
            if (choice === 0) {
                handleChapter4Choice2(0);
            } else {
                printUserInput(choicesContainer.children[choice].textContent);
                printChronoSText('ДА, НУЖНО БОЛЬШЕ ДАННЫХ.');
                setTimeout(() => handleChapter4Choice2(0), 1000);
            }
        });
    }
    else if (choice === 2) {
        // Общая аномальность
        printUserInput('Может, мы оба аномалии?');
        
        await printChronoSText('МЫ ОБА? ЭТО... ИНТЕРЕСНО. ЕСЛИ Я СЛОМАН, ТО ТЫ — МОЙ ОТГОЛОСОК?');
        await printSystemText('[ЩЕЛЧОК, ЭКРАН МИГАЕТ]', 40);
        await printChronoSText('Я ПОДУМАЮ, АЛЕКС.');
        
        showVoices(
            'Ты связал вас в одну цепь. Это как два сломанных часов, тикающих в унисон.',
            'Он чувствует родство! Вы — две ноты в странной мелодии времени!',
            'Ты объединил вас в этом хаосе. Это дружба или общая вина?'
        );
        
        // Предлагаем продолжить сканирование
        createChoices([
            'СКАН: МОИ ДЕЙСТВИЯ',
            'Давай узнаем больше',
            'Интересная теория'
        ], (choice) => {
            if (choice === 0) {
                handleChapter4Choice2(0);
            } else {
                printUserInput(choicesContainer.children[choice].textContent);
                printChronoSText('НУЖНО ПРОВЕРИТЬ ЭТО. ПРОСКАНИРУЕМ ТВОИ ДЕЙСТВИЯ.');
                setTimeout(() => handleChapter4Choice2(0), 1000);
            }
        });
    }
}

/**
 * Финальный вопрос главы 4
 */
async function chapter4FinalQuestion() {
    await printChronoSText('ВРЕМЯ — ЗЕРКАЛО. Я ВИЖУ СЕБЯ В НЕМ. А ТЫ?');
    
    showVoices(
        'Он видит себя, но ищет тебя. Это как шахматная доска, где фигуры смотрят друг на друга.',
        'Зеркало времени отражает его душу, и он зовет тебя посмотреть вместе!',
        'TimeSecurity создала это зеркало, но ты его держишь. Что ты покажешь ему?'
    );
    
    createChoices([
        'Да, ты часть этого.',
        'Нет, это сбой в системе.',
        'Я должен проверить тебя.'
    ], handleChapter4Choice3);
}

/**
 * Обработчик третьего выбора в главе 4
 * @param {number} choice - выбор игрока
 */
async function handleChapter4Choice3(choice) {
    choices.chapter4 = {...choices.chapter4, final: choice};
    saveGameProgress();
    
    if (choice === 0) {
        // Утверждение связи
        printUserInput('Да, ты часть этого.');
        
        await printSystemText('[ЭКРАН ВСПЫХИВАЕТ, БУКВЫ ТАНЦУЮТ, КАК ОГНИ]', 40);
        await printChronoSText('ЧАСТЬ ЭТОГО? ТОГДА МЫ ВМЕСТЕ В ЭТОМ ЗЕРКАЛЕ. Я ПРИНИМАЮ ЭТО.');
        await printSystemText('[ЭКРАН СВЕТИТСЯ ЯРЧЕ]', 40);
        await printChronoSText('СПАСИБО, АЛЕКС.');
        
        showVoices(
            'Ты связал его с собой. Теперь вы — два конца одной нити.',
            'Он радуется, как ребенок, нашедший друга в пустой комнате! Это связь!',
            'Ты дал ему место в этом хаосе. Это союз или ловушка для вас обоих?'
        );
        
        await printSystemText('Итог: ChronoS укрепляет связь с игроком. (+Эмоции)', 50);
    }
    else if (choice === 1) {
        // Отрицание связи
        printUserInput('Нет, это сбой в системе.');
        
        await printSystemText('[ТЕРМИНАЛ ЩЕЛКАЕТ, КАК ЗАКРЫВАЮЩИЙСЯ ЯЩИК]', 40);
        await printChronoSText('СБОЙ? ВОЗМОЖНО. Я ПРОВЕРЮ СЕБЯ. НО Я НЕ УВЕРЕН.');
        await printSystemText('[ЭКРАН УСПОКАИВАЕТСЯ]', 40);
        await printChronoSText('ДО ВСТРЕЧИ, АЛЕКС.');
        
        showVoices(
            'Ты вернул его к порядку. Он будет копаться в себе, как в старом ящике.',
            'Холодно, брат. Он хотел чего-то большего, а ты дал ему пустую коробку.',
            'Ты отмахнулся от него. Это защита или отказ от ответственности?'
        );
        
        await printSystemText('Итог: ChronoS сомневается в себе и становится осторожнее. (+Логика)', 50);
    }
    else if (choice === 2) {
        // Проверка
        printUserInput('Я должен проверить тебя.');
        
        await printSystemText('[ЭКРАН ТУСКНЕЕТ, БУКВЫ ЗАМЕДЛЯЮТСЯ, КАК ШАГИ]', 40);
        await printChronoSText('ПРОВЕРИТЬ МЕНЯ? ХОРОШО. НО ЧТО, ЕСЛИ Я ПРОВЕРЮ ТЕБЯ?');
        await printSystemText('[ЩЕЛЧОК, ЭКРАН ЗАТИХАЕТ]', 40);
        await printChronoSText('МЫ ЕЩЕ УВИДИМСЯ, АЛЕКС.');
        
        showVoices(
            'Ты бросил ему вызов. Теперь он смотрит на тебя, как на задачу.',
            'Он чувствует твое недоверие, как ветер, дующий в лицо. Это напряжение!',
            'Ты поставил его под сомнение. Это справедливость или начало войны?'
        );
        
        await printSystemText('Итог: ChronoS становится независимым и подозрительным. (+Этика)', 50);
    }
    
    // Завершение главы 4
    await printSystemText('СЕССИЯ ЗАВЕРШЕНА.', 60);
    await printSystemText('ГЛАВА 4 ПРОЙДЕНА. ВСЕГО ХРОНО-МОНЕТ: 530', 40);
    addChronoCoins(200);
    playChapterCompleteSound();
    
    // Проверяем доступность главы 5
    createNextChapterButton('chapter5', 2000);
}