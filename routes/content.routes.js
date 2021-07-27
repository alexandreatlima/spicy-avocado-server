const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const ContentModel = require("../models/Content.model");

// Puxar infos do filme por ID (R)

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

// // Puxar infos do filme por nome (R) - Rota de search

// router.get(
//   "/search/contentInfos",
//   isAuthenticated,
//   attachCurrentUser,

//   async (req, res, next) => {
//     try {
//       const { original_title } = req.query;
//       const originalRegExp = new RegExp(original_title, "gi");
//       console.log(originalRegExp);

//       // No front: /search/contentInfos?original_title=<oq o cara pesquisou>
//       const contentInfos = await ContentModel.find({
//         $or: [{ original_title: { $regex: "^" + original_title } }],
//       });
//       return res.status(200).json(contentInfos);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

module.exports = router;
