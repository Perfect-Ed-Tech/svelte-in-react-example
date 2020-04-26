const path = require('path')

module.exports = function override(config, env) {
  config.resolve.alias.svelte = path.resolve('node_modules', 'svelte');
  config.resolve.extensions.push('.svelte');
  config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
  
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        oneOf: [
          {
            test: /\.svelte$/,
            use: {
              loader: 'svelte-loader'
            }
          },
          ...rule.oneOf
        ]
      };
    }
    return rule;
  })

  return config;
}
