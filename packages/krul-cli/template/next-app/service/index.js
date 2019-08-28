import qs from 'qs';
import axiosWrap from 'utils/axiosWrap';
export function getFavArticle(params) {
  return axiosWrap().get('/api/material/getFavArticle', { params });
}
