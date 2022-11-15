import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { carsService } from "../Services/CarsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawCars() {
  const cars = appState.cars
  let template = ''
  cars.forEach(c => template += c.ListTemplate)
  setHTML('listings', template)
}

function _drawCarForm() {
  let car = appState.activeCar
  setHTML('listing-form', Car.GetCarFormTemplate(car))
}


export class CarsController {
  constructor() {
    appState.on('cars', _drawCars)
    appState.on('activeCar', _drawCarForm)
    this.getCars()
    _drawCarForm()
  }


  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      // NOTE best catch alerts the user and logs the error
      Pop.error(error.message)
      console.error(error)
    }
  }

  async createCar() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let carData = getFormData(form)
      Pop.toast('Created', 'success')
      form.reset()
      console.log(carData);
      await carsService.createCar(carData)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  setActive(id) {
    carsService.setActive(id)
  }

  async editCar(id) {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const carData = getFormData(form)
      console.log('editing', form);
      await carsService.editCar(carData, id)
      Pop.toast('edited', 'info')
      form.reset()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async removeCar(id) {
    try {
      console.log('deleting', id);
      if (await Pop.confirm('Are you sure?', 'Someone spent a lot of time browsing the internet for that perfect picture', 'yeah toss it', 'warning')) {
        await carsService.removeCar(id)
      }
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

}
