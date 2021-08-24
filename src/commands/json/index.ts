import { Tree } from '@angular-devkit/schematics';
import path from 'path';
import { chromium } from 'playwright';
import {
  insertPlaceholders,
  replacePlaceholders,
  stripHtml,
} from '../../utils/text-utils';
import schema from './schema.json';

export default function ({ src, to, from, left, right }: Params) {
  return async (tree: Tree) => {
    const buffer = tree.read(src);
    if (!buffer) {
      throw new Error(`Could not find file: ${src}`);
    }

    let json = buffer.toString();
    const data: Translations = JSON.parse(json);
    if (!data) {
      throw new Error(`Source is not a valid JSON file: ${src}`);
    }

    const targetPath = path.join(src, '..', `${to}.json`);

    from = from || src.replace(/([^.])\.\w+$/, '$1');

    const [translate, destroyTranslator] = await useTranslator(from, to, [
      left || '{{',
      right || '}}',
    ]);

    const translations = await translateRecursively(translate, data);

    await destroyTranslator();

    json = JSON.stringify(translations, null, 2);

    if (tree.exists(targetPath)) {
      tree.overwrite(targetPath, json);
    } else {
      tree.create(targetPath, json);
    }

    return tree;
  };
}

async function translateRecursively(
  translate: (key: string) => Promise<string>,
  data: Translations
) {
  const translations: Translations = {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === 'string') {
      translations[key] = await translate(value);
    } else {
      translations[key] = await translateRecursively(translate, value);
    }
  }

  return translations;
}

async function useTranslator(
  fromLanguage: string,
  toLanguage: string,
  interpolation: [string, string]
) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.grantPermissions(['clipboard-read']);

  const page = await context.newPage();

  await page.goto(
    `https://translate.google.com/?sl=${fromLanguage}&tl=${toLanguage}&op=translate`
  );

  return [translate, destroyTranslator] as const;

  async function translate(textOrHtml: string) {
    const text = await page.evaluate(stripHtml, textOrHtml);
    const [textWithPlaceholders, ...tokens] = insertPlaceholders(
      text,
      interpolation
    );
    await Promise.all([
      page.waitForNavigation(),
      page.fill('[aria-label="Source text"]', textWithPlaceholders),
    ]);
    await page.click('[aria-label="Copy translation"]');
    await page.click('[aria-label="Clear source text"]');
    const result = await page.evaluate(() => navigator.clipboard.readText());
    return replacePlaceholders(result, tokens);
  }

  async function destroyTranslator() {
    await context.clearPermissions();
    await context.close();
    await browser.close();
  }
}

type Properties = typeof schema['properties'];
type Params = Record<keyof Properties, string>;

interface Translations {
  [key: string]: string | Translations;
}
