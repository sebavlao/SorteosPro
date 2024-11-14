const stringify = require("csv-stringify").stringify;

const csvStringifyGenerate = (data) => {
  return stringify(data, { header: true });
};

module.exports = csvStringifyGenerate;
