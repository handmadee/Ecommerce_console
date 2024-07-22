'use strict'

const { Types } = require("mongoose");



/**
 *
 *
 * @param {*} [select=[]]
 * @desc selectPropties to Object
 */
const selectData = (select = []) => Object.fromEntries(select.map(al => [al, 1]));
const unSelectData = (select = []) => Object.fromEntries(select.map(al => [al, 0]));

//V2
const selectDataV2 = (select = []) => select.reduce((data, key) => { data[key] = 1; return data }, {});
const unSelectDataV2 = (select = []) => select.reduce((data, key) => { data[key] = 0; return data }, {});

// remove Atributer Object null or undifire 
const removeAttributes = (obj = {}) => {
    for (const key in obj) {
        console.log(key)
        if (obj[key] == null || obj[key] == undefined) {
            delete obj[key];
        }
    }
    return obj;
}



/**
 *
 *
 * @param {*} [obj={}]
 * @desc remove key in object if null or undifine 
 * @return {*} 
 */
const removeNesstedAttributesObject = (obj = {}) => {
    for (const key in obj) {
        if (obj[key] == null || obj[key] == undefined) delete obj[key];
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) removeNesstedAttributesObject(obj[key]);
    }
    return obj;
}

/**
 *
 *
 * @param {*} [obj={}]
 * @desc remove key in object if null or undifine 
 * @version 2
 * @return {*} 
 */
const removeNestedAttributesObjectV2 = (obj = {}) => {
    for (const [key, value] of Object.entries(obj)) {
        if (value == null) {
            delete obj[key];
        } else if (typeof value === 'object' && !Array.isArray(value)) {
            removeNestedAttributesObjectV2(value);
        }
    }
    return obj;
};




// RemoveNessted and V3 by tipJS 
const removeNestedAttributesObjectV3 = (obj = {}) => {
    const final = {};

    Object.keys(obj).forEach(key => {
        const value = obj[key];

        if (value == null) {
            // Skip null or undefined values
            return;
        }

        if (typeof value === 'object' && !Array.isArray(value)) {
            const nestedObject = removeNestedAttributesObjectV3(value);
            Object.keys(nestedObject).forEach(nestedKey => {
                final[`${key}.${nestedKey}`] = nestedObject[nestedKey];
            });
        } else {
            final[key] = value;
        }
    });

    return final;
};

/**
 *
 *
 * @param {*} id
 * @desc: Convert id => objectID
 * @return {*} 
 */
const convertObjectId = (id) => {
    return new Types.ObjectId(id)
}








module.exports = { selectDataV2, unSelectDataV2, unSelectData, removeAttributes, removeNesstedAttributesObject, removeNestedAttributesObjectV3, convertObjectId }


