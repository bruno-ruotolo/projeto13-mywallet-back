import joi from "joi";

export async function validRegisterJoi(req, res, next) {
  const { name, email, password, passwordConfirm } = req.body;

  const signUpBody = {
    name,
    email,
    password,
    passwordConfirm
  }

  const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$/).required(),
    passwordConfirm: joi.ref("password")
  });

  const { error } = signUpSchema.validate(signUpBody);
  if (error) return res.status(422).send(error.details.map(detail => detail.message));

  next();
}