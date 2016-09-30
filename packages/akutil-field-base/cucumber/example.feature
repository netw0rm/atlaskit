Feature: akutil-field-base
  As a user
  I want to be able to click the akutil-field-base
  And make it disappear

  Scenario: Click akutil-field-base
    Given I am on the story page "an akutil-field-base that removes itself when being clicked" of "akutil-field-base"
    Then I should see a "akutil-field-base" component
    When I click the "akutil-field-base" component
    Then I should not see a "akutil-field-base" component
