# Translation Generator

This library generates translation files based on previously translated files using Angular schematics, Google Translate, and Playwright.

> **A Note:** The generator removes any HTML tags in the source before translating it. It will not modify the source file, but you will not find those tags in the generated translation.

## Installation

Run the following command in your terminal to install the package in your project:

```sh
npx ng add translation-generator
```

Alternatively, you can install the package directly:

```sh
npm install -D translation-generator
```

## Usage

Run the following command in your terminal:

```sh
npx ng g translation-generator:json <source JSON path> <to language> <from language>
```

Please find an example below:

```sh
npx ng g translation-generator:json src/assets/i18n/en.json fr en
```

You can also use command parameters by name to give them in a different order:

```sh
npx ng g translation-generator:json --from=en --to=fr --src=src/assets/i18n/en.json
```

The `--from` parameter is optional and the language will be resolved from source filename, so these will work:

```sh
npx ng g translation-generator:json src/assets/i18n/en.json fr
```

```sh
npx ng g translation-generator:json --to=fr --src=src/assets/i18n/en.json
```

![translation-generator-in-action](https://user-images.githubusercontent.com/15855540/130580947-a72b5038-5d95-4f2a-a21c-8880554903df.gif)

<hr />

<p align="center">
  <img width="255" src="https://user-images.githubusercontent.com/34455572/115242872-f8373c80-a12a-11eb-9b52-f3b75bd2f61e.png" alt="Developed by NG Box" />
</p>
