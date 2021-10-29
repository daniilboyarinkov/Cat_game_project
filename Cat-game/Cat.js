class Cat
{
   constructor(score){
      // game.score
      this._score = score;
   }
   _getRandomInt(min, max) 
   {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
   }
   
    Choose_first_box()
    {
      this._boxes = [1, 2, 3, 4, 5]
      this._box = this._boxes[this._getRandomInt(0, 5)]
    }

   _Choose_box()
   {
      if ((this._boxes).indexOf(this._box) == 0)
         this._box = this._boxes[(this._boxes).indexOf(this._box)+1]
      else if ((this._boxes).indexOf(this._box) == (this._boxes).length-1)
         this._box = this._boxes[(this._boxes).indexOf(this._box)-1]
      else 
      {
        this._ch = this._getRandomInt(0, 2)
        if (this._ch == 0)
           this._box = this._boxes[(this._boxes).indexOf(this._box)-1]
        else if (this._ch == 1)
           this._box = this._boxes[(this._boxes).indexOf(this._box)+1]
      }
   }

   Checkbox(box)
   {
      if (this._score !== 1)
      {
         this._Choose_box();
      }
      this._score += 1;
      if (this._box == box) return true
      else return false
   }
}