import axios from 'axios';

import store from '@/store';

export default() => {
  if ( location.hostname === '10.96.1.2' ) {
    return axios.create({
      baseURL: `${ location.protocol }//10.96.1.1/api`,
      headers: {
        'Authorization': store.state.token,
        'Content-Type': 'application/json',
      },
    });
  } else {
    return axios.create({
      baseURL: `${ location.protocol }//${ location.hostname }:8080/api`,
      headers: {
        'Authorization': store.state.token,
        'Content-Type': 'application/json',
      },
    });
  }
};
