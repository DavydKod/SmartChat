Feature: Інформація про профіль

  Scenario: Перегляд інформації про свій акаунт
    Given відбувся вхід в акаунт
    When натиснути на значок біля імені
    And натиснути на кнопку "Profile"
    Then відображається інформація про свій акаунт (ім'я та пошта)