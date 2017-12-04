class Expression {
  constructor(pattern){
    this.pattern = pattern
  }

  match(string){
    let regexp = new RegExp(this.pattern)
    let match_result = regexp.exec(string)

    return {
      index: match_result.index
    }
  }
}

module.exports = {
  expression: function(pattern){
    return new Expression(pattern)
  }
}