App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter;

App.LSAdapter = DS.LSAdapter.extend({
    namespace: 'stored_items'
});


App.Router.map(function() {
  this.resource('stored');
});



App.IndexRoute = Ember.Route.extend({
  model: function() {
      var oldPosts = this.store.find('tempPost').then(function(posts){
        posts.content.forEach(function(post){
        Ember.run.once(this, function(){
          post.deleteRecord();
          post.save();
         })
        });
      });
     
      var storedPosts = this.store.find('post');
      var storedIds = new Array();
      storedPosts.then(function(posts){ //this is handled automaticaly in the view
        posts.forEach(function(post){
          storedIds.push(post.id);
        });
      });
      var self = this; 
      var newPosts = Ember.$.getJSON('http://api.ihackernews.com/page?format=jsonp&callback=?').then(function(data) {
        var data = $.makeArray(data);
        data = data[0].items;
        data.forEach(function(post){ //auto edw, pernaei sa reference to this 
          var tempPost = self.store.createRecord('tempPost',{
            id: post.id,
            url: post.url,
            title: post.title,
            postedAgo: post.postedAgo,
            postedBy: post.postedBy,
            points: post.points,
            saved: false
          }); 
          if(storedIds.indexOf(String(post.id)) >= 0){ //casting here is necessary
            tempPost.set('saved', true);
          }else tempPost.set('saved',false);
          console.log(tempPost.get('url'));
          tempPost.save();
        });
      });
    return self.store.find('tempPost');
  }
});



App.StoredRoute = Ember.Route.extend({
  model: function(){
    console.log(this.store.find('post'));
    return this.store.find('post');
  }
});
