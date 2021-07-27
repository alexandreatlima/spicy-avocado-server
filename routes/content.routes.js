const express = require("express");
const router = express.Router();

const ContentModel = require("../models/Content.model");

// Puxar infos do filme pelo nome (R)

router.get(
  "/:contentType/:contentId/contentInfos",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { contentType, contentId } = req.params;
      const contentInfos = await ContentModel.findOne({
        contentType: contentType,
        contentId: contentId,
      });
      return res.status(200).json(contentInfos);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
