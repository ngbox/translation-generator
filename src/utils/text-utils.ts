const { JSDOM } = require('jsdom');

export function stripHtml(html: string) {
  const { document } = new JSDOM().window;
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

export function insertPlaceholders(text: string, interpolation = ['{{', '}}']) {
  const [left, right] = interpolation;
  const interpolationRegex = new RegExp(`${left}\\s*\\S+\\s*${right}`, 'g');
  const tokens = text.match(interpolationRegex) || [];

  if (tokens.length) {
    let index = 0;
    text = text.replace(interpolationRegex, () => `{{${index++}}}`);
  }

  return [text, ...tokens];
}

export function replacePlaceholders(text: string, tokens: string[]) {
  tokens.forEach((token, index) => {
    text = text.replace(`{{${index}}}`, token);
  });

  return text;
}
