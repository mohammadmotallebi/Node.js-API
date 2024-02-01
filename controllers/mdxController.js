const path = require('path');
const {glob} = require('glob')
const fs = require('fs');

class MdxController {

    async getMdxList(req, resp) {
        let fileNames = []; // array to hold file names
        //joining path of directory
        const directoryPath = path.join(__dirname, '../frontend/content');

        const files = await glob(directoryPath + '/**/*.md'); // get all md files

        files.forEach(function (file) {
                const filePath = file; //get file path
                //get file name remove extension and path
                const idx = filePath.replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.'); // get file name
                console.log(filePath)
                fileNames = [...fileNames, {path: filePath, _id: idx}]; // add file name to array
            }
        );
        return resp.json(fileNames); // return array
    }

    async readMdx(req, res) { // read mdx file
        console.log(req.body)
        const fileContent = fs.readFileSync(req.body.path, {encoding: 'utf8', flag: 'r'}); // read file content

        return res.json({fileContent: fileContent}); // return file content
    }

    async saveMdx(req, res) { // save mdx file
        const fileContent = req.body.content; // get file content
        const filePath = req.body.path; // get file path
        const file = await fs.writeFileSync(filePath, fileContent, {encoding: 'utf8', flag: 'w'}); // write file content
        return res.json({file: file});
    }
}

module.exports = new MdxController();