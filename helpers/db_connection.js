const mongoose = require('mongoose')

function DatabaseConntection(url){
    mongoose.connect(url, {useNewUrlParser: true})
            .then(()=> {
                console.log("Database connected...");
            })
            .catch(err=> {
                console.log(err);
            })
}

module.exports = DatabaseConntection