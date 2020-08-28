import React, {Component} from 'react';
import Car from "./Car/Car";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Counter from "./Counter/Counter";
import './App.css';

export const ClickedContext = React.createContext(false);

class App extends Component {

   constructor(props) {
      super(props);

      this.state = {
         cars: [
            {name: 'Ford', year: 2018},
            {name: 'Audi', year: 2016},
            {name: 'Mazda', year: 2010}
         ],
         pageTitle: 'React Components',
         showCars: false,
         clicked: false
      }
   }

   toggleCarsHandler = () => {
      this.setState({
         showCars: !this.state.showCars
      })
   };

   onChangeName(name, index) {
      const car = this.state.cars[index];
      car.name = name;
      const cars = [...this.state.cars];
      cars[index] = car;
      this.setState({cars})
   };

   deleteHandler(index) {
      const cars = [...this.state.cars];
      cars.splice(index, 1);
      this.setState({cars})
   }

   render() {

      const divStyle = {
         'textAlign': 'center'
      };

      let cars = null;

      if (this.state.showCars) {
         cars = this.state.cars.map((car, index) => {
            return (
               <ErrorBoundary key={index}>
                  <Car
                     name={car.name}
                     year={car.year}
                     index={index}
                     onChangeName={event => this.onChangeName(event.target.value, index)}
                     onDelete={this.deleteHandler.bind(this, index)}/>
               </ErrorBoundary>

            )
         });
      }

      return (
         <div style={divStyle}>
            {/*<h1>{this.state.pageTitle}</h1>*/}
            <h1>{this.props.title}</h1>

            <ClickedContext.Provider value={this.state.clicked}>
               <Counter/>
            </ClickedContext.Provider>

            <br/>
            <button
               style={{marginTop: 20}}
               className={'AppButton'}
               onClick={this.toggleCarsHandler}
            >ToggleCars
            </button>
            <button onClick={() => {
               this.setState({clicked: true})
            }}>Change Clicked
            </button>

            <div style={{
               width: 400,
               margin: 'auto',
               paddingTop: 20
            }}>
               {cars}
            </div>

         </div>
      );
   }
}

export default App;
