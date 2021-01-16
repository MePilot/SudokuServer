
  const mongoose = require('mongoose')
  const random = require('mongoose-simple-random');
  const userSchema = new mongoose.Schema ({
      
    matrix:{
        type:Array
       
    },
    hiddenMatrix:{
        type:Array
        
    },
    size:{
        type:Number
    }
},

)
userSchema.plugin(random)

const HardGame = mongoose.model('games', userSchema)

module.exports=HardGame

