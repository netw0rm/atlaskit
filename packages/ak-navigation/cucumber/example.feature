Feature: ak-navigation
  As a user
  I want to be able to click the ak-navigation
  And make it disappear

  Scenario: Click ak-navigation
    Given I am on the story page "an ak-navigation that removes itself when being clicked" of "ak-navigation"
    Then I should see a "ak-navigation" component
    When I click the "ak-navigation" component
    Then I should not see a "ak-navigation" component
