const { response } = require('express');

const deleteImage = async (req, res = response) => {
  const cloudUrl = `https://api.cloudinary.com/v1_1/dcqudzsce/resources/image/upload?public_ids=super_market/${req.params.id}`;
  try {
    const resp = await fetch(cloudUrl, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Basic ' +
          base64.encode(
            process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SK
          ),
      },
    });
    const cloudResp = await resp.json();
    if (cloudResp.deleted[`super_market/${req.params.id}`] === 'deleted') {
      return res.status(200).json({
        ok: true,
        msg: cloudResp,
      });
    } else
      return res.status(404).json({
        ok: false,
        msg: cloudResp,
      });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  deleteImage,
};
