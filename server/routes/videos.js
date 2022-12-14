import express from 'express'
import { addVideo, addView, deleteVideo, getVideo, getVideos, random, trending, sub, updateVideo, getByTags, search } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router()

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/", getVideos)
router.get("/find/:id", getVideo)
router.get("/view/:id", addView)
router.get("/trends", trending)
router.get("/random", random)
router.get("/tags", getByTags)
router.get("/search", search)
router.get("/sub", verifyToken, sub)
export default router;