Feature: ak-editor-toolbar-hyperlink
  As a user
  I want to be able to toggle ak-editor-popup with the ak-editor-toolbar-hyperlink button

  Background: Click ak-editor-toolbar-hyperlink to open ak-editor-popup
    Given I am on the story page "a simple ak-editor-hyperlink-popup-button" of "ak-editor-toolbar-hyperlink"
    Then I should see a "ak-editor-toolbar-hyperlink" component
    And I should not see a "ak-editor-popup" component
    When I click the "ak-editor-toolbar-hyperlink" component
    Then I should see a "ak-editor-popup" component

  Scenario: Click outside of ak-editor-popup
    Given I should see a "ak-editor-popup" component
    Then I click outside
    Then I should not see a "ak-editor-popup" component

  Scenario: Click ak-editor-toolbar-hyperlink again to dismiss ak-editor-popup
    Given I should see a "ak-editor-toolbar-hyperlink" component
    And I should see a "ak-editor-popup" component
    When I click the "ak-editor-toolbar-hyperlink" component
    Then I should not see a "ak-editor-popup" component

  Scenario: Click ak-editor-popup and it should not be dismissed
    Given I should see a "ak-editor-toolbar-hyperlink" component
    And I should see a "ak-editor-popup" component
    When I click the "ak-editor-popup" component
    Then I should see a "ak-editor-popup" component
