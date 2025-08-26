import type { Request, Response } from "express";

class HomepageController {
// middleware final lié à la route / en GET

    public get = (req: Request, res: Response): Response => {
        return res.send("coucou");
    };
    
}
export default HomepageController;