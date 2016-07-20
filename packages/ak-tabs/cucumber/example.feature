Feature: ak-tabs
  As a user
  I want to be able to click the ak-tabs
  And make it disappear

  Scenario: Click ak-tabs
    Given I am on the story page "an ak-tabs that removes itself when being clicked" of "ak-tabs"
    Then I should see a "ak-tabs" component
    When I click the "ak-tabs" component
    Then I should not see a "ak-tabs" component
