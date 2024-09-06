const csv = require('csv-parser');
const fs = require('fs');

class CsvProcessor {
  async process(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push({
            serialNumber: data['S. No.'],
            productName: data['Product Name'],
            inputUrls: data['Input Image Urls'].split(',').map(url => url.trim())
          });
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}

module.exports = new CsvProcessor();