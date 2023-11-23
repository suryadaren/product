export class SuccessResponse {
  constructor(code: number, message: string, data: any) {
    return {
      data: data,
      meta: {
        code,
        message,
      },
    };
  }
}
