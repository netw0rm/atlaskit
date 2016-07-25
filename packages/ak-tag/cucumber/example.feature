Feature: ak-tag
  As a user
  I want to be able to click the ak-tag
  And make it disappear

  Scenario: Click ak-tag
    Given I am on the story page "an ak-tag that removes itself when being clicked" of "ak-tag"
    Then I should see a "ak-tag" component
    When I click the "ak-tag" component
    Then I should not see a "ak-tag" component
