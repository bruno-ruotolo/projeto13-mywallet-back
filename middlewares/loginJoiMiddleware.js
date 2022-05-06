import joi from "joi";

export async function validLoginJoi(req, res, next) {
  const { email, password } = req.body;

  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const { error } = loginSchema.validate({ email, password });
  if (error) return res.status(422).send(error.details.map(error => error.message));

  next();
}