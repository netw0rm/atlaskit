Feature: ak-calendar
  As a user
  I want to be able to click the ak-calendar
  And make it disappear

  Scenario: Click ak-calendar
    Given I am on the story page "an ak-calendar that removes itself when being clicked" of "ak-calendar"
    Then I should see a "ak-calendar" component
    When I click the "ak-calendar" component
    Then I should not see a "ak-calendar" component
