import { axiosInstance, getListUrl, getPostUrl } from '@/api'
import MockAdapter from 'axios-mock-adapter'
const mock = new MockAdapter(axiosInstance)

/* eslint-disable import/no-webpack-loader-syntax */
const mockListData = require('./mockData/list.json')
const mockPostData = require('raw-loader!./mockData/detail.md')

// mock github response where testing
mock.onGet(getListUrl()).reply(200, mockListData)
mock.onGet(getPostUrl('d7266981ec507bc60b13b6f8585d449b26729039')).reply(200, mockPostData)
