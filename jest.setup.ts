import '@testing-library/jest-dom';

jest.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('act(...)')) {
    return;
  }
  console.error(message);
});

jest.spyOn(console, 'warn').mockImplementation((message) => {
  if (message.includes('act(...)')) {
    return;
  }
  console.warn(message);
});
