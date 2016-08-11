Feature: ak-page
  As a user
  I want to be able to click the ak-page
  And make it disappear

  Scenario: Click ak-page
    Given I am on the story page "an ak-page that removes itself when being clicked" of "ak-page"
    Then I should see a "ak-page" component
    When I click the "ak-page" component
    Then I should not see a "ak-page" component
