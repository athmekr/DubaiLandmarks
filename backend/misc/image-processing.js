const Parse = require('parse/node');
const sharp = require('sharp');
const crypto = require('crypto');

module.exports = async (file) => {
  const buffer = file.buffer.toString('base64');
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  const original = new Parse.File(hash, {base64: buffer});
  await original.save();

  const resized = await sharp(file.buffer)
    .rotate()
    .resize(250, 250, {
      fit: 'inside'
    }).toBuffer();
  const resized_buffer = resized.toString('base64');
  const thumbnail = new Parse.File('thumb_' + hash, {base64: resized_buffer});
  await thumbnail.save();

  return {
    original,
    thumbnail
  }
};
