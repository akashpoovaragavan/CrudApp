import {appAxios} from '../api/config';

const makeGetRequest = async (endpoint, body) => {
  const {data} = await appAxios.get(endpoint, body);
  return data;
};
export default makeGetRequest;
