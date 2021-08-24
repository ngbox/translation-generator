# Translation Generator

This library generates translation files based on previously translated files using Angular schematics, Google Translate, and Playwright. You can use it together with [Transloco](https://github.com/ngneat/transloco/) or [ngx-translate](https://github.com/ngx-translate/core).

> **A Note:** The generator removes any HTML tags in the source before translating it. It will not modify the source file, but you will not find those tags in the generated translation.
>
> **Also a note:** Factors like rate limits (applied by Google) or connection problems can interrupt the translation process. Please try again after a while and with smaller a translation file.

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
npx ng g translation-generator:json
```

The generator will prompt some questions. You may pass them as parameters:

```sh
npx ng g translation-generator:json <source JSON path> <to language> <from language> <left interpolation> <right interpolation>
```

Please find an example below:

```sh
npx ng g translation-generator:json src/assets/i18n/en.json fr en "<%" "%>"
```

You can also use command parameters by name to give them in a different order:

```sh
npx ng g translation-generator:json --from=en --to=fr --left="<%" --right="%>" --src=src/assets/i18n/en.json
```

The `--left` and `--right` parameters are optional and their default values are `{{` and `}}` respectively.
The `--from` parameter is also optional and the source language will be resolved from the source filename.

You can pass some of the arguments and answer the rest when prompted:

```sh
npx ng g translation-generator:json src/assets/i18n/en.json fr
```

...or...

```sh
npx ng g translation-generator:json --to=fr --src=src/assets/i18n/en.json
```

Leave anwsers blank if they are optional and you want to use the default values.
Here is how that works:

![translation-generator](https://user-images.githubusercontent.com/15855540/130627615-7bda8d0c-44f8-4127-8488-541b7725cb0c.gif)

<hr />

<p align="center">
  <img width="255" src="https://user-images.githubusercontent.com/34455572/115242872-f8373c80-a12a-11eb-9b52-f3b75bd2f61e.png" alt="Developed by NG Box" />
</p>
