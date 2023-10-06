type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'UNPROCESSABLE';

export type ServiceResponseMsg = { message: string };

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: { message: string };
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESS' | 'CREATED';
  data: T;
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
