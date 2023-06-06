export const validForm = {
  service: 'Trybe Account',
  login: 'tryber@email.com',
  password: '@password2022',
  url: 'https://app.betrybe.com/learn',
} as const;

export const anotherValidForm = {
  service: 'My personal e-mail',
  login: 'myname@email.com',
  password: '#!@secret123',
  url: 'https://my-email-url.com/email',
} as const;

export const smallPassword = '123abc@';
export const tooBigPassword = '12345678abcdefgh@';
export const noNumbersPassword = 'abcde!@#';
export const noLettersPassword = '12345!@#';
export const noSpecialPassword = 'abcde12345';
export const passwordClass = {
  valid: 'valid-password-check',
  invalid: 'invalid-password-check',
} as const;

export const testId = {
  showHideForm: 'show-hide-form-password',
  removeButton: 'remove-btn',
} as const;
