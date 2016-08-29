Feature: ak-theme
  As a user
  I want to be able to click the ak-theme
  And make it disappear

  Scenario: Click ak-theme
    Given I am on the story page "an ak-theme that removes itself when being clicked" of "ak-theme"
    Then I should see a "ak-theme" component
    When I click the "ak-theme" component
    Then I should not see a "ak-theme" component
