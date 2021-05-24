

const app= Vue.createApp({
    data(){
        return{
            Text:[
                {
                    text:"",
                    label:""
                }
            ],
            Shrijithtext:"",
            Friendtext:'',  
             }
    },
methods:{
  Shrijithtextlistadd(){
        this.Text.push({
            value:this.Shrijithtext,
            label:"Shrijith",
            timestamp:this.getdatetime()
        })
        this.Shrijithtext="";
        
    },
    Friendtextlistadd(){
        this.Text.push({
            value:this.Friendtext,
            label:"Friend",
            timestamp:this.getdatetime()
        })
        this.Friendtext="";
},
islabelShrijith(l){
    if (l.label === "Shrijith"){
        return true
    }
  else{
    return false
  }
},
islabelFriend(l){
    if (l.label === "Friend"){
        return true
    }
  else{
    return false
  }
},

getdatetime(){
    var today=new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;        
}

}
})

app.mount("#maincontainer");