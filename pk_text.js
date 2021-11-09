var uparrow = new Image(10, 10);
uparrow.src = 'https://p7.hiclipart.com/preview/821/97/217/arrow-desktop-wallpaper-symbol-clip-art-up-arrow.jpg';
var downarrow = new Image(10, 10);
downarrow.src = 'https://p7.hiclipart.com/preview/410/111/719/arrow-down-android-down-arrow.jpg';
var backarrow = new Image(10, 10);
backarrow.src = 'https://www.pinclipart.com/picdir/middle/138-1385364_free-arrows-icons-back-icon-svg-free-clipart.png'
var banner = new Image(100,10)
banner.src = 'https://image.shutterstock.com/image-photo/simple-plain-pastel-paper-background-260nw-414748102.jpg'

class Pktext {
    constructor(canvas, bctx, is_question, lines, font_multiplier) {
        // Check that we have a valid context to draw on/with before adding event handlers  
        this.width = canvas.width;
        this.height = canvas.height;
        this.font_size = 110;
        this.font = (this.font_size).toString().concat("px Arial");
        this.canvas = canvas;
        this.ctx = bctx;
        this.cblock = 0;
        this.text = "";
        this.words = [];
        this.blocks = [];
        this.is_question = is_question;
        this.lines = lines;
        this.fm = font_multiplier;
    }

    /*
     * update_text - Add text to the class.
     */
    update_text(string){
        this.text = string;
        this.words = string.split(" ");
        this.update_blocks();
    }
    
    /*
     * update_blocks - Format blocks for drawing.
     */
    update_blocks(){
        var new_block_width, n = 0, max_block_width;
        this.blocks = [""];
        var rect = this.canvas.getBoundingClientRect();
        var scaleX = this.canvas.width / rect.width;
        var max_block_width = this.canvas.width * 2.46;
        for(var i = 0; i < this.words.length; i++) {
            n = this.blocks.length - 1;
            new_block_width = this.ctx.measureText(this.blocks[n].concat(this.words[i]).concat("...")).width * scaleX;
            if(new_block_width < max_block_width) {
                //add word to text block
                this.blocks[n] = this.blocks[n].concat(this.words[i].concat(" "));
                if(this.words[i][this.words[i].length - 1] == "?"){
                    //create new block if end of question
                    this.blocks.push("");
                }
            }
            else{
                //create new block
                this.blocks.push(this.words[i].concat(" "));
            }
        }
    }

  update_constraints(canvas){
    this.width = canvas.width
    this.height = 3 * 1.1* canvas.width / 40
    this.font_size = canvas.width / 40
  }
  change_block(n){
    if(n > 0 && this.cblock < this.blocks.length - n){
      this.cblock += n
    }
    else if(n < 0 && this.cblock - n > 1){
      this.cblock += n
    }
  }
  reset_block() {
    this.cblock = 0;
  }
}
