Feature: akutil-component-template
  As a user
  I want to be able to click the akutil-component-template
  And make it disappear

  Scenario: Click akutil-component-template
    Given I am on the story page "an akutil-component-template that removes itself when being clicked" of "akutil-component-template"
    Then I should see a "akutil-component-template" component
    When I click the "akutil-component-template" component
    Then I should not see a "akutil-component-template" component
