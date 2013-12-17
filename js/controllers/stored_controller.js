App.StoredController = Ember.ArrayController.extend({
	actions: {
		removePost: function(item){
			item.destroyRecord();
		}
	}
})