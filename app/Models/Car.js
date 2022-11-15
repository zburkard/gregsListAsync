


export class Car {
  constructor(data) {
    // NOTE not generating an id for async
    // this.id = generateId()
    this.id = data.id || ''
    // this.mileage = data.mileage // not supported by sandbox
    this.make = data.make || ''
    this.model = data.model || ''
    this.year = data.year || 0
    this.price = data.price || 0
    this.color = data.color || ''
    this.imgURL = data.imgUrl || ''// updated from img => imgUrl
    this.description = data.description || ''
    // NOTE JS dates are cool? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    this.createdAt = new Date(data.createdAt)
  }

  get ListTemplate() {
    return `
    <div class="col-12 col-md-4 p-4">
      <div class="card">
        <img src="${this.imgURL}" class="card-img-top"
          alt="${this.model}">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between mb-2">
            <span>${this.make} ${this.model}</span>
            <span>$ ${this.price}</span>
          </h5>
          <div class="d-flex justify-content-between">
            <button onclick="app.carsController.setActiveCar('${this.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            See Details
            </button>
            <button  class="btn btn-info"  onclick="app.carsController.setActive('${this.id}')">
            <i class="mdi mdi-pencil"></i>
            </button>
            <button onclick="app.carsController.removeCar('${this.id}')" title="Delete car!" class="btn btn-danger">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }


  static GetCarFormTemplate(car) {
    if (!car) {
      car = new Car({}) // this car will be empty and not fill out the form
    }
    return `
    <form onsubmit="app.carsController.${car.id ? `editCar('${car.id}')` : 'createCar()'}">
      <div class="form-floating mb-3">
        <input required type="text" minlength="3" class="form-control" id="car-make" placeholder="Car Make"
          name="make" value="${car.make}">
        <label for="car-make">Make</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="text" class="form-control" id="car-model" placeholder="Car Model" name="model" value="${car.model}">
        <label for="car-model" >Model</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="url" class="form-control" id="car-img" placeholder="Car Image" name="imgUrl" value="${car.imgURL}">
        <label for="car-img">Image</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="car-price" placeholder="Car Price" name="price" value="${car.price}">
        <label for="car-price">Price</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="car-year" placeholder="Car Year" name="year" value="${car.year}">
        <label for="car-year">Year</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="color" class="form-control" id="car-color" placeholder="Car Color" name="color" value="${car.color}">
        <label for="car-color">Color</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a description here" id="car-description"
          name="description">${car.description}</textarea>
        <label for="car-description">Description</label>
      </div>
      <button type="submit" class="btn btn-success mt-3">Submit</button>
      <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
    </form>
    `
  }
}