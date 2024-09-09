@login
Feature: E2E - Login

Scenario: E2E - Login with unregistered email
  Given I am on oranum at Login page
  When I log in using an unregistered account
  Then a message "Invalid email or password." is displayed