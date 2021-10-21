const { request, gql } = require('graphql-request');
const fs = require('fs');

async function main() {
    await saveIconsTo('5.15.4', './src/v5.json');
    await saveIconsTo('6.0.0-beta2', './src/v6.json');
}

async function saveIconsTo(version, path) {

    const endpoint = 'https://api.fontawesome.com/';
    const variables = { version };

    const query = gql`
        query ($version: String!) {
            release(version: $version) {    
                icons {
                    id
                    unicode
                    membership {
                        pro
                        free
                    }
                }    
            }
        }`;

  const data = await request(endpoint, query, variables);
  await fs.promises.writeFile(path, JSON.stringify(data));

}

main(process.argv.slice(2)).catch(console.error);