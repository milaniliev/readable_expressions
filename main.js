class Expression {
  constructor(...components){
    this.components = components
  }

  get pattern(){
    return this.component_patterns.join('')
  }

  get component_patterns(){
    return this.components.map((component) => {
      if(typeof component === 'string'){
        return component
      } else {
        return component.pattern
      }
    })
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

class AnyExpression extends Expression {
  get pattern(){
    return `(?:${this.component_patterns.join('|')})`
  }
}

module.exports = {
  expression: function(...components){
    return new Expression(...components)
  },
  chars: function(...characters){
    return new CharacterClass(...characters)
  },
  any: function(...components){
    return new AnyExpression(...components)
  }
}
