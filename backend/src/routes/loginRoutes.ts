import { Router} from "express"
import { ExFuncUserSignup } from "../controllers/auth/signup";
import { ExFuncVerifyEmail } from "../controllers/auth/verifyEmail";
import { ExFuncUpdatePass } from "../controllers/auth/updatePassword";
import { ExFuncLogin } from "../controllers/auth/login";
import { isTokenPresent } from "../middlewares/isTokenPresent.mdw";
import { isAlreadyIn } from "../middlewares/isAlreadyIn";
import { ExFuncLogOut } from "../controllers/auth/sign out";
import { ExFuncUpdateName } from "../controllers/auth/updateName";
import { userFrgtPassApp } from "../appwrite/user/Send-frgtPassword";
import { ExFuncResetPass } from "../controllers/auth/resetPassword";


const LoginRouter:Router = Router();

LoginRouter.post("/signup",ExFuncUserSignup)

LoginRouter.get("/verify",ExFuncVerifyEmail)

LoginRouter.patch("/update-password",isTokenPresent,ExFuncUpdatePass)
LoginRouter.patch("/update-name",isTokenPresent,ExFuncUpdateName)

LoginRouter.post("/frgt-password",userFrgtPassApp)

LoginRouter.post("/signin",isAlreadyIn,ExFuncLogin)

LoginRouter.get("/reset",ExFuncResetPass)


LoginRouter.get("/out",ExFuncLogOut)




export default LoginRouter