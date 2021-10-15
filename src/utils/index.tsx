import axios from "axios";
import {notification} from 'antd';

export const getRequest = (url: string) => axios.get(url)
export const postRequest = (url: string, payload: any) => axios.post(url, payload)
export const updateRequest = (url: string, payload: any) => axios.patch(url, payload)
export const deleteRequest = (url: string) => axios.delete(url)


export const openNotification = (message: string, description: string,) => {
  notification.error({message, description});
};