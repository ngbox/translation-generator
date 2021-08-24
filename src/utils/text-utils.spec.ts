import {
  insertPlaceholders,
  replacePlaceholders,
  stripHtml,
} from './text-utils';

describe('Text Utils', () => {
  describe('stripHtml', () => {
    it.each`
      html                                                    | expected
      ${'<p>Hello</p>'}                                       | ${'Hello'}
      ${'<p class="primary">Hello</p>'}                       | ${'Hello'}
      ${'<p>Hello <strong>world</strong></p>'}                | ${'Hello world'}
      ${'<p>Hello <strong>world</strong> <em>again</em></p>'} | ${'Hello world again'}
    `(
      'should remove HTML tags from $html and return $expected',
      ({ html, expected }) => {
        expect(stripHtml(html)).toBe(expected);
      }
    );
  });

  describe('insertPlaceholders', () => {
    it.each`
      text                                        | interpolation   | expected
      ${'Hello world'}                            | ${undefined}    | ${['Hello world']}
      ${'Hello {{ name }}'}                       | ${undefined}    | ${['Hello {{0}}', '{{ name }}']}
      ${'Hello {{ name }}'}                       | ${['{{', '}}']} | ${['Hello {{0}}', '{{ name }}']}
      ${'Hello <% name %>'}                       | ${['<%', '%>']} | ${['Hello {{0}}', '<% name %>']}
      ${'Hello {{ first }} {{ last }}'}           | ${undefined}    | ${['Hello {{0}} {{1}}', '{{ first }}', '{{ last }}']}
      ${'Hello {{ first }} {{ mid }} {{ last }}'} | ${undefined}    | ${['Hello {{0}} {{1}} {{2}}', '{{ first }}', '{{ mid }}', '{{ last }}']}
    `(
      'should return $expected when text is $text and interpolation is $interpolation',
      ({ text, interpolation, expected }) => {
        expect(insertPlaceholders(text, interpolation)).toEqual(expected);
      }
    );
  });

  describe('replacePlaceholders', () => {
    it.each`
      text                         | tokens                                        | expected
      ${'Hello {{0}}'}             | ${['{{ name }}']}                             | ${'Hello {{ name }}'}
      ${'Hello {{0}} {{1}}'}       | ${['{{ first }}', '{{ last }}']}              | ${'Hello {{ first }} {{ last }}'}
      ${'Hello {{0}} {{1}} {{2}}'} | ${['{{ first }}', '{{ mid }}', '{{ last }}']} | ${'Hello {{ first }} {{ mid }} {{ last }}'}
      ${'Hello {{0}}'}             | ${['<% name %>']}                             | ${'Hello <% name %>'}
    `(
      'should return $expected when text is $text and tokens are $tokens',
      ({ text, tokens, expected }) => {
        expect(replacePlaceholders(text, tokens)).toEqual(expected);
      }
    );
  });
});
