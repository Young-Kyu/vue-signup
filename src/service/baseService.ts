import axios, { AxiosHeaders, type AxiosResponse, } from "axios";

const interceptConfig = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});

interceptConfig.interceptors.request.use(

  async function (config) {
    try {
      return config;
    } catch (err) {
      return Promise.reject(err);
    }
  }
)

const GET = (url: string, method: ServiceMethodType, data: any, rest?: any) => {
  return interceptConfig({
    url,
    method: 'get',
    params: data,
    ...rest
  })
}

const Mutation = (url: string, method: ServiceMethodType, data: any, rest?: any) => {
  return interceptConfig({
    url,
    method,
    data: data,
    ...rest
  })
};


const baseSerive = async ({ method, url, data, ...rest }: BaseSeriveRequest) => {
  let callback;

  if (method === 'get') {
    callback = GET;
  } else {
    callback = Mutation;
  }

  try {

    const response: AxiosResponse<any> = await callback(url, method, data, rest);

    if (response && response.data) {

      if (response.data.successOrNot === 'Y') {
        return response.data.data;
      }
    }
    return response
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.successOrNot) {
      throw new CustomServerError(err.response.status, err.response.data.statusCode, err.response.data.statusCode);
    }
    throw err;
  }

}

export type ServiceMethodType = "get" | 'post' | 'put' | 'delete';

export interface BaseSeriveRequest {
  method: ServiceMethodType;
  params?: any;
  url: string;
  [key: string]: any;
};

export default baseSerive;
/**
 * @params staus : number, message : string, statusCode : string
 */
class CustomServerError {
  private status = 0;
  private message = '';
  private statusCode = '';
  constructor(status: number, message: string, statusCode: string) {
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
  }

  getError() {
    return {
      status: this.status,
      message: this.message,
      statusCode: this.statusCode
    }
  }

};

// export default CustomServerError;
