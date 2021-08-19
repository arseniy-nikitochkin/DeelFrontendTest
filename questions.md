
1. What is the difference between Component and PureComponent? give an example where it might break my app.  
PureComponent implements shouldComponentUpdate  lifecycle method using shallow comparison of state and props.
If nothing has changed, then PureComponent doesn't rerender. But because it uses shallow comp., it may break when
we have changes in deep nested data structures.  
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?  
Because shouldComponentUpdate only checks for props and state changes, but a change in Context value Provider will cause a rerender anyway.  
3. Describe 3 ways to pass information from a component to its PARENT.  
 -Define a callback which can change data in a parent, then send this callback to a child, using props or context  
 -Using refs and changing ref.current in a child component  
 -Use a state manager and connect parent and child to the same store or just use a shared global state  
4. Give 2 ways to prevent components from re-rendering.  
 Use PureComponent/React.memo or implement shouldComponentUpdate  
5. What is a fragment and why do we need it? Give an example where it might break my app.  
 Fragment is way to group several components without adding additional nodes to the DOM.
 Fragments may break your layout and styling when you get an unexpected amount of child components.
6. Give 3 examples of the HOC pattern. 
  ```
  
function withAsyncData(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
            }
        }

        async componentDidMount() {
            const data = await fetch('...');
            this.setState({ data })
        }
        
        render() {
            <WrappedComponent dataToDisplay={this.state.data} {...this.props}/>
        } 
    }
}

function withStore(WrappedComponent) {
    const globalStore = {
        names: ['Jim', 'John'],
        locations: [],
        address: 'Green street'
    }

    const themeColors = {
        button: 'blue',
        errorButton: 'red',
    }

    const dispatch = () => {
        // some code
    };

    return class extends React.Component {
        render() {
            <WrappedComponent themeColors={themeColors} dispatch={dispatch} themeColors={themeColors} {...this.props}/>
        } 
    }
}

function logger(WrappedComponent) {
    return class extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
        console.log('Current state: ', this.state);
        console.log('Previous state: ', prevState);
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  ```
8. What's the difference in handling exceptions in promises, callbacks and async...await.  
    Promises use .catch(), or reject(), while callbacks and async functions should be wrapped with try/catch block
9. How many arguments does setState take and why is it async.  
 setState has 2 arguments: setState(updater, [callback]). Callback is invoked after an asynchronous update is completed. 
 setState is async because React batches state updates, and then makes a single update for several components at once.
10. List the steps needed to migrate a Class to Function Component.   
  -Rename Class signature to a function signature  
  -If your class Component was Pure, wrap your function with React.memo()  
  -Replace constructor state initialization  with useState hook  
  -Replace lifecycle methods with useEffect hook(s)  
  -Replace methods with functions wrapped in useCallbacks  
  -Make the body of render() method the body of your Functional Component  
11. List a few ways styles can be used with components.  
    -Inline styles  
    -normal css classNames  
    -styled components(css in js)  
    -css modules  
12. How to render an HTML string coming from the server.  
    Using div with dangerouslySetInnerHTML attribute, or using a 3rd party HTML parser:
    
    ```<div dangerouslySetInnerHTML={{ __html: "<div>Your html here</div>" }} />```
