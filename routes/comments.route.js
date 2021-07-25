const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const CommentModel = require("../models/Comments.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");


//Adicionar comentario (C)
router.post(
  "/:moveId/comment",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { type } = req.body;
      const loggedInUser = req.currentUser;

      const newComment = await CommentModel.create({
        userId: loggedInUser._id,
        title: req.body.title,
        comment: req.body.comment,
      });
      return res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }
);


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

module.exports = router;
