class Expression {
  constructor(...components){
    this.components = components
    this.names = []
    this.components.forEach((component) => {
      if(component.names){ this.names = this.names.concat(component.names) }
    })
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
      let result = {}

      result.index = regexp_result.index,
      result.found = true
      result.matches = regexp_result
      this.names.forEach((name, index) => {
        Object.defineProperty(result, name, {
          get: () => {return regexp_result[index + 1]}
        })
      })

      return result

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

  named(name){
    return new NamedExpression(this, name)
  }
}

class NamedExpression extends Expression {
  constructor(component, name){
    super(component)
    this.names = [name]
  }

  get pattern(){
    return `(${this.component_patterns.join('')})`
  }
}

class RepeatedExpression extends Expression {
  constructor(component, options){
    super(component)
    this.repeat = options || {min: 1}
  }

  get pattern(){
    if(this.repeat.min !== undefined && this.repeat.max !== undefined){
      return `${this.component_group}{${this.repeat.min},${this.repeat.max}}`
    } else if(this.repeat.min === 1){
      return `${this.component_group}+`
    } else {
      return `${this.component_group}{${this.repeat.min},}`
    }
  }
}

class CharacterClass extends Expression {
  constructor(characters){
    super()
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

  start:  new RawExpression('^'),
  end:    new RawExpression('$'),
  letter: new RawExpression('[a-zA-Z]'),
  digit:  new RawExpression('[0-9]'),

  AnyExpression: AnyExpression,
  RepeatedExpression: RepeatedExpression,
  Expression: Expression
}
