import express, {Request, Response} from "express";
const router = express.Router()

router.get("/", async(req: Request, res: Response) => {
    res.redirect("https://documenter.getpostman.com/view/22416364/2s9YsNeAfy")
})

export default router