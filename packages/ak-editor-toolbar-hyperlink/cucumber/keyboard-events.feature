Feature: ak-editor-toolbar-hyperlink
  As a user
  I want to be able to close ak-editor-popup with keyboard

  Background: I am on story "a simple ak-editor-hyperlink-popup-button"
    Given I am on the story page "a simple ak-editor-hyperlink-popup-button" of "ak-editor-toolbar-hyperlink"

  Scenario: It should not have popup on intial load
    Then I should see a "ak-editor-toolbar-hyperlink" component
    And I should not see a "ak-editor-popup" component

  Scenario: Press the enter key should dismiss the popup
    When I click the "ak-editor-toolbar-hyperlink" component
    And I enter "enter" key on the "ak-editor-popup" component
    Then I should not see a "ak-editor-popup" component

  Scenario: Press the esc key should dismiss the popup
    When I click the "ak-editor-toolbar-hyperlink" component
    And I enter "esc" key on the "ak-editor-popup" component
    Then I should not see a "ak-editor-popup" component

  Scenario: Press the A key should not dismiss the popup
    When I click the "ak-editor-toolbar-hyperlink" component
    And I enter "A" key on the "ak-editor-popup" component
    Then I should see a "ak-editor-popup" component
