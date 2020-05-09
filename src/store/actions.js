/**
 * 通过mutation间接更新state的多个方法对象
 * */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShopList,
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}){
    const geohash = state.latitude + ',' + state.longitude;
    // 发送异步ajax请求
    const result = await reqAddress(geohash)
    // 根据结果提交mutation
    if(result.code === 0){
      const address = result.data;
      commit(RECEIVE_ADDRESS, {address});
    }
  },
  // 异步获取食品分类数组
  async getCategorys ({commit}){
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 根据结果提交mutation
    if(result.code === 0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS, {categorys});
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}){
    const {latitude, longitude} = state;
    // 发送异步ajax请求
    const result = await reqShopList(longitude, latitude)
    // 根据结果提交mutation
    if(result.code === 0){
      const shops = result.data;
      commit(RECEIVE_SHOPS, {shops});
    }
  },
}
