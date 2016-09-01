Feature: ak-tooltip
  As a user
  I want to be able to click the ak-tooltip
  And make it disappear

  Scenario: Click ak-tooltip
    Given I am on the story page "an ak-tooltip that removes itself when being clicked" of "ak-tooltip"
    Then I should see a "ak-tooltip" component
    When I click the "ak-tooltip" component
    Then I should not see a "ak-tooltip" component
