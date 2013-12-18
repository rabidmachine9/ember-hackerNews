App.IndexController = Ember.ArrayController.extend({
	actions: {
		storeForLater: function(item){
			console.log(item.get('url'));
			var post = this.store.createRecord('post',{
				id: item.id,
				url:item.get('url'),
				title: item.get('title'),
				points: item.get('points'),
				storeDate: new Date(),
				postedBy: item.get('postedBy')
			});
			post.save();
			this.store.find('tempPost',item.id).then(function(tempPost){
				tempPost.set('saved',true);
			});
			
		},
    removePost: function(item){
			var post = this.store.find('post', item.id).then(function(post){
        post.deleteRecord();
        post.save();
      });
      item.update('stored', false);
      item.save();
		}
	}
})