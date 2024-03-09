import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetAdmin = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    const admin = request.user;
    return key ? admin?.[key] : admin;
  },
);
