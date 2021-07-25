module.exports = {

    getProfileImage: (req, res) => {

        // https://localhost:80/image/profile/profile_87.png

        res.sendFile(req.params.path, {root: './uploads/profile/'});

    },

    getProjectImage: (req, res) => {

        // https://localhost:80/image/project/project_1_thumbnail_profile.jpeg
        
        const fileId = req.params.path.split('_')[1];
        res.sendFile(req.params.path, {root: `./uploads/project/${fileId}/`});

    }

}

