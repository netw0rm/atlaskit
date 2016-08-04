Feature: ak-radio-button
  As a user
  I want to be able to click the ak-radio-button
  And make it disappear

  Scenario: Click ak-radio-button
    Given I am on the story page "an ak-radio-button that removes itself when being clicked" of "ak-radio-button"
    Then I should see a "ak-radio-button" component
    When I click the "ak-radio-button" component
    Then I should not see a "ak-radio-button" component
