const path = require('path');
const {glob} = require('glob')
const fs = require('fs');

class MdxController {

    async getMdxList(req, resp) {
        let fileNames = [];
        //joining path of directory
        const directoryPath = path.join(__dirname, '../frontend/content');

        const files = await glob(directoryPath + '/**/*.md');

        files.forEach(function (file) {
                const filePath = file;
                //get file name remove extension and path
                const idx = filePath.replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.');
                console.log(filePath)
                fileNames = [...fileNames, {path: filePath, _id: idx}];
            }
        );
        return resp.json(fileNames);
    }
    async readMdx(req, res) {
        console.log(req.body)
        const fileContent = fs.readFileSync(req.body.path, {encoding:'utf8', flag:'r'});

        return res.json({fileContent: fileContent});
    }
    async saveMdx(req, res) {
        const fileContent = req.body.fileContent;
        const filePath = req.body.filePath;
        const file = await fs.writeFileSync(filePath, fileContent, {encoding:'utf8', flag:'w'});
        return res.json({file: file});
    }
}

module.exports = new MdxController();