import Joi from "joi";

const taskValidation = Joi.object({
  name: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
});

const signinValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signupValidation = Joi.object({
  firstname: Joi.string().min(3).max(12).required(),
  lastname: Joi.string().min(3).max(12).required(),
  username: Joi.string().min(5).max(10).case("lower").required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { taskValidation, signinValidation, signupValidation };
