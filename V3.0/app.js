
const app= Vue.createApp({
    data(){
        return{
            isadddetailallowed:false,
            Contacts:[],
            isshowdetail:false,
            EnteredName:"" ,
            Texts:[],
            Usertext:"",
            Friendtext:'',
            selectedfriend:"",
            friendname:"",
            Userfriendspecificstext:"",
            selectedchat:{},
            selectedchathistory:[],  
            activechats:[],
            Searchvalue:""
        }
    },
    methods:{

        toggleadddetail(){
            this.isadddetailallowed= !this.isadddetailallowed ;
        },

        Addcontacts(){
            this.Contacts.push(
                {
                    Name:this.EnteredName,
                })   
            this.Texts.push(
                   { 
                    Name:this.EnteredName+"-Userchat",
                    texts:[]
                }
            )
            this.EnteredName="";
            this.isadddetailallowed= !this.isadddetailallowed;
        },
        
        Usertextlistadd(){
           for (const text of this.Texts ){
            if (text.Name === this.friendname+"-Userchat"){
               text.texts.push({
                value:this.Usertext,
                label:"User",
                timestamp:this.getdatetime()
               })
            }
        } 
        this.Usertext=""; 
        },
        Friendtextlistadd(){
            for (const text of this.Texts ){
                if (text.Name === this.friendname+"-Userchat"){
                   text.texts.push({
                    value:this.Friendtext,
                    label:this.friendname,
                    timestamp:this.getdatetime()
                   })
                }
            }   
        this.Friendtext="";
        },
        islabelUser(l){
        if (l.label === "User"){
            return true
        }
      else{
        return false
      }
    },
    islabelFriend(l){
        if (l.label === this.friendname){
            return true
        }
      else{
        return false
      }
    },
    
    getdatetime(){
        var today=new Date();
        var time = today.getHours() + ":" + today.getMinutes() 
        return time;        
    },
   
    Showchatfromcontactlist(e){
        this.isshowdetail= true;
        this.friendname=e.target.innerText;
        this.selectedchat={};
        for (const element of this.Texts) {
            if (element.Name === this.friendname+"-Userchat"){
                this.selectedchat=Object.assign(this.selectedchat,element.texts)
            }
          }
          console.log(this.selectedchat)
    },
      
    checkifchatdoesntexist(e){
        if (this.activechats.some(element => element.Name+"-Userchat" === e.Name)) 
        {
        return false
        }
        else{
            return true
        }
},

changelastext(e){
    for (const element of this.activechats){
        if (element.Name+"-Userchat" === e.Name){
            element.lasttext=e.texts[e.texts.length - 1].value
            element.sender=e.texts[e.texts.length -1].label
            element.timestamp=e.texts[e.texts.length -1].timestamp
        }
    }
}

   },  
   computed:{
     messagetobedisplayed(value){
        for (const element of this.Texts) {
            if (element.Name === this.friendname+"-Userchat"){
                this.selectedchat=Object.assign(this.selectedchat,element.texts)
            }
          }
         value=this.selectedchat 
         return value
     },
     chatlist(value){
        for (const element of this.Texts){
            if ( this.checkifchatdoesntexist(element) && element.texts.length >0){
                this.activechats.push(
                    {
                        Name:element.Name.replace("-Userchat",""),
                        lasttext:element.texts[element.texts.length -1].value,
                        sender:element.texts[element.texts.length -1].label,
                        timestamp:element.texts[element.texts.length -1].timestamp
                    })
            }
            else{
                this.changelastext(element)
            }
        }
    console.log(this.activechats)
    value=this.activechats 
    return value
    },

   



   },


})

app.mount("#Mainsection")