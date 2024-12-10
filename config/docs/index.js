//exporta los archivos creados en la carpet docs
const basicInfo = require('./basicInfo')
const components = require('./components')
const apiproductsDocs = require('./apiproductsDocs')

module.exports = {
    ...basicInfo,
    ...components,
    ...apiproductsDocs
}