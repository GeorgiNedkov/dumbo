import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';

import handleErrorMiddleware from '../../../middleware/handle-error';
import Video from '../../../models/Video';

let get: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    const video = await Video.findById(id);

    res.send({ video: video });
    return;
  }

  res.send({ video: undefined });
};

get = handleErrorMiddleware(get);

export default get;
