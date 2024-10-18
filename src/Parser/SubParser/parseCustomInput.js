import sumAllNumbers from '../../Util/sumAllNumbers.js';
import {
  validateCustomInput,
  validateNoDuplicateDelimiters,
  validateInputFormat,
} from '../../Validator/Validator.js';

import { escapeRegExp } from '../../Util/regex.js';

export default function parseCustomInput(input) {
  // 입력이 //로 시작하고 \n을 포함하는지 확인한다.
  validateInputFormat(input);

  const delimiterEnd = input.indexOf('\\n');
  const delimiter = input.slice(2, delimiterEnd);

  // delimiter가 비어있으면 에러를 던진다.
  if (delimiter === '') {
    throw new Error('[ERROR]: delimiter가 비어있습니다.');
  }

  // escape 처리.
  const escapedDelimiter = escapeRegExp(delimiter);

  // delimiter 이후의 내용을 추출한다.
  const content = input.slice(delimiterEnd + 2);
  validateCustomInput(content, escapedDelimiter);

  const parts = content.split(delimiter);
  validateNoDuplicateDelimiters(parts);

  // 모든 숫자의 합을 반환한다.
  return sumAllNumbers(parts);
}
