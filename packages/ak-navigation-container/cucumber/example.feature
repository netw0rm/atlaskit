Feature: ak-navigation-container
  As a user
  I want to be able to click the ak-navigation-container
  And make it disappear

  Scenario: Click ak-navigation-container
    Given I am on the story page "an ak-navigation-container that removes itself when being clicked" of "ak-navigation-container"
    Then I should see a "ak-navigation-container" component
    When I click the "ak-navigation-container" component
    Then I should not see a "ak-navigation-container" component
