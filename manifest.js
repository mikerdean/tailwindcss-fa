const { request, gql } = require('graphql-request');
const fs = require('fs');
const path = require('path');

const endpoint = 'https://api.fontawesome.com/';

async function main() {
    
    const dir = './manifests';
    const versions = await getVersions();
    versions.push('6.0.0-beta1');
    versions.push('6.0.0-beta2');

    for (let i = 0; i < versions.length; i++) {
        await saveIconsTo(versions[i], dir);
    }

    await createIndex(versions, dir);
}

async function getVersions() {

    const query = gql`{
        releases {    
            version 
        }
    }`;

    const data = await request(endpoint, query);
    return data.releases.map(x => x.version);

}

async function saveIconsTo(version, dir) {

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
  const jsonPath = path.join(dir, version + '.json');
  await fs.promises.writeFile(jsonPath, JSON.stringify(data));

}

async function createIndex(versions, dir) {

    let js = 'module.exports = {\n';
    const last = versions.length - 1;

    for(let i = 0; i <= last; i++) {
        const v = versions[i];
        js += `\t"${v}": require("./${v}.json")`

        if (i !== last) {
            js += ',';
        }

        js += '\n';
    }

    js += '};'

    const indexPath = path.join(dir, 'index.js');
    await fs.promises.writeFile(indexPath, js);
}

main(process.argv.slice(2)).catch(console.error);