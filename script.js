// При загрузке страницы установить сохранённую тему с плавным переходом
window.onload = function () {
    const savedTheme = localStorage.getItem('selectedTheme') || 'halloween';
    document.body.classList.add(savedTheme + '-theme', 'theme-transition');
    document.getElementById('theme-select').value = savedTheme;

    // Установка сохранённых данных уровня, XP и никнейма
    const savedLevel = localStorage.getItem('level') || 0;
    const savedXP = localStorage.getItem('xp') || 0;
    const savedNickname = localStorage.getItem('nickname') || 'Пользователь';
    const savedAvatar = localStorage.getItem('avatar') || 'images/default-avatar.png';

    document.getElementById('level').innerText = savedLevel;
    document.getElementById('xp').innerText = savedXP;
    document.getElementById('nickname').innerText = savedNickname;
    document.getElementById('avatar').src = savedAvatar;

    updateLevelColor(savedLevel);
};

// Функция для обновления цвета уровня
function updateLevelColor(level) {
    const levelElement = document.getElementById('level');
    level = parseInt(level);
    if (level < 10) {
        levelElement.style.color = 'white';
    } else if (level < 20) {
        levelElement.style.color = 'lightgreen';
    } else if (level < 30) {
        levelElement.style.color = 'yellow';
    } else if (level < 40) {
        levelElement.style.color = 'orange';
    } else {
        levelElement.style.color = 'red';
    }
}

// Функция для добавления опыта
function addExperience(experience) {
    let xp = parseInt(localStorage.getItem('xp')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 0;

    xp += experience;
    const levelUpXP = 100 + (level * 50); // Увеличиваем XP для следующего уровня

    while (xp >= levelUpXP) {
        level++;
        xp -= levelUpXP;
        alert(`Поздравляем! Вы достигли уровня ${level}!`);
    }

    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    document.getElementById('xp').innerText = xp;
    document.getElementById('level').innerText = level;
    updateLevelColor(level);
}

// Обработчик кнопки редактирования профиля
document.getElementById('edit-button').addEventListener('click', function() {
    const newNickname = prompt("Введите новый никнейм:", document.getElementById('nickname').innerText);
    if (newNickname) {
        document.getElementById('nickname').innerText = newNickname;
        localStorage.setItem('nickname', newNickname);
    }

    const avatarInput = document.getElementById('avatar-input');
    if (avatarInput.files && avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar').src = e.target.result;
            localStorage.setItem('avatar', e.target.result); // Сохраняем аватар в localStorage
        }
        reader.readAsDataURL(avatarInput.files[0]);
    }
});

// Функция для обновления страницы
function refreshPage() {
    location.reload(); // Обновление страницы
}
