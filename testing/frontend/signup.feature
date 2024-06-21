Feature: Реєстрація

  Scenario: Коректна реєстрація
    Given зайти на веб-сторінку реєстрації (sign up)
    When вводити коректний формат пошти (із символом @)
    And вводити пароль
    And вводити невикористовуваний тег
    And вводити ім'я
    Then створюється новий акаунт і відбувається вхід

  Scenario: некоректна реєстрація (пусте поле)
    Given зайти на веб-сторінку реєстрації (sign up)
    When не вводити інформацію хоча б в одне поле
    Then не створюється новий акаунт і підсвічується пояснення помилки

  Scenario: Некоректна реєстрація (некоректна пошта)
    Given зайти на веб-сторінку реєстрації (sign up)
    When вводити некоректний формат пошти (без символа @)
    And вводити пароль
    And вводити невикористовуваний тег
    And вводити ім'я
    Then не створюється новий акаунт і виводиться пояснення помилки

  Scenario: Некоректна реєстрація (уже існуючий тег)
    Given зайти на веб-сторінку реєстрації (sign up)
    When вводити коректний формат пошти (із символом @)
    And вводити пароль
    And вводити використовуваний тег
    And вводити ім'я
    Then не створюється новий акаунт і не відбувається вхід