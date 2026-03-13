import { NextApiRequest, NextApiResponse } from "next";

const MAXLIMIT = 100;
const MAXOFFSET = 1000;

function getOffsetAndLimitFromReq(req:NextApiRequest, maxLimit:number, maxOffset:number) { 
  const parseLimit = parseInt(String(req.query.limit));
  const parseOffset = parseInt(String(req.query.offset));

  const limit:number = parseLimit <= maxLimit ? parseLimit : maxLimit;
  const offset:number = parseOffset < maxOffset ? parseOffset : 0;

  return { 
    limit,
    offset
  }
}

export function offsetAndLimitMiddleware(
  callback: (req:NextApiRequest, res:NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => { 
    const { limit, offset } = getOffsetAndLimitFromReq(req, MAXLIMIT, MAXOFFSET);
    (req as any).limit = limit;
    (req as any).offset = offset;
    return callback(req, res);
  }
}