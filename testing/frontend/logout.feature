Feature: Вихід з акаунта

  Scenario: Вихід з акаунта
    Given відбувся вхід в акаунт
    When натиснути на значок біля імені
    And натиснути на кнопку "Logout"
    Then відбувається вихід з акаунта на етап реєстрації