const path = require('path');

module.exports = {
    module: {
        rules: [
            /**
             * 自上而下解析   自下而上执行
             */
            {
                test:/\.js/,
                use:[
                    'loaders1',
                    'loaders2',
                    'loaders3'
                ]
            }
        ]
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}