import { MiddlewareHandler } from 'hyper-express';

export const authorize: MiddlewareHandler = async (req, res, next) => {
  let token: string | undefined = req.header('authorization');

  const apiKey: string | undefined = process.env.API_KEY;

  if (!apiKey) {
    console.log('forgot API key whoopsie');
    return res.status(500, 'API_KEY env variable not set.');
  }

  if (token) {
    token = token.slice(7);
    if (token === apiKey) {
      return next();
    }
  }
  res.status(401, 'Unauthorized');
  res.send();
};
