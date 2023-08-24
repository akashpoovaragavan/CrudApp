import {appAxios} from '../api/config';

const makeDeleteRequest = async endpoint => {
  const {data} = await appAxios.delete(endpoint);
  return data;
};

export default makeDeleteRequest;
