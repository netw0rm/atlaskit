Feature: ak-tag-group
  As a user
  I want to be able to click the ak-tag-group
  And make it disappear

  Scenario: Click ak-tag-group
    Given I am on the story page "an ak-tag-group that removes itself when being clicked" of "ak-tag-group"
    Then I should see a "ak-tag-group" component
    When I click the "ak-tag-group" component
    Then I should not see a "ak-tag-group" component
