Feature: Button
  As a user
  I want to be able to click the button
  And make it disappear

  Scenario: Click button
    Given I am on the integration page
    Then I should see a "Test" button
    When I click the "Test" button
    Then I should not see the "Test" button
