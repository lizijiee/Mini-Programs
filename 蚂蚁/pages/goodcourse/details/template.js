var template = function(image){
  return{
    "width": "700px",
    "height": "900px",
    "background": "#fff",
    "views": [
    {
      "type": "image",
      "url": "/public/uploads/20210627/0b9f6d9d154c55b71a78be9d40b9e426.png",
      "css": {
        "width": "700px",
        "height": "900px",
        "top": "0px",
        "left": "0px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "mode": "scaleToFill"
      }
    },
    // {
    //   "type": "image",
    //   "url": image,
    //   "css": {
    //     "width": "206px",
    //     "height": "206px",
    //     "top": "346px",
    //     "left": "245px",
    //     "rotate": "0",
    //     "borderRadius": "",
    //     "borderWidth": "",
    //     "borderColor": "#000000",
    //     "shadow": "",
    //     "mode": "scaleToFill"
    //   }
    // }
    ]
    }
    
}
module.exports = template
