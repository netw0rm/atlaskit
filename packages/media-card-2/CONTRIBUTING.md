# Contributing

## Directory structure

- exported components live in the top level of `./src`. Components/utils used across multiple top-level views live in `./src/utils`. All other components live nested in the same heirachy as their VDOM structure.

## Using classes

DO NOT USE CLASSES!

Because:
- there's no such thing as namspacing and we've had classnames clash with other teams
- unlike components there's no hard link between where classnames are defined and used and that makes it
harder to locate and tell if they're used, and error prone when cleaning them up

Except when:
- we'd have to use JavaScript to trigger e.g. `.some-parent-component:hover & {...}`,