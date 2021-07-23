const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = {

    uploadProfileImage : (req, res, next) => {

        const userId = req.params.id || parseInt(Math.random()*100000)

        const upload = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path.join('./uploads/profile'))
                },
                filename: async function (req, file, cb) {
                    cb(null, `profile_${userId}.` + file.mimetype.split('/')[1])
                }
            })
        })
        return upload.single('image')(req, res, next);
    },

    uploadProjectImage : (req, res, next) => {

        const projectId = req.params.id || req.headers.temp_id 
        
        const dir = `./uploads/project/${projectId}`
        try {
            fs.accessSync(dir)
        } catch (err) {
            fs.mkdirSync(dir, {recursive: true})
        }

        const upload = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path.join(dir))
                },
                filename: async function (req, file, cb) {
                    cb(null, `project_${projectId}_${file.fieldname}.` + file.originalname)
                }
            })
        })

        return upload.fields([{name: 'thumbnail', maxCount: 1}, {name: 'image', maxCount: 10}])(req, res, next);
    }

}
