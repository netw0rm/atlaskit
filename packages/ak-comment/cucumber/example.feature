Feature: ak-comment
  As a user
  I want to be able to click the ak-comment
  And make it disappear

  Scenario: Click ak-comment
    Given I am on the story page "an ak-comment that removes itself when being clicked" of "ak-comment"
    Then I should see a "ak-comment" component
    When I click the "ak-comment" component
    Then I should not see a "ak-comment" component
