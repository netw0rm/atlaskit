Feature: akutil-component-template
  As a user
  I want to be able to click the akutil-component-template
  And make it disappear

  Scenario: Click akutil-component-template
    Given I am on the story page "an akutil-component-template that behaves like XY" of "akutil-component-template"
    Then I should see a "Test" button
    When I click the "Test" button
    Then I should not see the "Test" button
