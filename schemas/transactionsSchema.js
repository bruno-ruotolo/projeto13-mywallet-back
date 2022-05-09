import joi from "joi";

export async function transactionsSchema(req, res, next) {
  const reqBody = req.body;
  const newEntrySchema = joi.object({
    value: joi.string().pattern(/(^[0-9]+,\d{1,2}$)|(^[0-9]+$)/).required(),
    description: joi.string().required()
  });

  const { error } = newEntrySchema.validate(reqBody, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message));

  next();
}