import axios from "axios";
import {mapGetters} from "vuex";
    export default {
        name:"PostDetail",
        data() {
            return {
                postId: 0,
                posts:{},
                viewCount: 0
            };
        },
        computed: {
            ...mapGetters(["storageToken", "storageUserData"])
        },
        methods: {
            loadPost(id){
                let post = {
                    postId: id,
                };
                axios
                .post("http://localhost:8000/api/post/details", post)
                .then((response)=>{
                

                        if( response.data.post.image != null){
                            response.data.post.image = "http://localhost:8000/postImage/" + response.data.post.image;
                        }else{
                            response.data.post.image = "http://localhost:8000/defaultImage/default.jpg"
                        }
                    
                    this.posts = response.data.post;
                
                });
                
            }, 

            back(){
                history.back();
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
            viewCountLong(){
                let data = {
                    user_id:this.storageUserData.id,
                    post_id:this.$route.query.newsId
                };
                axios.post("http://localhost:8000/api/post/actionLog", data)
                .then((response)=>{
                    this.viewCount = response.data.post.length
                })
            }
        },

        

        mounted () {
            this.viewCountLong()
            this.postId = this.$route.query.newsId
            this.loadPost(this.postId)
        }
    }
