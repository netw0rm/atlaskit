Feature: ak-navigation-link
  As a user
  I want to be able to click the ak-navigation-link
  And make it disappear

  Scenario: Click ak-navigation-link
    Given I am on the story page "an ak-navigation-link that removes itself when being clicked" of "ak-navigation-link"
    Then I should see a "ak-navigation-link" component
    When I click the "ak-navigation-link" component
    Then I should not see a "ak-navigation-link" component
