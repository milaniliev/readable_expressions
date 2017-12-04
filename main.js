class Expression {
  constructor(...components){
    this.components = components
  }
  
  get pattern(){
    return this.components.map((component) => {
      if(typeof component === 'string'){
        return component
      }
    }).join('')
  }

  match(string){
    let regexp_result = new RegExp(this.pattern).exec(string)

    if(regexp_result){
      return {
        index: regexp_result.index,
        found: true
      }
    } else {
      return {
        found: false
      }
    }
  }
}

module.exports = {
  expression: function(pattern){
    return new Expression(pattern)
  }
}