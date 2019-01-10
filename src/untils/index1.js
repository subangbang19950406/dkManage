
import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
    queryType(type) {
        switch (type) {
            case "A01":
                return "数值型";
            case "B01":
                return "字符串类型";
            case "C01":
                return "布尔型（T，F）";
            case "D01":
                return "时间型（日期）";
            case "D02":
                return "时间型（时间）";
            case "D03":
                return "时间型（时间+日期）";
        }
    },
    leftPage(parentClass,childClass){
        let parentDiv = document.querySelector(parentClass)
        // let childDiv = document.querySelector(childClass)
        parentDiv.style.transition = "all 0.2s linear"
        parentDiv.style.marginLeft = "-106%"
    },
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    dates(datea) {
        let date = new Date(datea)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
    },
    times(timea) {
        let time = new Date(timea)
        return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    },
    pagination(res, callback) {//callback点击下一页触发的回调
        return {
            onChange: (current) => {
                callback(current)
            },
            current: res.data.pageNo,
            pageSize: res.data.pageSize,
            total: res.data.total,
            showTotal: () => {
                return `共${res.data.total}条`
            },
            showQuickJumper: true
        }
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
    // getOptionList(data){
    //     if(!data){
    //         return [];
    //     }
    //     let options = [] //[<Option value="0" key="all_key">全部</Option>];
    //     data.map((item)=>{
    //         options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    //     })
    //     return options;
    // },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
}