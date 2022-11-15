export class Job {
  constructor(data) {
    // NOTE not generating an id for async
    // this.id = generateId()
    this.id = data.id || ''
    this.company = data.company || ''
    this.jobTitle = data.jobTitle || ''
    this.hours = data.hours || 0
    this.rate = data.rate || 0
    this.description = data.description || ''
    this.createdAt = new Date(data.createdAt)
  }



  get ListTemplate() {
    return `
    <div class="col-4">
      <div class="selectable card m-2">
        <div>${this.jobTitle}</div>
        <div>Rate: ${this.rate}/hr</div>
        <p>${this.description}</p>
        <div class="d-flex justify-content-between">
          <button  class="btn btn-info"  onclick="app.jobsController.setActive('${this.id}')">
            <i class="mdi mdi-pencil"></i>
          </button>
          <button onclick="app.jobsController.removeJob('${this.id}')" title="Delete car!" class="btn btn-danger">
            <i class="mdi mdi-delete"></i>
          </button>
      </div>
      </div>
    </div>
    `
  }

  static GetJobFormTemplate(job) {
    if (!job) {
      job = new Job({}) // this car will be empty and not fill out the form
    }
    return `
    <form onsubmit="app.jobsController.${job.id ? `editJob('${job.id}')` : 'createJob()'}">
      <div class="form-floating mb-3">
        <input required type="text" class="form-control" id="company" placeholder="Company"
          name="company" value="${job.company}">
        <label for="job-company">Company</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="text" class="form-control" id="jobTitle" placeholder="Job Title" name="jobTitle" value="${job.jobTitle}">
        <label for="job-title">Job Title</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="hours" placeholder="Hours" name="hours" value="${job.hours}">
        <label for="job-hours">Hours</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="rate" placeholder="Job Rate" name="rate" value="${job.rate}">
        <label for="house-price">Rate of Pay</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a description here" id="job-description"
          name="description">${job.description}</textarea>
        <label for="job-description">Description</label>
      </div>
      <button type="submit" class="btn btn-success mt-3">Submit</button>
      <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
    </form>
    `
  }

}