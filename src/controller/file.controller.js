const uploadFile = require("../middleware/upload");
const upload = async (req, res) => {

 
  try {
    await uploadFile(req, req.body);

  
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    console.log("req parameters >>>>>>>>>>>>>>> ", req.body)
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee ",  req.file.originalname)

    res.status(200).send({

      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};











const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};




const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
module.exports = {
  upload,
  getListFiles,
  download,
};