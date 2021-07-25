const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const CommentModel = require("../models/Comments.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

<<<<<<< HEAD:routes/comments.route.js

//Adicionar comentario (C)
=======
// Rota de postar o comentario precisa ser post e put (para acrescentar o ID do comentário ao perfil do usuário)
>>>>>>> 5dc4222cb0def0161ce5b684f5253c7073e17da3:routes/comments.routes.js
router.post(
  "/:contentId/comment",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { contentId } = req.params;
      const loggedInUser = req.currentUser;

      const newComment = await CommentModel.create({
<<<<<<< HEAD:routes/comments.route.js
        userId: loggedInUser._id,
        title: req.body.title,
        comment: req.body.comment,
=======
        title: String,
        comment: String,
        userId: loggedInUser._id,
        contentId: contentId,
>>>>>>> 5dc4222cb0def0161ce5b684f5253c7073e17da3:routes/comments.routes.js
      });
      return res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);

<<<<<<< HEAD:routes/comments.route.js

//Editar comentario (U) 
router.put(
  "/:moveId/comment/:id",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedComment = await CommentModel.findOneAndUpdate(
          {_id: id},
          {$set: {...req.body}},
          {new: true, runValidators: true}
        )

        if(updatedComment){
            return res.status(200).json(updatedComment)
        }
        return res.status(400).json({error: "Comentario não encontrado"})
    } catch (err) {
      next(err);
    }
  }
);

//Deletar um comentario (D)
router.delete(
    "/:moveId/comment/:id",
    isAuthenticated,
    attachCurrentUser,
    
    async(req, res, next)=>{
        try{
            const{id}=req.params

            const comment = await CommentModel.findOne({_id: id});
            const deleteComment = await CommentModel.deleteOne({_id:id})

            if(deletionResult.n>0){
                const updatedMovie = await 
            }
        }catch(err){
            next(err)
        }
    }
)
=======
router.put("/:contentId/comment"),
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
>>>>>>> 5dc4222cb0def0161ce5b684f5253c7073e17da3:routes/comments.routes.js

module.exports = router;
