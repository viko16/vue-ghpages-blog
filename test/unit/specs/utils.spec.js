'use strict'

import {
  onlyTitle,
  onlyDate,
  objReduce
} from '../../../src/utils'

describe('Utils', function () {
  const title = '2015-02-25-Chrome for Mac.md'
  const titleWithChinese = '2015-02-25-Chrome for Mac 扩展安装目录.md'
  const titleWithOddDate = '2015-2-5-Chrome for Mac.md'

  const originObject = {
    'name': '2015-02-25-Chrome for Mac.md',
    'path': 'posts/2015-02-25-Chrome for Mac.md',
    'sha': '35d4387629a7ff34f6d9f1d068101cac958f057c',
    'size': 437,
    'url': 'https://api.github.com/repos/viko16/writings/contents/posts/2015-02-25-Chrome%20for%20Mac%20%E6%89%A9%E5%B1%95%E5%AE%89%E8%A3%85%E7%9B%AE%E5%BD%95.md?ref=master'
  }

  describe('onlyTitle()', function () {
    it('should return a string', function () {
      expect(onlyTitle(title)).to.be.a('string')
      expect(onlyTitle(titleWithChinese)).to.be.a('string')
    })

    it('should remove other info', function () {
      expect(onlyTitle(title)).to.eql('Chrome for Mac')
      expect(onlyTitle(titleWithChinese)).to.eql('Chrome for Mac 扩展安装目录')
    })
  })

  describe('onlyDate()', function () {
    it('should return a string', function () {
      expect(onlyDate(title)).to.be.a('string')
      expect(onlyDate(titleWithChinese)).to.be.a('string')
    })

    it('should get date string', function () {
      expect(onlyDate(title)).to.eql('2015-02-25')
      expect(onlyDate(titleWithChinese)).to.eql('2015-02-25')
      expect(onlyDate(titleWithOddDate)).to.eql('2015-2-5')
    })
  })

  describe('objReduce()', function () {
    const compareObject = {
      'name': '2015-02-25-Chrome for Mac.md',
      'sha': '35d4387629a7ff34f6d9f1d068101cac958f057c'
    }
    it('should got the only properties', function () {
      expect(objReduce(originObject, ['name', 'sha'])).to.eql(compareObject)
    })
  })
})
