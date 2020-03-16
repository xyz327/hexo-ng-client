module.exports = {
    packagerConfig: {},
    makers: [
    ],
    publishers:[
        {
            name: '@electron-forge/publisher-github',
            config: {
              repository: {
                owner: 'me',
                name: 'awesome-thing'
              },
              prerelease: true
            }
          }
    ]
}