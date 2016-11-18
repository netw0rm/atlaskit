Feature: ak-css-reset
  As a user
  I want to be able to click the ak-css-reset
  And make it disappear

  Scenario: Click ak-css-reset
    Given I am on the story page "an ak-css-reset that removes itself when being clicked" of "ak-css-reset"
    Then I should see a "ak-css-reset" component
    When I click the "ak-css-reset" component
    Then I should not see a "ak-css-reset" component
