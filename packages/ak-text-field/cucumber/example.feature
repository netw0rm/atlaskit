Feature: ak-text-field
  As a user
  I want to be able to click the ak-text-field
  And make it disappear

  Scenario: Click ak-text-field
    Given I am on the story page "an ak-text-field that removes itself when being clicked" of "ak-text-field"
    Then I should see a "ak-text-field" component
    When I click the "ak-text-field" component
    Then I should not see a "ak-text-field" component
