<template>
    <div class="d-flex justify-content-center py-3">
      <p class= "btn btn-danger text-white btn-sm mr-4" @click="home()">Home</p>
      <p class="btn bg-dark text-white btn-sm" @click="login()"
      v-if="!tokenStatus">Login</p>
      <p class="btn bg-dark text-white btn-sm" @click="logout()"
      v-if="tokenStatus">logout</p>
    </div>
    <div class="container col-4 my-5">
        
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" v-model="userData.email">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control"  v-model="userData.password">
            </div>
            <button type="submit" class="btn btn-primary" @click="accountLogin()">Submit</button>
        
    </div>
</template>


<script src="../js/loginPage.js"></script>