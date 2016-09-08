Feature: ak-heatmap
  As a user
  I want to be able to click the ak-heatmap
  And make it disappear

  Scenario: Click ak-heatmap
    Given I am on the story page "an ak-heatmap that removes itself when being clicked" of "ak-heatmap"
    Then I should see a "ak-heatmap" component
    When I click the "ak-heatmap" component
    Then I should not see a "ak-heatmap" component
