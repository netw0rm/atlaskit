Feature: ak-editor-toolbar-hyperlink
  As a user
  I want to be able to clock ak-editor-popup with keyboard

  Background: Click ak-editor-toolbar-hyperlink to open ak-editor-popup
    Given I am on the story page "a simple ak-editor-hyperlink-popup-button" of "ak-editor-toolbar-hyperlink"
    Then I should see a "ak-editor-toolbar-hyperlink" component
    And I should not see a "ak-editor-popup" component
    When I click the "ak-editor-toolbar-hyperlink" component
    Then I should see a "ak-editor-popup" component

  Scenario: Press the enter key
    Given I should see a "ak-editor-popup" component
    And I register a "addHyperlink" eventListener on "document"
    Then I enter "enter" key on the "ak-editor-popup" component
    Then I should not see a "ak-editor-popup" component
    And I should receive a "addHyperlink" event on "document"

  Scenario: Press the esc key
    Given I should see a "ak-editor-popup" component
    And I register a "addHyperlink" eventListener on "document"
    Then I enter "esc" key on the "ak-editor-popup" component
    Then I should not see a "ak-editor-popup" component
    And I should not receive a "addHyperlink" event on "document"
