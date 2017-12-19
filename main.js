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

  get component_group(){
    return `(?:${this.component_patterns.join('')})`
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

  repeated(options){
    return new RepeatedExpression(this, options)
  }

  maybe(){
    return new RepeatedExpression(this, {min: 0, max: 1})
  }
}

class RepeatedExpression extends Expression {
  constructor(component, options){
    super(component)
    this.repeat_options = options || {min: 1}
  }

  get pattern(){
    if(this.repeat_options.min && this.repeat_options.max){
      return `${this.component_group}{${this.repeat_options.min},${this.repeat_options.max}}`
    }

    if(this.repeat_options.min === 1){
      return `${this.component_group}+`
    } else if ()
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

class RawExpression extends Expression {
  get pattern(){
    return this.components.join('')
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
  },

  start: new RawExpression('^'),
  end:   new RawExpression('$')
}
