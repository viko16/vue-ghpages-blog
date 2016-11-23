'use strict'

import {
  onlyTitle,
  onlyDate
} from '../../../src/utils'

describe('Utils', function () {
  const title = '2015-02-25-Chrome for Mac.md'
  const titleWithChinese = '2015-02-25-Chrome for Mac 扩展安装目录.md'
  const titleWithOddDate = '2015-2-5-Chrome for Mac.md'

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
})
