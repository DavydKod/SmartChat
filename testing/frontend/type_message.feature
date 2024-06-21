Feature: Повідомлення

  Scenario: Написання повідомлення (у особистий/груповий чат)
    Given відбувся пошук користувача і його знайдено у списку
    When натиснути на іконку користувача/групового чату
    And натиснути на поле введення повідомлення ("Type a message")
    And ввести текст
    And натиснути на іконку надсилання повідомлення
    Then надсилається повідомлення користувачу/у груповий чат

  Scenario: Написання повідомлення зі смайликом (у особистий/груповий чат)
    Given відбувається написання повідомлення
    When натиснути на іконку смайлика
    And знайти відповідний смайл
    And натиснути на нього
    Then виведеться вибраний смайлик у кінець тексту повідомлення