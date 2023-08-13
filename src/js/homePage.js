import axios from "axios";
import{ mapGetters} from "vuex"

 export default {
        name:"HomePage",
        data () {
            return {
                postLists :{},
                categoryList: {},
                searchKey:"",
                tokenStatus: false,
            };
        },
        computed: {
            ...mapGetters(["storageToken", "storageUserData"])
        },
        methods: {
            getAllPost(){
                axios.get("http://localhost:8000/api/allPostList").then((response)=>{
                    for( let i = 0; i < response.data.post.length; i++){

                        if( response.data.post[i].image != null){
                            response.data.post[i].image = "http://localhost:8000/postImage/" + response.data.post[i].image;
                        }else{
                            response.data.post[i].image = "http://localhost:8000/defaultImage/default.jpg"
                        }
                    }
                    this.postLists = response.data.post;
                });
            },

            loadCategory(){
                axios.get("http://localhost:8000/api/allCategory").then((response)=>{
                    this.categoryList = response.data.category;
                })
                .catch((error)=>{
                    console.log(error)
                });
            },
            search(){
                let search = {
                    key: this.searchKey,
                };
                axios.post("http://localhost:8000/api/post/search", search).then((response)=>{
                    for( let i = 0; i < response.data.searchData.length; i++){

                        if( response.data.searchData[i].image != null){
                            response.data.searchData[i].image = "http://localhost:8000/postImage/" + response.data.searchData[i].image;
                        }else{
                            response.data.searchData[i].image = "http://localhost:8000/defaultImage/default.jpg"
                        }
                    }
                    this.postLists = response.data.searchData;
                
                });
            }, 
            PostDetail(id){
                this.$router.push({
                    name:"postDetail",
                    query : {
                        newsId :id
                    }
                })
            
            },

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

            categorySearch(searchKey){
                let search = {
                    key: searchKey
                };
                axios.post("http://localhost:8000/api/catetegory/search" ,search).then((response)=>{
                    for( let i = 0; i < response.data.resul.length; i++){

                        if( response.data.resul[i].image != null){
                            response.data.resul[i].image = "http://localhost:8000/postImage/" + response.data.resul[i].image;
                        }else{
                            response.data.resul[i].image = "http://localhost:8000/defaultImage/default.jpg"
                        }
                    }
                    this.postLists = response.data.resul;
                });

            },
            logout(){
                this.$store.dispatch("setToken",null);
                this.login();
            },
            checkToken(){
                if(
                    this.storageToken != null && 
                    this.storageToken != undefined && 
                    this.storageToken !=""
                    ){
                    this.tokenStatus = true;
                    }else{
                        this.tokenStatus = false;
                    }
            }
           
        },
        mounted () {
           this.checkToken();
           this.getAllPost();
           this.loadCategory();
        },
    }