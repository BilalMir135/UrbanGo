import { Success, Failed } from '../interfaces/resHandlers.interface';

export const handleSuccess = (doc: any): Success => {
  return { statusCode: 200, status: 'success', doc };
};

export const handleError = (message: string): Failed => {
  return { statusCode: 400, message };
};
