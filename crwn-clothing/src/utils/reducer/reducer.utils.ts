import { AnyAction } from 'redux'; 

// function predicate function will check if the argument 'is' of a type 

// type Alien = { 
//     fly: () => void
    
// }
// type Human = { 
//     name: string
//     // speak: () => {}
// }

// Check if the argument is human casts as human to get past the type check, then checks if the 
// human defining method 'speak' exists. The entity is Human allows typescript to narrow the 
// entity definition 
// function isHuman (entity: Human | Alien) : entity is Human { 
//     return (entity as Human).speak !== undefined; 
// }

// Then we have this whack thing 
// type Hybrid = Human & Alien; 

// const Josh : Hybrid = { 
//     name: 'josh', 
//     fly: () => {}
// }


// type MyFunc = () => string; 

// type MyReturn = ReturnType<MyFunc>

type Matchable<AC extends () => AnyAction> = AC & { 
    type: ReturnType<AC>['type']; 
    match(action: AnyAction) : action is ReturnType<AC>; 
}

// this is a function to take our createAction functions below and return a function 
// that has a type, and a function called 'match' A Factory function, in Java.
export function withMatcher<AC extends () => AnyAction & {type: string }> (actionCreator: AC): Matchable<AC>; 

export function withMatcher<AC extends(...args: any) => AnyAction & {type: string}> (actionCreator: AC): Matchable<AC>; 

export function withMatcher(actionCreator: Function ) { 
    const type = actionCreator().type; 
    return Object.assign(actionCreator, { 
        type, 
        match (action: AnyAction) { 
            return action.type === type; 
        }
    })
}

// wants to be able to pass the enum as a particular type restriction, and include it in this object
export type ActionWithPayload <T, P> = {
    type: T; 
    payload: P; 
}

export type Action<T> = { 
    type: T; 
}

// Why not payload?: P   This would mean that you have a chance of getting a payload which always exists, but 
// which may be null, which is possible in JS, but it's not something we want in TS. That makes sense to me. 
// If you want it to be present, make it that type and make it present, and don't fiddle with undefined, which 
// weakens what you're trying to say, typewise. Actions with payloads and actions without payload need to be two 
// different types.

// function overloading! In order to overload functions, you must have the same number of parameters as the 
// implementation. The first two create actions are the interfaces

// This is how you define two functions that can return 2 different return values based on arguments. 
export function createAction<T extends string, P >(type: T, payload: P): ActionWithPayload<T, P>; 

export function createAction<T extends string>(type: T, payload: void): Action<T>

export function createAction <T extends string, P>  (type: T, payload: P) { 
    return { type, payload}; 
}
