import axios from "axios";
import {mapGetters} from "vuex";
export default {
    name:"LoginPage",
    data() {
        return {
            userData: {
                email:"",
                password:""
            },
            tokenStatus: false,
        }
    },

    computed: {
        ...mapGetters(["storageToken", "storageUserData"])
    },
        methods: {
            home(){
                this.$router.push({
                    name:"home",
                })
            },
            login(){
                this.$router.push({
                    name:"loginPage"
                })
            },
            logout(){
                this.$store.dispatch("setToken",null);
                this.login();
            },
            accountLogin(){
                axios
                    .post("http://localhost:8000/api/user/login", this.userData)
                    .then((response)=>{
                        if(response.data.token == null){
                            console.log("this is no user");
                        }else{
                            this.storeUserInfo(response);
                            this.home()
                        }
                    }).catch((error)=>{
                        console.log(error)
                    });   
            },
            storeUserInfo(response){
                this.$store.dispatch("setToken",response.data.token);
                this.$store.dispatch("setUserData",response.data.user)
                            console.log("Token Store Success..")
            },

        },
}
