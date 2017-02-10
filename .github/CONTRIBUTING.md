# Coding Style Guideline

## All
* indent using two spaces
* add Newline to file

## Template
* one Line between every tag except multiple inline tags

## CSS
* write everything in Less, not CSS. Otherwise your changes will be overwritten
* sort properties alphabetically
* do not use browser prefixes, we run the code through autoprefixer
* use lowercase for color-codes
* only `classes`, no `IDs`
* max three level deep selectors
* do not use `!important`
* remove leading zeros from numbers

## Commit Messages
We're following the [gitmoji](https://gitmoji.carloscuesta.me/) guide :smiley:
Below you can find an example commit message for adding new resource:

:memo: add "Front-end performance Checklist 2017" - fix #1225

It starts with the emoji, `add` with the resource name and then `fix` with
issue number.
