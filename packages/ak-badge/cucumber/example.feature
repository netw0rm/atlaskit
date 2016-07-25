Feature: ak-badge
  As a user
  I want to be able to click the ak-badge
  And make it disappear

  Scenario: Click ak-badge
    Given I am on the story page "an ak-badge that removes itself when being clicked" of "ak-badge"
    Then I should see a "ak-badge" component
    When I click the "ak-badge" component
    Then I should not see a "ak-badge" component
