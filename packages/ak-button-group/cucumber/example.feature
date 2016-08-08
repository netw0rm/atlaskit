Feature: ak-button-group
  As a user
  I want to be able to click the ak-button-group
  And make it disappear

  Scenario: Click ak-button-group
    Given I am on the story page "an ak-button-group that removes itself when being clicked" of "ak-button-group"
    Then I should see a "ak-button-group" component
    When I click the "ak-button-group" component
    Then I should not see a "ak-button-group" component
