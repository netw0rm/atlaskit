Feature: ak-lozenge
  As a user
  I want to be able to click the ak-lozenge
  And make it disappear

  Scenario: Click ak-lozenge
    Given I am on the story page "an ak-lozenge that removes itself when being clicked" of "ak-lozenge"
    Then I should see a "ak-lozenge" component
    When I click the "ak-lozenge" component
    Then I should not see a "ak-lozenge" component
