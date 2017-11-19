<template>
  <div class="container">

  <div class="jumbotron">
    <div class="page-header">
      <h1>Vue.js 2 & Firebase Sample Application</h1>
    </div>
  </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add Book</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form" v-on:submit.prevent="addBook">
          <div class="form-group">
            <label for="bookTitle">Title:</label>
            <input type="text" class="form-control" v-model="bookViewModel.title"/>
          </div>
          <div class="form-group">
            <label for="bookAuthor">Author:</label>
            <input type="text" class="form-control" v-model="bookViewModel.author"/>
          </div>
          <div class="form-group">
            <label for="bookUrl">URL:</label>
            <input type="text" class="form-control" v-model="bookViewModel.url"/>
          </div>
          <div class="form-group">
            <label for="bookPage">Page:</label>
            <input type="text" class="form-control" v-model="bookViewModel.page"/>
          </div>
          <input type="submit" class="btn btn-primary" value="Add Book" v-if="!bookViewModel['.key']" />
          <a tpye="button" class="btn btn-warning" v-on:click="updateBook(bookViewModel)" v-if="bookViewModel['.key']">Update</a>
        </form>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Books List</h3>
      </div>

      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Author
              </th>
              <th>
                Page
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
              <td>
                <a v-bind:href="book.url">{{book.title}}</a>
              </td>
              <td>
                {{book.author}}
              </td>
              <td>
                {{book.page}}
              </td>
              <td>
                <button class="btn btn-warning btn-sm pull-right" v-on:click="editBook(book)"><span class="fa fa-pencil"></span></button>
                <button class="btn btn-danger btn-sm pull left" v-on:click="removeBook(book)"><span class="fa fa-trash" ></span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import Firebase from 'firebase'
import toastr from 'toastr'
import { booksRef } from './firebase'
export default {
  name: 'app',
  // firebase:{
  //   books: booksRef
  // },
  data(){
    return{
      books:[],
      bookViewModel: {
        title: '',
        author:'',
        url:'',
        page:0
      }
    }
  },
  methods: {
    addBook: function() {
      booksRef.push(this.bookViewModel);
      this.bookViewModel.title = '';
      this.bookViewModel.author = '';
      this.bookViewModel.url = '';
      this.bookViewModel.page = 0;
    },
    removeBook: function(book) {
      booksRef.child(book['.key']).remove();
      toastr.success("Book removed");
    },
    editBook: function(book){
      this.bookViewModel = book;
    },
    updateBook: function(book){
      const key = book['.key'];
      console.log(book);
      console.log(key);
      delete book['.key'];
      booksRef.child(key).set(book);
    }
  },
  created() {
		this.$bindAsArray('books', booksRef);
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
