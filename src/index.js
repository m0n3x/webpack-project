const log = function (message) {
  console.log(message);
}

log('Hello world!');

const tableLog = function (...args) {
  let message = args.join(' | ');
  log(message);
}

tableLog("Hello", "World", "!", 'check');

const tableTimeLog = function (...args) {
  let date = new Date().toLocaleString("en-US");
  tableLog(date, ...args);
}

tableTimeLog("Hello", "World", "!", 'check');