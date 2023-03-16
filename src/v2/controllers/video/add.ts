import { RequestHandler } from 'express';

import handleErrorMiddleware from '../../../middleware/handle-error';
import Video from '../../../models/Video';

let add: RequestHandler = async (req, res) => {
  const { type, messages } = req.body;

  const video = new Video({ type, messages });
  await video.save();

  res.send({
    message: `Saved`,
    book: video.toJSON(),
  });
};

add = handleErrorMiddleware(add);

export default add;
