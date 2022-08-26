import { Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ApiResponseService {
  customApiResponse(@Res() res: Response, data, notFoundMsg, elseMsg) {
    if (data) {
      res.status(200).send(data);
    } else if (data === null) {
      // console.log(data);
      res.status(404).send({
        msg: notFoundMsg,
      });
    } else {
      res.status(500).send({
        msg: elseMsg,
      });
    }
  }

  customApiResponseForConts(@Res() res: Response, data, notFoundMsg, elseMsg) {
    const secondChecker = data.length > 0 || data === null ? true : false; //checks if data is an empty array
    if (secondChecker) {
      res.status(200).send(data);
    } else if (data === null || !secondChecker) {
      // console.log(data);
      res.status(404).send({
        msg: notFoundMsg,
      });
    } else {
      res.status(500).send({
        msg: elseMsg,
      });
    }
  }
}
