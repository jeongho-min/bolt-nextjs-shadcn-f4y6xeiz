const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertToWebP(directory) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const inputPath = path.join(directory, file);
                const outputPath = path.join(directory, `${path.parse(file).name}.webp`);

                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Converted ${file} to WebP`);
            }
        }
    } catch (error) {
        console.error('Error converting images:', error);
    }
}

convertToWebP('./public/facility'); 