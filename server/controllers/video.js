import { createError } from "../error.js";
import Video from "../models/Video.js"
import User from "../models/User.js";
export const addVideo = async (req, res, next) => {
    
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try{
        const savedVideo = await new Video(newVideo).save()
        res.status(200).json(savedVideo);

    }catch(error){
        next(error)
    }
}

export const updateVideo = async (req, res, next) => {
    
    try{
        const video = await Video.findById(req.body.id)
        if(!video) return next(createError(404, "Video not found"));
        if(req.user.id === video.user){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).json(updatedVideo)
        }else{
            return next(createError(403, "You can update only your video"));
        }
    }catch(error){
        next(error)
    }
}


export const deleteVideo = async (req, res, next) => {
    
    try{
        const video = await Video.findById(req.body.id)
        if(req.user.id === video.user){

        const deletedVideo = await Video.findByIdAndDelete(req.params.id)
        res.status(200).json({"message": "Video Deleted Successfully..."})
    }else{
        return next(createError(403, "You can delete only your video"));
    }
    }catch(error){
        next(error)
    }
}


export const getVideo = async (req, res, next) => {
    
    try{
        const video = await Video.findById(req.params.id)
        return res.status(200).json(video)
        
    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const getVideos = async (req, res, next) => {
    
    try{
        const video = await Video.findById({})
        return res.status(200).json(video)
        
    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const addView = async (req, res, next) => {
    
    try{
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            {
                $inc:{views: 1}
            }
        )
        return res.status(Video).json({"message" : "View has been increased"})

    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const random = async (req, res, next) => {
    
    try{
        const video = await Video.aggregate([{ $sample: { size: 40 }}])
        return res.status(200).json(video)

    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const trending = async (req, res, next) => {
    
    try{
        const video = await Video.find().sort({views:-1})
        return res.status(200).json(video)

    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const sub = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                console.log(channelId);
                return Video.find({userId: channelId})
            })
        )
        return res.status(200).json(list.flat().sort((a, b) => b.createAt - a.createdAt))

    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const getByTags = async (req, res, next) => {
    
    
    const tags = req.query.tags.split(",");
    
    try{

        const video = await Video.find({tags:{$in:tags}}).limit(20)
        return res.status(200).json(video)
    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}

export const search = async (req, res, next) => {
    const query = req.query.q;
    
    try{
        const video = await Video.find({ 
            title: {$regex: query, $options:"i"}
        }).limit(40)
        return res.status(200).json(video)

    }catch(error){
        next(error)
    }

    try{

    }catch(error){
        next(error)
    }
}
