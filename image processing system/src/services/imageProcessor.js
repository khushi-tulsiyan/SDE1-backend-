const sharp = require('sharp');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;

class ImageProcessor {
  async processImage(imageUrl) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      const processedBuffer = await sharp(buffer)
        .jpeg({ quality: 50 }) // Compress by 50%
        .toBuffer();

      const outputFileName = `${uuidv4()}.jpg`;
      const outputPath = path.join(__dirname, '../../public/processed', outputFileName);
      await fs.writeFile(outputPath, processedBuffer);

      // In a real-world scenario, you'd upload this to a cloud storage service
      // and return the URL. For this example, we'll return a local path.
      return `/processed/${outputFileName}`;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Image processing failed');
    }
  }
}

module.exports = new ImageProcessor();