export default {
  multiply: (a, b) => a * b,
  add: (a, b) => a + b,
  let: (value, options) => options.fn(value)
};