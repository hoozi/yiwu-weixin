import request from '@/utils/request';
import { stringify } from 'qs';

export async function addRepair(data) {
  return request('/api/repair', {
    method: 'POST',
    data
  });
}

export async function queryRepair(params) {
  return request(`/api/repairStatus/page?${stringify(params)}`)
}

export async function queryStatusListById(id) {
  return request(`/api/repairStatus/${id}`)
}