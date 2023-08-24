import {appAxios} from '../api/config';

const makePostRequest = async (endpoint, body, config = {}) => {
  const {data} = await appAxios.post(endpoint, body, config);

  return data;
};
export default makePostRequest;
