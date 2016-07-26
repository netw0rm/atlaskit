Feature: ak-blanket
  As a user
  I want to be able to click the ak-blanket
  And make it disappear

  Scenario: Click ak-blanket
    Given I am on the story page "an ak-blanket that removes itself when being clicked" of "ak-blanket"
    Then I should see a "ak-blanket" component
    When I click the "ak-blanket" component
    Then I should not see a "ak-blanket" component
