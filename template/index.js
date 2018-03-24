/**
 * @param {function} fun 接口
 * @param {object} options 接口参数
 * @returns {Promise} Promise对象
 */
function fetch(options) {
  options = options || {};
  return new Promise((resolve, reject) => {
    options.success = resolve;
    options.fail = reject;
    wx.request(options);
  });
}

const API = 'http://japi.zto.cn/zto/api_utf8/baseArea?msg_type=GET_AREA&data=';
const defaultProvince = 1;

const conf = {
  addDot: function (arr) {
    if (arr instanceof Array) {
      const tmp = arr.slice();
      tmp.map(val => {
        if (val.name.length > 4) {
          val.fullNameDot = val.name.slice(0, 4) + '...';
        } else {
          val.fullNameDot = val.name;
        }
      });
      return tmp;
    }
  },
  /**
	 * 滑动事件
	 * @param {object} e 事件对象
	 */
  bindChange: function (e) {
    const currentValue = e.detail.value;
    console.log(e.detail.value);
    const { value, provinceData } = this.data.areaPicker;
    const self = _getCurrentPage();
    const hideDistrict = self.config.hideDistrict;
    const provinceCondition = hideDistrict ? value[0] !== currentValue[0] && value[1] === currentValue[1] : value[0] !== currentValue[0] && value[1] === currentValue[1] && value[2] === currentValue[2];
    const cityCondition = hideDistrict ? value[0] === currentValue[0] && value[1] !== currentValue[1] : value[0] === currentValue[0] && value[1] !== currentValue[1] && value[2] === currentValue[2];
    const districtCondition = hideDistrict ? false : value[0] === currentValue[0] && value[1] === currentValue[1] && value[2] !== currentValue[2];
    if (provinceCondition) {
      // 滑动省份
      fetch({
        url: API + 'assets/cities/',
          data: {
              prov_id: provinceData[currentValue[0]].id
          },
        method: 'GET'
      }).then((city) => {
        const cityData = city.data;
        console.log("城市列表=",cityData);
        if (cityData && cityData.length) {
          const dataWithDot = conf.addDot(city.data);
          this.setData({
            'areaPicker.cityData': dataWithDot
          });
          // return (
          //   fetch({
          //     url: API + dataWithDot[0].code,
          //     method: 'GET'
          //   })
          // );
            return;
        } else {
          this.setData({
            'areaPicker.cityData': [],
            'areaPicker.districtData': [],
            'areaPicker.address': provinceData[currentValue[0]].name,
            'areaPicker.selected': [provinceData[currentValue[0]]],
          });
        }
      }).then((district) => {
        const { cityData } = this.data.areaPicker;
        if(!district){
            this.setData({
                'areaPicker.districtData': [],
                'areaPicker.value': [ currentValue[0], currentValue[1], 0 ],
                'areaPicker.address': provinceData[currentValue[0]].name + ' - ' + cityData[0].name,
                'areaPicker.selected': [provinceData[currentValue[0]], cityData[0]]
            });
            return;
        }
        const districtData = district.data.result;
        if (districtData && districtData.length > 0) {
          const dataWithDot = conf.addDot(districtData);
          this.setData({
            'areaPicker.districtData': dataWithDot,
            'areaPicker.value': [ currentValue[0], 0, 0 ],
            'areaPicker.address': provinceData[currentValue[0]].fullName + ' - ' + cityData[0].fullName + (hideDistrict ? '' : ' - ' + dataWithDot[0].fullName),
            'areaPicker.selected': hideDistrict ? [provinceData[currentValue[0]], cityData[0]] : [provinceData[currentValue[0]], cityData[0], dataWithDot[0]]
          });
        } else {
          this.setData({
            'areaPicker.districtData': [],
            'areaPicker.value': [ currentValue[0], currentValue[1], 0 ],
            'areaPicker.address': provinceData[currentValue[0]].fullName + ' - ' + cityData[0].fullName,
            'areaPicker.selected': [provinceData[currentValue[0]], cityData[0]]
          });
        }
      }).catch((e) => {
        console.error(e);
      });
    } else if (cityCondition) {
      const { provinceData, cityData } = this.data.areaPicker;
        this.setData({
            'areaPicker.districtData': [],
            'areaPicker.value': [ currentValue[0], currentValue[1], 0 ],
            'areaPicker.address': provinceData[currentValue[0]].name + ' - ' + cityData[currentValue[1]].name,
            'areaPicker.selected': [provinceData[currentValue[0]], cityData[currentValue[1]]]
        });
      // 滑动城市
      // fetch({
      //   url: API + cityData[currentValue[1]].code,
      //   method: 'GET'
      // }).then((district) => {
      //   if (!district) return;
      //   const districtData = district.data.result;
      //   if (districtData && districtData.length > 0) {
      //     const dataWithDot = conf.addDot(districtData);
      //     this.setData({
      //       'areaPicker.districtData': dataWithDot,
      //       'areaPicker.value': [ currentValue[0], currentValue[1], 0 ],
      //       'areaPicker.address': provinceData[currentValue[0]].fullName + ' - ' + cityData[currentValue[1]].fullName + (hideDistrict ? '' : ' - ' + dataWithDot[0].fullName),
      //       'areaPicker.selected': hideDistrict ? [provinceData[currentValue[0]], cityData[currentValue[1]]] : [provinceData[currentValue[0]], cityData[currentValue[1]], dataWithDot[0]]
      //     });
      //   } else {
      //     this.setData({
      //       'areaPicker.districtData': [],
      //       'areaPicker.value': [ currentValue[0], currentValue[1], 0 ],
      //       'areaPicker.address': provinceData[currentValue[0]].fullName + ' - ' + cityData[currentValue[1]].fullName,
      //       'areaPicker.selected': [provinceData[currentValue[0]], cityData[currentValue[1]]]
      //     });
      //   }
      // }).catch((e) => {
      //   console.error(e);
      // });
    } else if (districtCondition) {
      const { cityData, districtData } = this.data.areaPicker;
      // 滑动地区
      this.setData({
        'areaPicker.value': currentValue,
        'areaPicker.address': provinceData[currentValue[0]].fullName + ' - ' + cityData[currentValue[1]].fullName + (hideDistrict ? '' : ' - ' + districtData[currentValue[2]].fullName),
        'areaPicker.selected': hideDistrict ? [provinceData[currentValue[0]], cityData[currentValue[1]]] : [provinceData[currentValue[0]], cityData[currentValue[1]], districtData[currentValue[2]]]
      });
    }
  }
};

