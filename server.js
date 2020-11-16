var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ limit: '150mb', 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '150mb', 'extended': 'true' })); // parse application/json
app.use(bodyParser.json({ limit: '150mb', type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.get('/',function(req,res){
//     res.render(path.join(__dirname+'/index'));
//     //__dirname : It will resolve to your project folder.
//   });

app.post('/api/login', function (req, res) {
    try {
        let _user = req.body.username;
        let _pass = req.body.password;
        let json = require('./credentials.json');
        let result = json.find((ele) => ele.username == _user);
        if (result && Object.keys(result).length > 0) {
            result = json.filter((ele) => { return ele.username == _user && ele.password == _pass });
            if (Array.isArray(result) && result.length > 0) {
                return res.status(200).json({ msg: "Successfully Logged in..." });
            } else {
                return res.status(200).json({ msg: "Incorrect Credentials!!" });
            }
        }
        return res.status(200).json({ msg: "Invalid Email" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Please Contact Administrator" });
    }
});

function setvalue() {
    console.log("calling setvalue.....");
}
var server = app.listen(8086, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
