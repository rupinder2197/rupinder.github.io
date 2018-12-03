// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}



var data = [] // for storing the data
var asc1,asc2;
function search() {
  var q = $('#query').val();
  asc1 = 0;
  asc2 = 0;
  data = []
  if(q!=''){
    $('#search-container').empty();
    $('#sort-title').attr('disabled', false);
    $('#sort-date').attr('disabled', false);
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet,id',
      maxResults: 25, 
      type: 'video',
    
    });
    request.execute(function(response) {
    for(var i=0;i<response.items.length;i++) {
      var html = '';
      var base = "https://www.youtube.com/embed/";
      var vidThumb = base + response.items[i].id.videoId;
      var Title = response.items[i].snippet.title;
      var DateTime = response.items[i].snippet.publishedAt;
      data.push({id: vidThumb, Title: Title, date: DateTime});
      $('#search-container').append('<iframe width="300" height="150" src=' + vidThumb + '>' + '</iframe>' + '<p>' + '<b>' + 'TITLE:' + '</b>' + ' ' + Title + '<br>' + '<b>' + ' PUBLISHED ON:' + '</b>' + ' ' + DateTime +'</p>' + '<br>');
      }
    });
  }
}

function SortByTitle(){
    $('#search-container').empty();
    if(asc1==0){  // ascending order
      data.sort(function (a, b) {
        return a.Title.toLowerCase()>b.Title.toLowerCase();
      });
    }
    else{ // descending order
      data.sort(function (a, b) {
        return a.Title.toLowerCase()<b.Title.toLowerCase();
      });
    }
    for(var i=0;i<data.length;i++){
      $('#search-container').append('<iframe width="300" height="150" src=' + data[i].id + '>' + '</iframe>' + '<p>' + '<b>' + 'TITLE:' + '</b>' + ' ' + data[i].Title + '<br>' + '<b>' + ' PUBLISHED ON:' + '</b>' + ' ' + data[i].date +'</p>' + '<br>');
    }
    asc1 = 1 - asc1;

}

function SortByDate(){
    $('#search-container').empty();
    if(asc2==0){  // ascending order
      data.sort(function (a, b) {
        return a.date.toLowerCase()>b.date.toLowerCase();
      });
    }
    else{
      data.sort(function (a, b) { // descending order
        return a.date.toLowerCase()<b.date.toLowerCase();
      });
    }
    for(var i=0;i<data.length;i++){
     $('#search-container').append('<iframe width="300" height="150" src=' + data[i].id + '>' + '</iframe>' + '<p>' + '<b>' + 'TITLE:' + '</b>' + ' ' + data[i].Title + '<br>' + '<b>' + ' PUBLISHED ON:' + '</b>' + ' ' + data[i].date +'</p>' + '<br>');
    }
    asc2 = 1 - asc2;
}

