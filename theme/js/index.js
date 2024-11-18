let json_feed_all = '/feeds/all.json';

function getVersion(cb) {
  $.get(json_feed_all, function(data) {
    let _data = [];

    data.forEach(el => {
      let _item = {
        'title': el.title,
        'slug': el.slug,
        'href': el.href,
        'cat': el.cat,
        'summary': el.summary
      }

      if(el.hasOwnProperty('image'))
        _item['image'] = el.image;

      _data.push(_item);
    });

    cb(_data);
  });
}
