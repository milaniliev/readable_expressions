class Expression {
  constructor(...components){
    this.components = components
  }
  
  get pattern(){
    return this.components.map((component) => {
      if(typeof component === 'string'){
        return component
      } else {
        return component.pattern
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

class CharacterClass {
  constructor(characters){
    this.characters = characters
  }

  get pattern(){
    return `[${this.characters}]`
  }
}

module.exports = {
  expression: function(components){
    return new Expression(components)
  },
  chars: function(characters){
    return new CharacterClass(characters)
  }
}