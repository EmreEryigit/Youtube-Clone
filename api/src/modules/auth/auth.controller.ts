import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail } from "../user/user.service";
import { Jwt } from "jsonwebtoken";
import { signJwt } from "./auth.utils";
import omit from "../../helpers/omit";
import { LoginBody } from "./auth.schema";
import { RegisterUserBody } from "../user/user.schema";

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    const {email, password} = req.body
    const user = await findUserByEmail(email)

    if(!user || !user.comparePassword(password)) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Invalid password or email!")
    }

    const payload = omit(user.toJSON(), ["password"])

    const jwt = signJwt(payload)

    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false     
    })

    return res.status(StatusCodes.OK).send(jwt)

}