function _getCurrentPage() {
  const pages = getCurrentPages();
  const last = pages.length - 1;
  return pages[ last ];
}

export const getSelectedAreaData = () => {
  const self = _getCurrentPage();
  return self.data.areaPicker.selected;
};

export default (config = {}) => {
  const self = _getCurrentPage();
  self.setData({
    'areaPicker.hideDistrict': !config.hideDistrict
  });
  self.config = config;
  self.bindChange = conf.bindChange.bind(self);

  fetch({
    // url: API + '0',
    url: API + 'assets/provinces/',
    method: 'GET'
  }).then((province) => {
    console.log("省份=", province.data);
    const firstProvince = province.data[defaultProvince];
    const dataWithDot = conf.addDot(province.data);
    /**
		 * 默认选择获取的省份第一个省份数据
		 */
    self.setData({
      'areaPicker.provinceData': dataWithDot,
      'areaPicker.selectedProvince.index': 0,
      'areaPicker.selectedProvince.code': firstProvince.id,
      'areaPicker.selectedProvince.fullName': firstProvince.name,
    });
    return (
      fetch({
        url: API + 'assets/cities/',
         data: {
             prov_id: firstProvince.id
         } ,
        method: 'GET'
      })
    );
  }).then((city) => {
    const firstCity = city.data[0];
    const dataWithDot = conf.addDot(city.data);
    self.setData({
      'areaPicker.cityData': dataWithDot,
      'areaPicker.selectedCity.index': 0,
      'areaPicker.selectedCity.code': firstCity.id,
      'areaPicker.selectedCity.fullName': firstCity.name,
    });
    /**
		 * 省市二级则不请求区域
		 */
    if (!config.hideDistrict) {
      return (
        fetch({
          url: API + firstCity.code,
          method: 'GET'
        })
      );
    } else {
      const { provinceData, cityData } = self.data.areaPicker;
      self.setData({
        'areaPicker.value': [defaultProvince, 0],
        'areaPicker.address': provinceData[defaultProvince].name + ' - ' + cityData[0].name,
        'areaPicker.selected': [provinceData[defaultProvince], cityData[0]]
      });
    }
  }).then((district) => {
    if (!district) return;
    const firstDistrict = district.data.result[0];
    const dataWithDot = conf.addDot(district.data.result);
    const { provinceData, cityData } = self.data.areaPicker;
    self.setData({
      'areaPicker.value': [defaultProvince, 0, 0],
      'areaPicker.districtData': dataWithDot,
      'areaPicker.selectedDistrict.index': 0,
      'areaPicker.selectedDistrict.code': firstDistrict.id,
      'areaPicker.selectedDistrict.fullName': firstDistrict.name,
      'areaPicker.address': provinceData[defaultProvince].name + ' - ' + cityData[0].name + ' - ' + firstDistrict.name,
      'areaPicker.selected': [provinceData[defaultProvince], cityData[0], firstDistrict]
    });
  }).catch((e) => {
    console.error(e);
  });
};
