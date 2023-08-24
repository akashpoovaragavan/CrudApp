import {appAxios} from '../api/config';

const makePutRequest = async (endpoint, body) => {
  const {data} = await appAxios.put(endpoint, body);

  return data;
};
export default makePutRequest;
