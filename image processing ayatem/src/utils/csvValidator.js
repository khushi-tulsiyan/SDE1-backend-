const csv = require('csv-parser');
const fs = require('fs');

class CsvValidator {
  validate(filePath) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath);
      let isValid = true;
      let rowCount = 0;

      readStream
        .pipe(csv())
        .on('data', (row) => {
          rowCount++;
          if (!this.isRowValid(row)) {
            isValid = false;
            readStream.destroy();
          }
        })
        .on('end', () => {
          resolve(isValid && rowCount > 0);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  isRowValid(row) {
    return (
      row['S. No.'] &&
      row['Product Name'] &&
      row['Input Image Urls'] &&
      row['Input Image Urls'].split(',').every(url => url.trim().startsWith('http'))
    );
  }
}

module.exports = new CsvValidator();