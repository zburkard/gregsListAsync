
export class House {
  constructor(data) {
    // NOTE not generating an id for async
    // this.id = generateId()
    this.id = data.id || ''
    this.bedrooms = data.bedrooms || 0
    this.bathrooms = data.bathrooms || 0
    this.levels = data.levels || 0
    this.price = data.price || 0
    this.year = data.year || 0
    this.imgURL = data.imgUrl || ''// updated from img => imgUrl
    this.description = data.description || ''
    this.createdAt = new Date(data.createdAt)
  }



  get ListTemplate() {
    return `
    <div class="col-12 col-md-4 p-4">
      <div class="card">
        <img src="${this.imgURL}" class="card-img-top"
          alt="">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between mb-2">
            <span>Bed:${this.bedrooms} Bath:${this.bathrooms}</span>
            <span>$ ${this.price}</span>
          </h5>
          <div class="d-flex justify-content-between">
            <button  class="btn btn-info"  onclick="app.housesController.setActive('${this.id}')">
            <i class="mdi mdi-pencil"></i>
            </button>
            <button onclick="app.housesController.removeHouse('${this.id}')" title="Delete car!" class="btn btn-danger">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  static GetHouseFormTemplate(house) {
    if (!house) {
      house = new House({}) // this car will be empty and not fill out the form
    }
    return `
    <form onsubmit="app.housesController.${house.id ? `editHouse('${house.id}')` : 'createHouse()'}">
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="bedrooms" placeholder="Bedrooms"
          name="bedrooms" value="${house.bedrooms}">
        <label for="car-make">Bedrooms</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="bathrooms" placeholder="Bathrooms" name="bathrooms" value="${house.bathrooms}">
        <label for="car-model" >Bathrooms</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="levels" placeholder="Levels" name="levels" value="${house.levels}">
        <label for="house-levels">Levels</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="url" class="form-control" id="imgURL" placeholder="House Image" name="imgUrl" value="${house.imgURL}">
        <label for="house-img">Image</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-price" placeholder="House Price" name="price" value="${house.price}">
        <label for="house-price">Price</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-year" placeholder="Year Built" name="year" value="${house.year}">
        <label for="house-year">Year Built</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a description here" id="car-description"
          name="description">${house.description}</textarea>
        <label for="car-description">Description</label>
      </div>
      <button type="submit" class="btn btn-success mt-3">Submit</button>
      <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
    </form>
    `
  }
}
