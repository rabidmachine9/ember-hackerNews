App.Post = DS.Model.extend({
	_id: DS.attr('number'),
  url: DS.attr('string'),
  title: DS.attr('string'),
  storeDate: DS.attr('date'),
  postedBy: DS.attr('string'),
  points: DS.attr('string')
});



App.TempPost = DS.Model.extend({
	_id: DS.attr('number'),
  url: DS.attr('string'),
  title: DS.attr('string'),
  postedBy: DS.attr('string'),
  postedAgo: DS.attr('string'),
  points: DS.attr('string'),
  saved: DS.attr('boolean')
})