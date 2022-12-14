import { createError } from "../error.js";
import Comments from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comments({...req.body, userId:req.user.id})
    try{
        const savedComment = await newComment.save();

        return res.status(200).json(savedComment)

    }catch(error){
        next(error)
    }
}
export const deleteComment = async (req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json({"message" : "Comment deleted"});
        }else{
            return next(createError(403, "You can delete only your comment"))
        }

    }catch(error){
        next(error)
    }
}
export const getComments = async (req, res, next) => {
    try{
        const comments = await Comments.find({videoId: req.params.videoId});
        res.status(200).json(comments)
    }catch(error){
        next(error)
    }
}