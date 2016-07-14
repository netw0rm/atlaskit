Feature: ak-button
  As a user
  I want to be able to click the ak-button
  And make it disappear

  Scenario: Click ak-button
    Given I am on the story page "an ak-button that removes itself when being clicked" of "ak-button"
    Then I should see a "ak-button" component
    When I click the "ak-button" component
    Then I should not see a "ak-button" component
